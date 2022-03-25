import * as p5 from 'p5';
import * as math from 'mathjs';

/**
 * Computes the number of cells with values in a column.
 *
 * @param table  the p5.Table to analyze
 * @param column (optional) the name of the column to analyze
 * @returns      the count
 */
export const tableCount = function computeCount(
  table: p5.Table,
  column?: string,
): number | p5.Table {
  if (column === undefined) {
    const output: p5.Table = new p5.Table();
    output.columns = table.columns;
    const row: p5.TableRow = output.addRow();
    table.columns.forEach((c) => {
      const data: number[] = table.getColumn(c).map((x: string) => parseFloat(x));
      const count: number = data.filter((x) => x).length;
      row.setNum(c, count);
    });
    return output;
  }
  const data: number[] = table.getColumn(column).map((x: string) => parseFloat(x));
  return data.filter((x) => x).length;
};

/**
 * Computes the mean of a column.
 *
 * @param table  the p5.Table to analyze
 * @param column (optional) the name of the column to analyze
 * @returns      the mean
 */
export const tableMean = function computeMean(table: p5.Table, column?: string): number | p5.Table {
  if (column === undefined) {
    const output: p5.Table = new p5.Table();
    output.columns = table.columns;
    const row: p5.TableRow = output.addRow();
    table.columns.forEach((c) => {
      const data: number[] = table.getColumn(c).map((x: string) => parseFloat(x));
      const mean: number = math.mean(data);
      row.setNum(c, mean);
    });
    return output;
  }
  const data: number[] = table.getColumn(column).map((x: string) => parseFloat(x));
  return math.mean(data);
};

/**
 * Computes the median of a column.
 *
 * @param table  the p5.Table to analyze
 * @param column the name of the column to analyze
 * @returns      the median
 */
export const tableMedian = function computeMedian(
  table: p5.Table,
  column?: string,
): number | p5.Table {
  if (column === undefined) {
    const output: p5.Table = new p5.Table();
    output.columns = table.columns;
    const row: p5.TableRow = output.addRow();
    table.columns.forEach((c) => {
      const data: number[] = table.getColumn(c).map((x: string) => parseFloat(x));
      const median: number = math.median(data);
      row.setNum(c, median);
    });
    return output;
  }
  const data: number[] = table.getColumn(column).map((x: string) => parseFloat(x));
  return math.median(data);
};

/**
 * Computes the maximum of a column.
 *
 * @param table  the p5.Table to analyze
 * @param column the name of the column to analyze
 * @returns      the maximum
 */
export const tableMax = function computeMax(table: p5.Table, column?: string): number | p5.Table {
  if (column === undefined) {
    const output: p5.Table = new p5.Table();
    output.columns = table.columns;
    const row: p5.TableRow = output.addRow();
    table.columns.forEach((c) => {
      const data: number[] = table.getColumn(c).map((x: string) => parseFloat(x));
      const max: number = math.max(data);
      row.setNum(c, max);
    });
    return output;
  }
  const data: number[] = table.getColumn(column).map((x: string) => parseFloat(x));
  return math.max(data);
};

/**
 * Computes the minimum of a column.
 *
 * @param table  the p5.Table to analyze
 * @param column the name of the column to analyze
 * @returns      the minimum
 */
export const tableMin = function computeMin(table: p5.Table, column?: string): number | p5.Table {
  if (column === undefined) {
    const output: p5.Table = new p5.Table();
    output.columns = table.columns;
    const row: p5.TableRow = output.addRow();
    table.columns.forEach((c) => {
      const data: number[] = table.getColumn(c).map((x: string) => parseFloat(x));
      const min: number = math.min(data);
      row.setNum(c, min);
    });
    return output;
  }
  const data: number[] = table.getColumn(column).map((x: string) => parseFloat(x));
  return math.min(data);
};

/**
 * Computes the standard deviation of a column.
 *
 * @param table  the p5.Table to analyze
 * @param column the name of the column to analyze
 * @returns      the standard deviation
 */
