import * as tfc from '@tensorflow/tfjs-core';

import p5 from './index';


/**
 * A class to describe a tensor, a generalization of vectors and matrices.
 * Tensors can be thought of as (possibly) multidimensional arrays that support
 * many useful operations. They are applied throughout mathematics, physics,
 * engineering, and computer science.
 */
class Tensor {
  public tensor: tfc.Variable;

  constructor(obj: any) {
    tfc.tidy(() => {
      if (typeof obj === 'number') {
        this.tensor = tfc.variable(tfc.scalar(obj));
      } else if (obj instanceof Array) {
        this.tensor = tfc.variable(tfc.tensor(obj));
      } else if (obj instanceof p5.Vector) {
        this.tensor = tfc.variable(tfc.tensor(obj.array()));
      } else {
        throw new Error('Tensors must be created from Numbers, Arrays, or p5.Vectors.');
      }
    });
  }

  /**
   * Equality check against a Tensor.
   * 
   * @param b the tensor to be compared
   */
  equals(b: Tensor): boolean {
    let result = false;
    tfc.tidy(() => {
      const check = tfc.all(this.tensor.equal(b.tensor));
      if (check.arraySync() === 1) {
        result = true;
      };
    });

    return result;
  }

  /**
   * Adds two tensors.
   * 
   * @param b the tensor to be added
   */
  add(b: Tensor) {
    tfc.tidy(() => {
      const result = this.tensor.add(b.tensor);
      if (this.tensor.rank < result.rank) {
        this.tensor.dispose();
        this.tensor = tfc.variable(result);
      } else {
        this.tensor.assign(result);
      }
    });
  }

  /**
   * Subtracts two tensors.
   * 
   * @param b the tensor to be subtracted
   */
  sub(b: Tensor) {
    tfc.tidy(() => {
      const result = this.tensor.sub(b.tensor);
      if (this.tensor.rank < result.rank) {
        this.tensor.dispose();
        this.tensor = tfc.variable(result);
      } else {
        this.tensor.assign(result);
      }
    });
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
