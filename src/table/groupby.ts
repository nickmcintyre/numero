import { Table, TableRow } from 'p5';
import './stats';

/**
 * A class to describe a p5.Table grouped by elements in a given column.
 */
class GroupedTable {
  public table: Table;

  public by: string;

  public groups: object;

  private outputColumns: string[];

  /**
   * Constructs a new GroupedTable.
   *
   * @param table  the table to analyze
   * @param by     the column to use for generating groups
   */
  constructor(table: Table, by: string) {
    this.table = table;
    this.by = by;
    this.createGroups();
  }

  /**
   * Creates groups of p5.Tables based on unique elements of
   * the given column.
   */
  createGroups() {
    this.groups = {};
    const { columns } = this.table;
    this.outputColumns = columns.filter((c) => c !== this.by);
    const groupNames: Set<string> = new Set();
    this.table.getColumn(this.by).forEach((el) => groupNames.add(el));
    groupNames.forEach((group) => {
      const groupTable: Table = new Table();
      groupTable.columns = columns.slice();
      const rows: TableRow[] = this.table.findRows(group, this.by);
      rows.forEach((row) => groupTable.addRow(row));
      groupTable.removeColumn(this.by);
      this.groups[group] = groupTable;
    });
  }

  /**
   * Applies a statistical function to each group and creates a
   * summary p5.Table with a row for each group.
   *
   * @param {string} stat the statistical function to apply
   * @returns             summary stats for each group
   */
  computeStat(stat: string): Table {
    const output: Table = new Table();
    output.columns = this.outputColumns.slice();
    const groupNames: string[] = Object.keys(this.groups);
    groupNames.forEach((group: string) => {
      // @ts-ignore
      let statTable: Table;
      if (stat === 'count') {
        statTable = this.groups[group].count();
      } else if (stat === 'sum') {
        statTable = this.groups[group].sum();
      } else if (stat === 'mean') {
        statTable = this.groups[group].mean();
      } else if (stat === 'median') {
        statTable = this.groups[group].median();
      } else if (stat === 'max') {
        statTable = this.groups[group].max();
      } else if (stat === 'min') {
        statTable = this.groups[group].min();
      } else if (stat === 'sd') {
        statTable = this.groups[group].sd();
      }
      const row: TableRow = statTable.getRow(0);
      output.addRow(row);
    });
    output.addColumn(this.by);
    for (let i = 0; i < groupNames.length; i += 1) {
      output.set(i, this.by, groupNames[i]);
    }
    return output;
  }

  /**
   * Computes the number of cells with values in each group in the
   * p5.Table.
   *
   * @returns the count per group
   */
  count(): Table {
    return this.computeStat('count');
  }

  /**
   * Computes the sum of each group in the p5.Table.
   *
   * @returns the sum per group
   */
  sum(): Table {
    return this.computeStat('sum');
  }

  /**
   * Computes the mean of each group in the p5.Table.
   *
   * @returns the mean per group
   */
  mean(): Table {
    return this.computeStat('mean');
  }

  /**
   * Computes the median of each group in the p5.Table.
   *
   * @returns the median per group
   */
  median(): Table {
    return this.computeStat('median');
  }

  /**
   * Computes the maximum of each group in the p5.Table.
   *
   * @returns the max per group
   */
  max(): Table {
    return this.computeStat('max');
  }

  /**
   * Computes the minimum of each group in the p5.Table.
   *
   * @returns the min per group
   */
  min(): Table {
    return this.computeStat('min');
  }

  /**
   * Computes the standard deviation of each group in the p5.Table.
   *
   * @returns the sd per group
   */
  sd(): Table {
    return this.computeStat('sd');
  }
}

declare module 'p5' {
  interface Table {
    groupby(string: string): GroupedTable;
  }
}

/**
 * Splits a p5.Table into unique groups based on the elements
 * of a given column.
 *
 * @param {string} column the column to use for generating groups
 * @returns               the rows of the table grouped by values in
 *                        the given column
 */
Table.prototype.groupby = function _groupby(column: string): GroupedTable {
  const output: GroupedTable = new GroupedTable(this, column);
  return output;
};