export const tableSd = function computeSd(table: p5.Table, column?: string): number | p5.Table {
  if (column === undefined) {
    const output: p5.Table = new p5.Table();
    output.columns = table.columns;
    const row: p5.TableRow = output.addRow();
    table.columns.forEach((c) => {
      const data: number[] = table.getColumn(c).map((x: string) => parseFloat(x));
      const sd: number = math.std(data);
      row.setNum(c, sd);
    });
    return output;
  }
  const data: number[] = table.getColumn(column).map((x: string) => parseFloat(x));
  return math.std(data);
};

/**
 * Computes the summary statistics of a column.
 *
 * @param table the p5.Table to analyze
 * @returns     the table of summary stats
 */
export const tableDescribe = function computeDescription(table: p5.Table): p5.Table {
  const output: p5.Table = new p5.Table();
  output.columns = table.columns;
  const countRow: p5.TableRow = output.addRow();
  const countTable: number | p5.Table = tableCount(table);
  const meanRow: p5.TableRow = output.addRow();
  const meanTable: number | p5.Table = tableMean(table);
  const sdRow: p5.TableRow = output.addRow();
  const sdTable: number | p5.Table = tableSd(table);
  const minRow: p5.TableRow = output.addRow();
  const minTable: number | p5.Table = tableMin(table);
  const maxRow: p5.TableRow = output.addRow();
  const maxTable: number | p5.Table = tableMax(table);
  output.columns.forEach((column) => {
    // @ts-ignore
    countRow.set(column, countTable.get(0, column));
    // @ts-ignore
    meanRow.set(column, meanTable.get(0, column));
    // @ts-ignore
    sdRow.set(column, sdTable.get(0, column));
    // @ts-ignore
    minRow.set(column, minTable.get(0, column));
    // @ts-ignore
    maxRow.set(column, maxTable.get(0, column));
  });
  const row25: p5.TableRow = output.addRow();
  const row50: p5.TableRow = output.addRow();
  const row75: p5.TableRow = output.addRow();
  output.columns.forEach((column) => {
    const min: number = output.getNum(3, column);
    const max: number = output.getNum(4, column);
    const range: number = max - min;
    row25.set(column, min + 0.25 * range);
    row50.set(column, min + 0.50 * range);
    row75.set(column, min + 0.75 * range);
  });
  return output;
};

/**
 * Concatenates two p5.Tables along a specified axis.
 *
 * @param t1   the first table to concatenate
 * @param t2   the second table to concatenate
 * @param axis (optional) the axis along which to concatenate
 * @returns    the combined table
 */
export const tableConcat = function concat(t1: p5.Table, t2: p5.Table, axis: number = 0): p5.Table {
  if (axis === 0) {
    const output: p5.Table = new p5.Table();
    const sameColumns: boolean = t1.columns.every(
      (element, index) => element === t2.columns[index],
    );
    if (sameColumns) {
      output.columns = t1.columns.slice();
      t1.rows.forEach((row) => output.addRow(row));
      t2.rows.forEach((row) => output.addRow(row));
    } else {
      const columns: string[] = [];
      t1.columns.forEach((c) => columns.push(c));
      t2.columns.forEach((c) => {
        if (columns.indexOf(c) < 0) {
          columns.push(c);
        }
      });
      output.columns = columns;
      t1.rows.forEach((row) => {
        const newRow: p5.TableRow = output.addRow();
        output.columns.forEach((col) => newRow.set(col, row.get(col)));
      });
      t2.rows.forEach((row) => {
        const newRow: p5.TableRow = output.addRow();
        output.columns.forEach((col) => newRow.set(col, row.get(col)));
      });
      t1.clearRows();
      const t1c: string[] = t1.columns.slice();
      t1c.forEach((col) => t1.removeColumn(col));
      output.columns.forEach((col) => t1.addColumn(col));
      output.rows.forEach((row) => t1.addRow(row));
    }

    return output;
  }
  if (axis === 1) {
    const output: p5.Table = new p5.Table();
    const columns: string[] = [];
    t1.columns.forEach((c) => columns.push(c));
    t2.columns.forEach((c) => columns.push(c));
    output.columns = columns;
    const tables = {};
    let shorter: string;
    let longer: string;
    if (t1.rows.length > t2.rows.length) {
      longer = 't1';
      shorter = 't2';
      tables[longer] = t1;
      tables[shorter] = t2;
    } else {
      shorter = 't1';
      longer = 't2';
      tables[shorter] = t1;
      tables[longer] = t2;
    }
    const numShort: number = tables[shorter].rows.length;
    const numLong: number = tables[longer].rows.length;
    for (let i = 0; i < numLong; i += 1) {
      const newRow: p5.TableRow = output.addRow();
      const longRow: p5.TableRow = tables[longer].rows[i];
      tables[longer].columns.forEach((col) => {
        newRow.set(col, longRow.get(col));
      });
      if (i < numShort) {
        const shortRow: p5.TableRow = tables[shorter].rows[i];
        tables[shorter].columns.forEach((col) => {
          newRow.set(col, shortRow.get(col));
        });
      }
    }
    t1.clearRows();
    const t1c: string[] = t1.columns.slice();
    t1c.forEach((col) => t1.removeColumn(col));
    output.columns.forEach((col) => t1.addColumn(col));
    output.rows.forEach((row) => t1.addRow(row));
    return output;
  }
  throw new Error('axis argument must be 0 or 1.');
};

