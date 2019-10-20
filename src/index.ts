import * as tfc from '@tensorflow/tfjs-core';

import { Tensor, createTensor } from './tensor';


declare const p5: any;

p5.prototype.createTensor = createTensor;

const { tidy } = tfc;

export {
  tfc,
  tidy,
  Tensor,
};
