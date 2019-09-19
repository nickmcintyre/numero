import * as tfc from '@tensorflow/tfjs-core';

import p5 from "./index";


/**
 * A class to describe a tensor, a generalization of vectors and matrices.
 * Tensors can be thought of as (possibly) multidimensional arrays that support
 * many useful operations. They are applied throughout mathematics, physics,
 * engineering, and computer science.
 */
class Tensor {
  private tensor: tfc.Tensor;

  constructor(obj: any) {
    if (typeof obj === 'number') {
      this.tensor = tfc.scalar(obj);
    } else if (obj instanceof Array) {
      this.tensor = tfc.tensor(obj);
    } else if (obj instanceof p5.Vector) {
      this.tensor = tfc.tensor(obj.array());
    } else {
      throw new Error('Tensors must be created from Numbers, Arrays, or p5.Vectors.');
    }
  }
};

/**
 * Creates a new Tensor (the datatype for storing tensors).
 */
const createTensor = function createTensorObject(obj: any): Tensor {
  return new Tensor(obj);
};

export {
  Tensor,
  createTensor,
};