/**
 * Merges two p5.Tables on a specified key.
 *
 * @param left  the first table to merge
 * @param right the second table to merge
 * @param key   the key upon which to merge
 * @returns     the merged table
 */
export const tableMerge = function computeMerge(
  left: p5.Table,
  right: p5.Table,
  key: string,
): p5.Table {
  const inLeft: boolean = left.columns.indexOf(key) >= 0;
  const inRight: boolean = right.columns.indexOf(key) >= 0;
  if (!(inLeft && inRight)) {
    throw new Error('Both tables must have the same key.');
  }
  const output: p5.Table = new p5.Table();
  const leftCols: string[] = left.columns.filter((value) => value !== key);
  const rightCols: string[] = right.columns.filter((value) => value !== key);
  output.columns = [key, ...leftCols, ...rightCols];
  left.rows.forEach((leftRow) => {
    const leftKey: string | number = leftRow.get(key);
    right.rows.forEach((rightRow) => {
      const rightKey: string | number = rightRow.get(key);
      if (leftKey !== rightKey) return;
      const newRow: p5.TableRow = output.addRow();
      let kval: string | number = leftRow.get(key);
      newRow.set(key, kval);
      leftCols.forEach((col) => {
        kval = leftRow.get(col);
        newRow.set(col, kval);
      });
      rightCols.forEach((col) => {
        kval = rightRow.get(col);
        newRow.set(col, kval);
      });
    });
  });
  return output;
};

/**
 * Applies a function to each element in a p5.Table.
 *
 * @param table the table
 * @param func  the function to apply
 * @returns     the transformed table
 */
export const tableMap = function computeMap(table: p5.Table, func: Function): p5.Table {
  const output: p5.Table = new p5.Table();
  output.columns = table.columns;
  table.rows.forEach((row) => {
    const newRow: p5.TableRow = output.addRow();
    output.columns.forEach((col) => {
      newRow.set(col, func(row.get(col)));
    });
  });
  return output;
};

/**
 * Checks whether values are present in a table.
 *
 * @param table  the p5.Table to analyze
 * @param values the values to check
 * @returns      a table of booleans showing whether each
 *               element is contained in values
 */
export const tableIsIn = function computeIsIn(table: p5.Table, values: any[]): p5.Table {
  const output: p5.Table = new p5.Table();
  output.columns = table.columns;
  table.rows.forEach((row) => {
    const newRow: p5.TableRow = output.addRow();
    output.columns.forEach((column) => {
      // @ts-ignore
      newRow.set(column, false);
      const tableVal: any = row.get(column);
      values.every((value) => {
        if (tableVal === value) {
          // @ts-ignore
          newRow.set(column, true);
          return false;
        }
        return true;
      });
    });
  });
  return output;
};
