import * as tfc from '@tensorflow/tfjs-core';

import { Tensor, createTensor } from './tensor';


declare const p5: any;

p5.prototype.createTensor = createTensor;

export {
  tfc,
  Tensor,
};
