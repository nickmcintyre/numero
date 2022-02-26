import * as p5 from 'p5';
import * as math from 'mathjs';

/**
 * Computes the mean of a column.
 *
 * @param table  the p5.Table to analyze
 * @param column the name of the column to analyze
 * @returns      the mean
 */
export const tableMean = function computeMean(table: p5.Table, column: string): number | p5.Table {
  if (column === undefined) {
    const output: p5.Table = new p5.Table();
    output.columns = table.columns;
    const row = output.addRow();
    table.columns.forEach((c) => {
      const data: number[] = table.getColumn(c).map((x: string) => parseFloat(x));
      const mean = math.mean(data);
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
  column: string,
): number | p5.Table {
  if (column === undefined) {
    const output: p5.Table = new p5.Table();
    output.columns = table.columns;
    const row = output.addRow();
    table.columns.forEach((c) => {
      const data: number[] = table.getColumn(c).map((x: string) => parseFloat(x));
      const median = math.median(data);
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
export const tableMax = function computeMax(table: p5.Table, column: string): number | p5.Table {
  if (column === undefined) {
    const output: p5.Table = new p5.Table();
    output.columns = table.columns;
    const row = output.addRow();
    table.columns.forEach((c) => {
      const data: number[] = table.getColumn(c).map((x: string) => parseFloat(x));
      const max = math.max(data);
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
export const tableMin = function computeMin(table: p5.Table, column: string): number | p5.Table {
  if (column === undefined) {
    const output: p5.Table = new p5.Table();
    output.columns = table.columns;
    const row = output.addRow();
    table.columns.forEach((c) => {
      const data: number[] = table.getColumn(c).map((x: string) => parseFloat(x));
      const min = math.min(data);
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
export const tableSd = function computeSd(table: p5.Table, column: string): number | p5.Table {
  if (column === undefined) {
    const output: p5.Table = new p5.Table();
    output.columns = table.columns;
    const row = output.addRow();
    table.columns.forEach((c) => {
      const data: number[] = table.getColumn(c).map((x: string) => parseFloat(x));
      const sd = math.std(data);
      row.setNum(c, sd);
    });
    return output;
  }
  const data: number[] = table.getColumn(column).map((x: string) => parseFloat(x));
  return math.std(data);
};
