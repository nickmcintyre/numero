import * as math from 'mathjs';
import { Table, TableRow } from 'p5';

declare module 'p5' {
  interface Table {
    count(column: string): number | Table;
    mean(column: string): number | Table;
    median(column: string): number | Table;
    max(column: string): number | Table;
    min(column: string): number | Table;
    sd(column: string): number | Table;
    describe(): Table;
  }
}

/**
 * Creates a new p5.Table with an empty row for summary statistics.
 *
 * @param {p5.Table} table the table to summarize
 * @returns                the table and row as an array
 */
const summaryTable = function _summaryTable(table: Table): Table {
  const output: Table = new Table();
  output.columns = table.columns.slice();
  output.addRow();
  return output;
};

/**
 * Computes the number of cells with values in a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 the count, either as a number or as a table
 */
Table.prototype.count = function _count(column: string): number | Table {
  if (column === undefined) {
    const output: Table = summaryTable(this);
    this.columns.forEach((col: string) => {
      const data: any[] = this.getColumn(col);
      if (typeof data[0] === 'number') {
        const count: number = data.filter((x) => x).length;
        output.setNum(0, col, count);
      } else {
        output.set(0, col, undefined);
      }
    });
    return output;
  }
  const data: number[] = this.getColumn(column);
  return data.filter((x: number) => x).length;
};

/**
 * Computes the mean of a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 the mean, either as a number or as a table
 */
Table.prototype.mean = function _mean(column: string): number | Table {
  if (column === undefined) {
    const output: Table = summaryTable(this);
    this.columns.forEach((col: string) => {
      const data: any[] = this.getColumn(col);
      if (typeof data[0] === 'number') {
        const mean: number = math.mean(data);
        output.setNum(0, col, mean);
      } else {
        output.set(0, col, undefined);
      }
    });
    return output;
  }
  const data: number[] = this.getColumn(column);
  return math.mean(data);
};

/**
 * Computes the median of a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 the median, either as a number or as a table
 */
Table.prototype.median = function _median(column: string): number | Table {
  if (column === undefined) {
    const output: Table = summaryTable(this);
    this.columns.forEach((col: string) => {
      const data: any[] = this.getColumn(col);
      if (typeof data[0] === 'number') {
        const median: number = math.median(data);
        output.setNum(0, col, median);
      } else {
        output.set(0, col, undefined);
      }
    });
    return output;
  }
  const data: number[] = this.getColumn(column);
  return math.median(data);
};

/**
 * Computes the maximum of a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 the maximum, either as a number or as a table
 */
Table.prototype.max = function _max(column: string): number | Table {
  if (column === undefined) {
    const output: Table = summaryTable(this);
    this.columns.forEach((col: string) => {
      const data: any[] = this.getColumn(col);
      if (typeof data[0] === 'number') {
        const max: number = math.max(data);
        output.setNum(0, col, max);
      } else {
        output.set(0, col, undefined);
      }
    });
    return output;
  }
  const data: number[] = this.getColumn(column);
  return math.max(data);
};

/**
 * Computes the minimum of a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 the minimum, either as a number or as a table
 */
Table.prototype.min = function _min(column: string): number | Table {
  if (column === undefined) {
    const output: Table = summaryTable(this);
    this.columns.forEach((col: string) => {
      const data: any[] = this.getColumn(col);
      if (typeof data[0] === 'number') {
        const min: number = math.min(data);
        output.setNum(0, col, min);
      } else {
        output.set(0, col, undefined);
      }
    });
    return output;
  }
  const data: number[] = this.getColumn(column);
  return math.min(data);
};

/**
 * Computes the standard deviation of a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 the standard deviation, either as a number or as a table
 */
Table.prototype.sd = function _sd(column: string): number | Table {
  if (column === undefined) {
    const output: Table = summaryTable(this);
    this.columns.forEach((col: string) => {
      const data: any[] = this.getColumn(col);
      if (typeof data[0] === 'number') {
        const sd: any = math.std(data);
        output.setNum(0, col, sd);
      } else {
        output.set(0, col, undefined);
      }
    });
    return output;
  }
  const data: any = this.getColumn(column);
  return math.std(data);
};

/**
 * Computes the summary statistics of a p5.Table.
 *
 * @returns     the table of summary stats
 */
Table.prototype.describe = function _describe(): Table {
  const output: Table = new Table();
  const columns: string[] = [];
  this.columns.forEach((col: string) => {
    if (typeof this.get(0, col) === 'number') {
      columns.push(col);
    }
  });
  output.columns = ['stat', ...columns];
  const countRow: TableRow = output.addRow();
  countRow.set('stat', 'count');
  const countTable: number | Table = this.count();
  const meanRow: TableRow = output.addRow();
  meanRow.set('stat', 'mean');
  const meanTable: number | Table = this.mean();
  const sdRow: TableRow = output.addRow();
  sdRow.set('stat', 'sd');
  const sdTable: number | Table = this.sd();
  const minRow: TableRow = output.addRow();
  minRow.set('stat', 'min');
  const minTable: number | Table = this.min();
  const row25: TableRow = output.addRow();
  row25.set('stat', '25%');
  const row50: TableRow = output.addRow();
  row50.set('stat', '50%');
  const row75: TableRow = output.addRow();
  row75.set('stat', '75%');
  const maxRow: TableRow = output.addRow();
  maxRow.set('stat', 'max');
  const maxTable: number | Table = this.max();
  columns.forEach((col: string) => {
    // @ts-ignore
    countRow.set(col, countTable.get(0, col));
    // @ts-ignore
    meanRow.set(col, meanTable.get(0, col));
    // @ts-ignore
    sdRow.set(col, sdTable.get(0, col));
    // @ts-ignore
    minRow.set(col, minTable.get(0, col));
    // @ts-ignore
    maxRow.set(col, maxTable.get(0, col));
  });
  columns.forEach((col: string) => {
    const min: number = output.getNum(3, col);
    const max: number = output.getNum(7, col);
    const range: number = max - min;
    row25.set(col, min + 0.25 * range);
    row50.set(col, min + 0.50 * range);
    row75.set(col, min + 0.75 * range);
  });
  return output;
};
