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
      } else if (obj instanceof tfc.Tensor) {
        this.tensor = tfc.variable(obj);
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
   * @return the equivalent tensor
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
   * Adds two tensors element-wise.
   * 
   * @param b the tensor to be added
   */
  add(b: any, dim?: number) {
    tfc.tidy(() => {
      const b_: Tensor = this.handleType(b, dim);
      const result: tfc.Tensor = this.tensor.add(b_.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Subtracts two tensors element-wise.
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
   * Multiplies two tensors element-wise.
   * 
   * @param b the tensor to be multiplied
   */
  mult(b: any, dim?: number) {
    tfc.tidy(() => {
      const b_: Tensor = this.handleType(b, dim);
      const result: tfc.Tensor = this.tensor.mul(b_.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Divides two tensors element-wise.
   * 
   * @param b the tensor to be divided by
   * @param dim (optional) the number of dimensions in a p5.Vector
   */
  div(b: any, dim?: number) {
    tfc.tidy(() => {
      const b_: Tensor = this.handleType(b, dim);
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
      const b_: Tensor = this.handleType(b, dim);
      const result: tfc.Tensor = this.tensor.dot(b_.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Calculates the absolute value (magniutde) of each tensor element.
   * The absolute value of a number is always positive.
   * 
   * @return the absolute value of each tensor element
   */
  abs(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.abs();
      result = createTensor(t);
    });

    return result;
  }

  /**
   * Calculates the closest int value that is greater than or equal to
   * the value of each tensor element. For example, ceil(9.03) returns
   * the value 10.
   * 
   * @return each tensor element rounded up
   */
  ceil(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.ceil();
      result = createTensor(t);
    });

    return result;
  }

  /**
   * Constrains the value of each tensor element between a minimum and
   * maximum value.
   * 
   * @param low the minimum value
   * @param high the maximum value
   * @return each tensor element constrained to the given range
   */
  constrain(low: number, high: number): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.clipByValue(low, high);
      result = createTensor(t);
    });

    return result;
  }

  /**
   * Raise Euler's number e (2.71828...) to the power of each tensor
   * element.
   * 
   * @return e^n for each tensor element
   */
  exp(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.exp();
      result = createTensor(t);
    });

    return result;
  }

  /**
   * Calculates the closest int value that is less than or equal to
   * the value of each tensor element. For example, floor(9.97) returns
   * the value 9.
   * 
   * @return each tensor element rounded down
   */
  floor(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.floor();
      result = createTensor(t);
    });

    return result;
  }

  /**
   * Calculates the natural logarithm (the base-e logarithm) of each tensor
   * element. This function expects each tensor element to be a value
   * greater than 0.0.
   * 
   * @return the natural logarithm of each tensor element
   */
  log(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.log();
      result = createTensor(t);
    });

    return result;
  }

  /**
   * Determines the largest value in a tensor, and then returns that value.
   * 
   * @return the maximum number in the tensor
   */
  max(): number {
    let result: any;
    tfc.tidy(() => {
      const t: tfc.Tensor = tfc.max(this.tensor);
      result = t.arraySync();
    });

    return result;
  }

  /**
   * Determines the smallest value in a tensor, and then returns that value.
   * 
   * @return the minimum number in the tensor
   */
  min(): number {
    let result: any;
    tfc.tidy(() => {
      const t: tfc.Tensor = tfc.min(this.tensor);
      result = t.arraySync();
    });

    return result;
  }

  /**
   * Facilitates exponential expressions. The pow() method is an
   * efficient way of multiplying tensors by themselves (or their
   * reciprocals) in large quantities.
   * 
   * @param b the power by which to raise each tensor element
   */
  pow(b: any): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const b_: Tensor = this.handleType(b);
      const t = this.tensor.pow(b_.tensor);
      result = createTensor(t);
    });

    return result;
  }

  /**
   * Calculates the integer closest to each tensor element. For
   * example, round(133.8) returns the value 134.
   * 
   * @return each tensor element rounded
   */
  round(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.round();
      result = createTensor(t);
    });

    return result;
  }

  /**
   * Squares each tensor element (multiplies a number by itself). The
   * result is always a positive number, as multiplying two negative
   * numbers always yields a positive result. For example, -1 * -1 = 1.
   * 
   * @return the square of each tensor element
   */
  sq(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.square();
      result = createTensor(t);
    });

    return result;
  }

  /**
   * Calculates the square root of each tensor element. The square root
   * of a number is always positive, even though there may be a valid
   * negative root. The square root s of number a is such that s*s = a.
   * It is the opposite of squaring.
   * 
   * @return the square root of each tensor element
   */
  sqrt(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.sqrt();
      result = createTensor(t);
    });

    return result;
  }

  /**
   * The inverse of cos(), returns the arc cosine of each tensor element.
   * This function expects the values in the range of -1 to 1 and values
   * are returned in the range 0 to PI (3.1415927).
   * 
   * @return the arc cosine of each tensor element
   */
  acos(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.acos();
      result = createTensor(t);
    });

    return result;
  }

  /**
   * The inverse of sin(), returns the arc sine of a each tensor element.
   * This function expects the values in the range of -1 to 1 and values
   * are returned in the range -PI/2 to PI/2.
   * 
   * @return the arc sine of each tensor element
   */
  asin(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.asin();
      result = createTensor(t);
    });

    return result;
  }

  /**
   * The inverse of tan(), returns the arc tangent of each tensor element.
   * This function expects the values in the range of -Infinity to Infinity
   * (exclusive) and values are returned in the range -PI/2 to PI/2.
   * 
   * @return the arc tangent of each tensor element
   */
  atan(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.atan();
      result = createTensor(t);
    });

    return result;
  }

  /**
  * Calculates the angle (in radians) from a specified point to the
  * coordinate origin as measured from the positive x-axis. Values are
  * returned as a float in the range from PI to -PI.
  * 
  * @param b the x-coordinate(s) used for computing arctangent
  * @return the arctangent of each tensor element 
  */
  atan2(b: any): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const b_: Tensor = this.handleType(b);
      const t = this.tensor.atan2(b_.tensor);
      result = createTensor(t);
    });

    return result;
  }

  /**
   * Calculates the cosine of each tensor element. This function
   * does not yet take into account the current angleMode.
   * Values are returned in the range -1 to 1.
   * 
   * @return the cosine of each tensor element
   */
  cos(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.cos();
      result = createTensor(t);
    });

    return result;
  }

  /**
   * Calculates the sine of each tensor element. This function
   * does not yet take into account the current angleMode.
   * Values are returned in the range -1 to 1.
   * 
   * @return the sine of each tensor element
   */
  sin(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.sin();
      result = createTensor(t);
    });

    return result;
  }

  /**
   * Calculates the tangent of each tensor element. This function
   * does not yet take into account the current angleMode.
   * 
   * @return the tangent of each tensor element
   */
  tan(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.tan();
      result = createTensor(t);
    });

    return result;
  }
};

/**
 * Creates a new Tensor (the datatype for storing tensors).
 *
 * @param obj the reference Number, Array, p5.Vector, or tfc.Tensor
 */
const createTensor = function createTensorObject(obj: any, dim?: number): Tensor {
  return new Tensor(obj, dim);
};

export {
  Tensor,
  createTensor,
};
