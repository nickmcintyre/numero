import { setBackend, getBackend } from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import {
  memory,
  tidy,
  beginScope,
  endScope,
  keep,
  dispose,
} from './memory';
import { Tensor, createTensor } from './tensor';

export {
  memory,
  tidy,
  beginScope,
  endScope,
  keep,
  dispose,
};
export {
  setBackend,
  getBackend,
  Tensor,
  createTensor,
};
export { fromImage, toImage } from './image';
export {
  ptp,
  percentile,
  quantile,
  mean,
  average,
  sd,
  variance,
} from './stats';
export {
  add,
  sub,
  mult,
  div,
  dot,
  abs,
  ceil,
  constrain,
  exp,
  floor,
  log,
  max,
  min,
  mod,
  pow,
  round,
  sq,
  sqrt,
  sum,
  acos,
  asin,
  atan,
  atan2,
  cos,
  sin,
  tan,
  complex,
  copy,
  eye,
  fill,
  linspace,
  ones,
  random,
  randomGaussian,
  range,
  zeros,
  flatten,
  pad,
  reshape,
  concat,
  reverse,
  slice,
  split,
  stack,
  unstack,
  sort,
  fft,
} from './ufunc';

declare const p5: any;

// ====================
//        Tensor
// ====================

p5.prototype.createTensor = createTensor;
p5.prototype.registerMethod('init', beginScope);
p5.prototype.registerMethod('pre', beginScope);
p5.prototype.registerMethod('post', endScope);
p5.prototype.registerMethod('remove', endScope);
