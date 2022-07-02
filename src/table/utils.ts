import * as dayjs from 'dayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Table, TableRow } from 'p5';

declare module 'p5' {
  interface Table {
    print(column?: string): void;
    inferTypes(): void;
    isNull(): Table;
    notNull(): Table;
    any(column?: string): boolean | Table;
    all(column?: string): boolean | Table;
    map(func: Function): Table;
    isin(values: any[]): Table;
  }
}

/**
 * Prints a p5.Table to the console.
 *
 * @param {string} [column] the column to print
 */
Table.prototype.print = function _print(column?: string): void {
  let tableObject: object;
  if (column && dayjs.isDayjs(this.get(0, column))) {
    tableObject = {};
    for (let row = 0; row < this.getRowCount(); row += 1) {
      tableObject[row] = {};
      tableObject[row][column] = this.get(row, column).toString();
    }
  } else {
    tableObject = this.getObject();
    this.columns.forEach((col: string) => {
      if (dayjs.isDayjs(this.get(0, col))) {
        for (let row = 0; row < this.getRowCount(); row += 1) {
          tableObject[row][col] = tableObject[row][col].toString();
        }
      }
    });
  }
  // eslint-disable-next-line no-console
  console.table(tableObject);
};

/**
 * Converts the table elements to numbers if possible.
 *
 * @param {Table} table   the table to convert
 * @param {string} column the column to convert
 */
const asNum = (table: Table, column: string): void => {
  table.rows.forEach((row: TableRow) => {
    const num: number = row.getNum(column);
    row.setNum(column, num);
  });
};

/**
 * Infers the type of table elements.
 */
Table.prototype.inferTypes = function _inferTypes(): void {
  this.columns.forEach((column: string) => {
    try {
      asNum(this, column);
    } catch (error) {
      // pass silently
    }
  });
};

/**
 * Checks whether p5.Table elements are null-ish.
 *
 * @returns a table of booleans showing whether each
 *          element is null-ish
 */
Table.prototype.isNull = function _isNull(): Table {
  const output: Table = new Table();
  output.columns = this.columns.slice();
  this.rows.forEach((row: TableRow) => {
    const newRow: TableRow = output.addRow();
    output.columns.forEach((column) => {
      const value: any = row.get(column);
      if (value === undefined || value === null || Number.isNaN(value)) {
        // @ts-ignore
        newRow.set(column, true);
      } else {
        // @ts-ignore
        newRow.set(column, false);
      }
    });
  });
  return output;
};

/**
 * Checks whether p5.Table elements are defined.
 *
 * @returns a table of booleans showing whether each
 *          element is defined
 */
Table.prototype.notNull = function _notNull(): Table {
  const output: Table = new Table();
  output.columns = this.columns.slice();
  this.rows.forEach((row: TableRow) => {
    const newRow: TableRow = output.addRow();
    output.columns.forEach((column: string) => {
      const value: any = row.get(column);
      if (value === undefined || value === null || Number.isNaN(value)) {
        // @ts-ignore
        newRow.set(column, false);
      } else {
        // @ts-ignore
        newRow.set(column, true);
      }
    });
  });
  return output;
};

/**
 * Checks whether any of the elements in a column are truthy.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 a boolean or table of booleans showing whether
 *                          each element is defined
 */
Table.prototype.any = function _any(column?: string): boolean | Table {
  if (column === undefined) {
    const output: Table = new Table();
    output.columns = this.columns.slice();
    const row: TableRow = output.addRow();
    output.columns.forEach((col: string) => {
      const c: any[] = this.getColumn(col);
      const value: boolean = c.reduce((prev, curr) => prev || curr);
      // @ts-ignore
      row.set(col, value);
    });
    return output;
  }
  const col: any[] = this.getColumn(column);
  const output: boolean = col.reduce((prev, curr) => prev || curr);
  return output;
};

/**
 * Checks whether all of the elements in a column are truthy.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 a boolean or table of booleans showing whether
 *                          each element is defined
 */
Table.prototype.all = function _all(column?: string): boolean | Table {
  if (column === undefined) {
    const output: Table = new Table();
    output.columns = this.columns.slice();
    const row: TableRow = output.addRow();
    output.columns.forEach((col: string) => {
      const c: any[] = this.getColumn(col);
      const value: boolean = c.reduce((prev, curr) => prev && curr);
      // @ts-ignore
      row.set(col, value);
    });
    return output;
  }
  const col: any[] = this.getColumn(column);
  const output: boolean = col.reduce((prev, curr) => prev && curr);
  return output;
};

/**
 * Applies a function to each element in a p5.Table.
 *
 * @param {function} func  the function to apply
 * @returns                the transformed table
 */
Table.prototype.map = function _map(func: Function): Table {
  const output: Table = new Table();
  output.columns = this.columns.slice();
  this.rows.forEach((row: TableRow) => {
    const newRow: TableRow = output.addRow();
    output.columns.forEach((col: string) => {
      newRow.set(col, func(row.get(col)));
    });
  });
  return output;
};

/**
 * Checks whether values are present in a table.
 *
 * @param {any[]} values the values to check
 * @returns              a table of booleans showing whether each
 *                       element is contained in values
 */
Table.prototype.isin = function _isin(values: any[]): Table {
  const output: Table = new Table();
  output.columns = this.columns.slice();
  this.rows.forEach((row) => {
    const newRow: TableRow = output.addRow();
    output.columns.forEach((col: string) => {
      // @ts-ignore
      newRow.set(col, false);
      const tableVal: any = row.get(col);
      values.every((value) => {
        if (tableVal === value) {
          // @ts-ignore
          newRow.set(col, true);
          return false;
        }
        return true;
      });
    });
  });
  return output;
};
