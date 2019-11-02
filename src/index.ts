import * as tfc from '@tensorflow/tfjs-core';

import { Tensor, createTensor } from './numeric/tensor';
import { run } from './symbolic/core';


declare const p5: any;

p5.prototype.createTensor = createTensor;

const { tidy } = tfc;

export {
  run,
  tfc,
  tidy,
  Tensor,
};
