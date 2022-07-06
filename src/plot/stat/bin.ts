import { linspace } from '../scale';
import { Range, range } from '../utils';

export interface Bin {
  start: number[];
  stop: number[];
  count: number[];
}

export const bin = (x: number[], numBins: number = 20): Bin => {
  const bins: Bin = {
    start: [],
    stop: [],
    count: [],
  };
  const r: Range = range(x);
  const edges: number[] = linspace(r.min, r.max, numBins + 1);
  for (let i = 0; i < numBins; i += 1) {
    bins.start[i] = edges[i];
    bins.stop[i] = edges[i + 1];
    bins.count[i] = 0;
  }
  x.forEach((n: number) => {
    for (let i = 0; i < edges.length - 1; i += 1) {
      const stop: number = edges[i + 1];
      if (n <= stop) {
        bins.count[i] += 1;
        break;
      }
    }
  });
  return bins;
};
