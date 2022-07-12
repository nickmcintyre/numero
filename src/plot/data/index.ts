// eslint-disable-next-line import/no-extraneous-dependencies
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { Table, TableRow } from 'p5';
import { Bin, bin } from '../stat';
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
  time?: string[];
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

export interface BinnedData {
  x: string;
  numBins: number;
  data: Bin;
  xRange?: Range;
}

export class Dataset {
  raw: RawData;

  sorted: SortedData[];

  binned: BinnedData[];

  constructor(data: DataObject | Table) {
    this.raw = { data, time: [] };
    this.sorted = [];
    this.binned = [];
  }

  getRaw(x: string): number[] {
    let xData: number[];
    if (this.raw.data instanceof Table) {
      xData = this.raw.data.getColumn(x);
      if (this.raw.time.includes(x)) return xData;
      if (dayjs.isDayjs(xData[0])) {
        this.raw.time.push(x);
        this.raw.data.rows.forEach((row: TableRow) => {
          const ms: Dayjs = row.getDateTime(x);
          row.set(x, ms.toDate().getTime());
        });
        xData = this.raw.data.getColumn(x);
      }
    } else if (this.raw.data instanceof Object) {
      xData = this.raw.data[x];
    }
    return xData;
  }

  sort(x: string, y: string): SortedData {
    const xData: number[] = this.getRaw(x);
    const yData: number[] = this.getRaw(y);
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

  getSorted(x: string, y: string): SortedData {
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

  bin(x: string, numBins: number = 20): BinnedData {
    const xData: number[] = this.getRaw(x);
    const newData: BinnedData = {
      x,
      numBins,
      data: bin(xData, numBins),
    };
    newData.xRange = range(newData.data.count);
    this.binned.push(newData);
    return newData;
  }

  getBinned(x: string, numBins: number = 20): BinnedData {
    let data: any;
    this.binned.forEach((b: BinnedData) => {
      if (b.x === x && b.numBins === numBins) {
        data = b;
      }
    });
    if (!data) {
      data = this.bin(x, numBins);
    }
    return data;
  }
}
