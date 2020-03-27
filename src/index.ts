import * as tfc from '@tensorflow/tfjs-core';

import { Tensor, createTensor } from './tensor/index';
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
} from './tensor/ufunc';


declare const p5: any;

p5.prototype.createTensor = createTensor;

const { tidy } = tfc;

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
  tfc,
  tidy,
  Tensor,
};
