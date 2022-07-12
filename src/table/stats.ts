// eslint-disable-next-line import/no-extraneous-dependencies
import { Table, TableRow } from 'p5';

declare module 'p5' {
  interface Table {
    count(column: string): number | Table;
    sum(column: string): number | Table;
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
 * Computes a summary statistic along a column.
 *
 * @param {p5.Table} table the table to analyze
 * @param {string} column  the name of the column to analyze
 * @param {Function} func  the statistical function to apply
 * @param {any[]} [args]   positional arguments for func
 * @returns                the statistic, either as a number or as a table
 */
const computeStat = (
  table: Table,
  column: string,
  func: Function,
  args?: any[],
): number | Table => {
  if (column === undefined) {
    const output: Table = summaryTable(table);
    table.columns.forEach((col: string) => {
      const data: any[] = table.getColumn(col);
      if (typeof data[0] === 'number') {
        const value: number = func(data, ...args);
        output.setNum(0, col, value);
      } else {
        output.set(0, col, undefined);
      }
    });
    return output;
  }
  const data: number[] = table.getColumn(column);
  return func(data, ...args);
};

/**
 * Computes the number of cells with values in a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 the count, either as a number or as a table
 */
Table.prototype.count = function _count(column: string): number | Table {
  const count = (array: number[]) => array.filter((x) => x).length;
  return computeStat(this, column, count, []);
};

/**
 * Computes the sum of an array.
 *
 * @param {number[]} array the array of numbers
 * @returns                the sum
 */
const sum = (array: number[]): number => {
  const defined: number[] = array.filter((x) => x);
  return defined.reduce((a, b) => a + b);
};

/**
 * Computes the sum of a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 the sum, either as a number or as a table
 */
Table.prototype.sum = function _sum(column: string): number | Table {
  return computeStat(this, column, sum, []);
};

/**
 * Computes the arithmetic mean of an array.
 *
 * @param {number[]} array the array of numbers
 * @returns                the mean
 */
const mean = (array: number[]): number => sum(array) / array.length;

/**
 * Computes the mean of a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 the mean, either as a number or as a table
 */
Table.prototype.mean = function _mean(column: string): number | Table {
  return computeStat(this, column, mean, []);
};

/**
 * Computes the median of an array.
 *
 * @param {number[]} array the array of numbers
 * @returns                the median
 */
const median = (array: number[]): number => {
  const n: number = array.length;
  if (n === 1) {
    return array[0];
  }
  const a = array.slice();
  a.sort();
  if (n % 2 === 0) {
    const left: number = Math.floor(n / 2) - 1;
    const right: number = Math.floor(n / 2);
    return (a[left] + a[right]) / 2;
  }
  const middle: number = Math.floor(n / 2);
  return a[middle];
};

/**
 * Computes the median of a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 the median, either as a number or as a table
 */
Table.prototype.median = function _median(column: string): number | Table {
  return computeStat(this, column, median, []);
};

/**
 * Computes the maximum of a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 the maximum, either as a number or as a table
 */
Table.prototype.max = function _max(column: string): number | Table {
  const max = (array: number[]) => Math.max(...array);
  return computeStat(this, column, max, []);
};

/**
 * Computes the minimum of a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @returns                 the minimum, either as a number or as a table
 */
Table.prototype.min = function _min(column: string): number | Table {
  const min = (array: number[]) => Math.min(...array);
  return computeStat(this, column, min, []);
};

/**
 * Computes the standard deviation of an array.
 *
 * @param {number[]} array  the array of numbers
 * @param {number} [ddof]   the delta degrees of freedom is used to divide the sum
 *                          of squared errors: sum(se) / (n - ddof)
 * @returns                 the standard deviation
 */
const sd = (array: number[], ddof: number = 0): number => {
  const n: number = array.length;
  const mu: number = mean(array);
  const se: number[] = array.map((a) => (a - mu) ** 2);
  const variance = se.reduce((a, b) => a + b) / (n - ddof);
  return Math.sqrt(variance);
};

/**
 * Computes the standard deviation of a column or set of columns.
 *
 * @param {string} [column] the name of the column to analyze
 * @param {number} [ddof]   the delta degrees of freedom is used to divide the sum
 *                          of squared errors: sum(se) / (n - ddof)
 * @returns                 the standard deviation, either as a number or as a table
 */
Table.prototype.sd = function _sd(column: string, ddof: number = 0): number | Table {
  return computeStat(this, column, sd, [ddof]);
};

/**
 * Computes the summary statistics of a p5.Table.
 *
 * @returns the table of summary stats
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
