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

  constructor(obj: any, dim?: number) {
    tfc.tidy(() => {
      if (typeof obj === 'number') {
        this.tensor = tfc.variable(tfc.scalar(obj));
      } else if (obj instanceof Array) {
        this.tensor = tfc.variable(tfc.tensor(obj));
      } else if (obj instanceof p5.Vector) {
        if (!(dim >= 2 && dim <= 3)) {
          throw new Error('p5.Vectors must be 2 or 3-dimensional.');
        }

        const v = obj.array().slice(0, dim);
        this.tensor = tfc.variable(tfc.tensor(v));
      } else {
        throw new Error('Tensors must be created from Numbers, Arrays, or p5.Vectors.');
      }
    });
  }

  /**
   * Handle any necessary conversions from Number or p5.Vector.
   * 
   * @param b the input Number, p5.Vector, or Tensor to be made compatible
   * @param dim (optional) the number of dimenions in a p5.Vector
   */
  private handleType(b: any, dim?: number): Tensor {
    let b_: Tensor;
    if (typeof b === 'number') {
      b_ = createTensor(b);
    } else if (b instanceof p5.Vector) {
      b_ = createTensor(b, dim);
    } else if (b instanceof Tensor) {
      b_ = b;
    } else {
      throw new Error('Operation only defined on Numbers, p5.Vectors, or Tensors.');
    }

    return b_;
  }

  /**
   * Equality check against a Number, p5.Vector, or Tensor.
   * 
   * @param b the tensor to be compared
   */
  equals(b: any, dim?: number): boolean {
    let result: boolean = false;
    tfc.tidy(() => {
      const b_: Tensor = this.handleType(b, dim);
      if (this.tensor.rank !== b_.tensor.rank) {
        result = false;
      } else {
        const check: tfc.Tensor = tfc.all(this.tensor.equal(b_.tensor));
        if (check.arraySync() === 1) {
          result = true;
        }
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
   * 
   */
  add(b: any, dim?: number) {
    tfc.tidy(() => {
      const b_: Tensor = this.handleType(b, dim);
      const result: tfc.Tensor = this.tensor.add(b_.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Subtracts two tensors.
   * 
   * @param b the tensor to be subtracted
   * @param dim (optional) the number of dimensions in a p5.Vector
   */
  sub(b: any, dim?: number) {
    tfc.tidy(() => {
      const b_: Tensor = this.handleType(b, dim);
      const result: tfc.Tensor = this.tensor.sub(b_.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Multiplies two tensors.
   * 
   * @param b the tensor to be multiplied
   */
  mul(b: any, dim?: number) {
    tfc.tidy(() => {
      const b_: Tensor = this.handleType(b, dim);
      const result: tfc.Tensor = this.tensor.mul(b_.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Divides two tensors.
   * 
   * @param b the tensor to be divided by
   * @param dim (optional) the number of dimensions in a p5.Vector
   */
  div(b: any, dim?: number) {
    tfc.tidy(() => {
      const b_ = this.handleType(b, dim);
      const result: tfc.Tensor = this.tensor.div(b_.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Calculates the dot product of two matrices and/or vectors.
   * Note: Only works when both operands are rank 1 or 2.
   * 
   * @param b the matrix or vector to be dotted
   * @param dim (optional) the number of dimensions in a p5.Vector
   */
  dot(b: any, dim?: number) {
    tfc.tidy(() => {
      const b_ = this.handleType(b, dim);
      const result: tfc.Tensor = this.tensor.dot(b_.tensor);
      this.handleRank(result);
    });
  }
};

/**
 * Creates a new Tensor (the datatype for storing tensors).
 *
 * @param obj the reference Number, Array, or p5.Vector
 */
const createTensor = function createTensorObject(obj: any, dim?: number): Tensor {
  return new Tensor(obj, dim);
};

export {
  Tensor,
  createTensor,
};
