import * as tf from '@tensorflow/tfjs';
import * as math from 'mathjs';
import { Turtle } from './turtle';
import {
  compile,
  derivative,
  evaluate,
  parse,
  simplify,
} from './algebra';
import { Tensor, createTensor } from './tensor';
import {
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
} from './tensor/ufunc';
import {
  memory,
  tidy,
  startScope,
  endScope,
  keep,
  dispose,
} from './tensor/memory';
import { fromImage, toImage } from './image';
import {
  ptp,
  percentile,
  quantile,
  mean,
  average,
  sd,
  variance,
} from './stats';
import './plot';
import './table';
import { toDateTime } from './time';

declare const p5: any;

// ====================
//        Tensor
// ====================

p5.prototype.createTensor = createTensor;
p5.prototype.registerMethod('init', startScope);
p5.prototype.registerMethod('pre', startScope);
p5.prototype.registerMethod('post', endScope);
p5.prototype.registerMethod('remove', endScope);

const { setBackend, getBackend } = tf;

// ====================
//       Exports
// ====================

export {
  // CAS
  math,
  compile,
  derivative,
  evaluate,
  parse,
  simplify,
  // Tensor
  tf,
  Tensor,
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
  memory,
  tidy,
  startScope,
  endScope,
  keep,
  dispose,
  fromImage,
  toImage,
  getBackend,
  setBackend,
  ptp,
  percentile,
  quantile,
  mean,
  average,
  sd,
  variance,
  // Turtle
  Turtle,
  // time
  toDateTime,
};
