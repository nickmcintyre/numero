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
    let result: boolean = false;
    tfc.tidy(() => {
      const check: tfc.Tensor = tfc.all(this.tensor.equal(b.tensor));
      if (check.arraySync() === 1) {
        result = true;
      };
    });

    return result;
  }

  /**
   * Handle any changes in the tensor's rank due to an operation.
   * Note: Only call method from within tfc.tidy() to avoid memory leaks.
   * 
   * @param result the tensor resulting from an operation
   */
  private handleRank(result: tfc.Tensor) {
    if (this.tensor.rank !== result.rank) {
      this.tensor.dispose();
      this.tensor = tfc.variable(result);
    } else {
      this.tensor.assign(result);
    }
  }

  /**
   * Adds two tensors.
   * 
   * @param b the tensor to be added
   */
  add(b: Tensor) {
    tfc.tidy(() => {
      const result: tfc.Tensor = this.tensor.add(b.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Subtracts two tensors.
   * 
   * @param b the tensor to be subtracted
   */
  sub(b: Tensor) {
    tfc.tidy(() => {
      const result: tfc.Tensor = this.tensor.sub(b.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Multiplies two tensors.
   * 
   * @param b the tensor to be multiplied
   */
  mul(b: Tensor) {
    tfc.tidy(() => {
      const result: tfc.Tensor = this.tensor.mul(b.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Divides two tensors.
   * 
   * @param b the tensor to be divided by
   */
  div(b: Tensor) {
    tfc.tidy(() => {
      const result: tfc.Tensor = this.tensor.div(b.tensor);
      this.handleRank(result);
    });
  }

  dot(b: any, dim?: number) {
    tfc.tidy(() => {
      let result: tfc.Tensor;
      if (b instanceof Tensor) {
        result = this.tensor.dot(b.tensor);
      } else if (b instanceof p5.Vector) {
        let b_: number[];
        let t2: Tensor;
        if (dim === 2) {
          b_ = b.array().slice(0, 2);
        } else if (dim === 3) {
          b_ = b.array().slice(0, 3);
        } else {
          throw new Error('p5.Vectors must be 2 or 3-dimensional.');
        }

        t2 = createTensor(b_);
        result = this.tensor.dot(t2.tensor);
        t2.tensor.dispose();
      } else {
        throw new Error('Tensors must be dotted with Tensors or p5.Vectors.');
      }

      this.handleRank(result);
    });
  }
};

/**
 * Creates a new Tensor (the datatype for storing tensors).
 *
 * @param obj the reference Number, Array, or p5.Vector
 */
const createTensor = function createTensorObject(obj: any): Tensor {
  return new Tensor(obj);
};

export {
  Tensor,
  createTensor,
};
