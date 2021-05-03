import * as tf from '@tensorflow/tfjs';
import * as math from 'mathjs';
import * as dfd from './lib/danfo';
import * as ml5 from './lib/ml5';
import { Turtle } from './lib/turtle';
import {
  compile,
  derivative,
  evaluate,
  parse,
  simplify,
} from './algebra';
import {
  DataFrame,
  createDataFrame,
  loadDataFrame,
} from './data';
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

declare const p5: any;
declare const window: any;

p5.prototype.createDataFrame = createDataFrame;
p5.prototype.loadDataFrame = loadDataFrame;
p5.prototype.createTensor = createTensor;
p5.prototype.registerMethod('init', startScope);
p5.prototype.registerMethod('pre', startScope);
p5.prototype.registerMethod('post', endScope);
p5.prototype.registerMethod('remove', endScope);

window.ml5 = ml5.default;

const { setBackend, getBackend } = tf;

export {
  // CAS
  math,
  compile,
  derivative,
  evaluate,
  parse,
  simplify,
  // Data
  dfd,
  DataFrame,
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
};
