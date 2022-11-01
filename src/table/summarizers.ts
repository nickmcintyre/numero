import {
  deviation,
  first,
  last,
  max,
  mean,
  meanRate,
  median,
  min,
  n,
  nDistinct,
  sum,
  variance,
} from '@tidyjs/tidy';

declare const p5: any;

p5.prototype.deviation = deviation;

p5.prototype.first = first;

p5.prototype.last = last;

// eslint-disable-next-line no-underscore-dangle
p5.prototype._pmax = p5.prototype.max;
p5.prototype.max = function _max(...args: any[]) {
  if (typeof args[0] === 'number' || args[0] instanceof Array) {
    // eslint-disable-next-line no-underscore-dangle
    return this._pmax(...args);
  }
  // @ts-ignore
  return max(...args);
};

p5.prototype.mean = mean;

p5.prototype.meanRate = meanRate;

p5.prototype.median = median;

// eslint-disable-next-line no-underscore-dangle
p5.prototype._pmin = p5.prototype.min;
p5.prototype.min = function _min(...args: any[]) {
  if (typeof args[0] === 'number' || args[0] instanceof Array) {
    // eslint-disable-next-line no-underscore-dangle
    return this._pmin(...args);
  }
  // @ts-ignore
  return min(...args);
};

p5.prototype.n = n;

p5.prototype.nDistinct = nDistinct;

p5.prototype.sum = sum;

p5.prototype.variance = variance;
