// eslint-disable-next-line import/no-extraneous-dependencies
import { Table } from 'p5';
import { range, Range } from '../utils';

interface Element {
  index: number;
  value: number;
}

const sortIndices = (array: number[]): number[] => {
  const indices: object[] = array.map((value, index) => ({ index, value }));
  indices.sort((a: Element, b: Element) => {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
  return indices.map((v: Element) => v.index);
};

export interface RawData {
  data: object | Table;
}

export interface DataObject {
  x: number[];
  y: number[];
}

export interface SortedData {
  x: string;
  y: string;
  data: DataObject;
  xRange: Range;
  yRange: Range;
}

export class Dataset {
  raw: RawData;

  sorted: SortedData[];

  constructor(data: DataObject | Table) {
    this.raw = { data };
    this.sorted = [];
  }

  sort(x: string, y: string): SortedData {
    let xData: number[];
    let yData: number[];
    if (this.raw.data instanceof Table) {
      xData = this.raw.data.getColumn(x);
      yData = this.raw.data.getColumn(y);
    } else if (this.raw.data instanceof Object) {
      xData = this.raw.data[x];
      yData = this.raw.data[y];
    }
    const indices: number[] = sortIndices(xData);
    const newData: DataObject = {
      x: indices.map((i) => xData[i]),
      y: indices.map((i) => yData[i]),
    };
    const pair: SortedData = {
      x,
      y,
      data: newData,
      xRange: range(newData.x),
      yRange: range(newData.y),
    };
    this.sorted.push(pair);
    return pair;
  }

  get(x: string, y: string): SortedData {
    let data: any;
    this.sorted.forEach((pair: SortedData) => {
      if (pair.x === x && pair.y === y) {
        data = pair;
      }
    });
    if (!data) {
      data = this.sort(x, y);
    }
    return data;
  }

  // equals(x: number[], y: number[]) {
  //   if (this.raw.data instanceof Table) {
  //     const xData: number[] = this.raw.data.getColumn(this.raw.x);
  //     const yData: number[] = this.raw.data.getColumn(this.raw.y);
  //     xData.forEach((value, index): void | boolean => {
  //       if (value !== x[index]) return false;
  //     });
  //     yData.forEach((value, index): void | boolean => {
  //       if (value !== y[index]) return false;
  //     });
  //     return true;
  //   }
  //   if (this.raw.data instanceof Object) {
  //     return x === this.raw.data[this.raw.x] && y === this.raw.data[this.raw.y];
  //   }
  // }
}
