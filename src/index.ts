import * as tfc from '@tensorflow/tfjs-core';

import { Tensor, createTensor } from './tensor';


declare var p5: any;
p5.prototype.tfc = tfc;
p5.prototype.Tensor = Tensor;
p5.prototype.createTensor = createTensor;

export default p5;
