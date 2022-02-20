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
import {
  figure,
  axes,
  basePlot,
  plot,
  scatter,
} from './plot'

declare const p5: any;

p5.prototype.createTensor = createTensor;
p5.prototype.registerMethod('init', startScope);
p5.prototype.registerMethod('pre', startScope);
p5.prototype.registerMethod('post', endScope);
p5.prototype.registerMethod('remove', endScope);

const { setBackend, getBackend } = tf;

p5.prototype.figure = function drawFigure(): object {
  return figure(this);
};

p5.prototype.axes = function drawAxes(
  x: number,
  y: number,
  w: number,
  h: number,
  steps: number=7
) {
  axes(this, x, y, w, h, steps);
};

p5.prototype.basePlot = function drawBasePlot(
  x: number[],
  y: number[],
  numTicks: number = 7,
): object {
  return basePlot(this, x, y, numTicks);
};

p5.prototype.plot = function drawLinePlot(
  x: number[],
  y: number[],
  numTicks: number = 7
) {
  plot(this, x, y, numTicks);
};

p5.prototype.scatter = function drawScatterPlot(
  x: number[],
  y: number[],
  numTicks: number = 7
) {
  scatter(this, x, y, numTicks);
};

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
  // plot
  figure,
  axes,
  basePlot,
  plot,
  scatter
};
