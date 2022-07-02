// eslint-disable-next-line import/no-extraneous-dependencies
import { Table, TableRow } from 'p5';

const asNum = (table: Table, column: string): void => {
  table.rows.forEach((row: TableRow) => {
    const num: number = row.getNum(column);
    row.setNum(column, num);
  });
};

export default (table: Table): void => {
  table.columns.forEach((column: string) => {
    try {
      asNum(table, column);
    } catch (error) {
      // pass silently
    }
  });
};
