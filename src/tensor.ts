import * as tfc from '@tensorflow/tfjs-core';
import * as p5 from 'p5';


/**
 * A class to describe a tensor, a generalization of vectors and matrices.
 * Tensors can be thought of as (possibly) multidimensional arrays that support
 * many useful operations. They are applied throughout mathematics, physics,
 * engineering, and computer science.
 */
export class Tensor {
  public tensor: tfc.Variable;
  private isComplex: boolean = false;

  /**
   * Constructs a new tensor object.
   * 
   * @param obj the numerical object used to create the tensor
   * @param dim (optional) the dimensionality of the p5.Vector used
   */
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
      } else if (obj instanceof Tensor) {
        this.tensor = tfc.variable(obj.tensor);
      } else if (obj instanceof tfc.Tensor) {
        this.tensor = tfc.variable(obj);
      } else {
        throw new Error('Tensors must be created from Numbers, Arrays, or p5.Vectors.');
      }
    });
  }

  // ===== Utilities =====

  /**
   * Returns a string representation of this tensor. This method is useful for
   * logging tensors to the console.
   * 
   * @returns a human-readable description of the tensor
   */
  toString(): string {
    return this.tensor.toString();
  }

  /**
   * Returns a representation of this tensor as a float array. The data
   * transfer is done asynchronously.
   * 
   * @returns the (possibly nested) array of values
   */
  async array(): Promise<any> {
    const vals = await this.tensor.array();

    return vals;
  }
  
  /**
   * Returns a representation of this tensor as a float array. The data
   * transfer is done synchronously.
   * 
   * @returns the (possibly nested) array of values
   */
  arraySync(): any {
    return this.tensor.arraySync();
  }

  /**
   * Disposes the tensor from memory.
   */
  dispose() {
    this.tensor.dispose();
  }

  /**
   * Equality check against a Number, p5.Vector, or Tensor.
   * 
   * @param b   the tensor to be compared
   * @param dim (optional) the dimensionality of the p5.Vector used
   * @returns   whether the objects are equals
   */
  equals(b: any, dim?: number): boolean {
    // FIXME: this feels like a hack
    if (b.isComplex && this.isComplex) {
      return this.complexEquals(b);
    } else if (b.isComplex || this.isComplex) {
      throw new Error('Both tensors must be either real or complex.');
    }

    let result: boolean = false;
    tfc.tidy(() => {
      const b_: Tensor = new Tensor(b, dim);
      if (this.tensor.rank !== b_.tensor.rank) {
        throw new Error('Both tensors must have the same rank.');
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
   * Gets the real component of a complex tensor.
   * 
   * @returns the real component(s) of the tensor
   */
  real(): Tensor {
    if (!this.isComplex) {
      throw new Error('Tensor must be complex to use this method.');
    }

    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = tfc.real(this.tensor);
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Gets the imaginary component of a complex tensor.
   * 
   * @returns the imaginary component(s) of the tensor
   */
  imag(): Tensor {
    if (!this.isComplex) {
      throw new Error('Tensor must be complex to use this method.');
    }

    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = tfc.imag(this.tensor);
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Equality check against a complex tensor.
   * 
   * @param b the tensor to be compared
   * @returns whether the objects are equals
   */
  private complexEquals(b: Tensor): boolean {
    let result: boolean = false;
    tfc.tidy(() => {
      const realCheck: boolean = this.real().equals(b.real());
      const imagCheck: boolean = this.imag().equals(b.imag());
      if (realCheck && imagCheck) {
        result = true;
      }
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

  // ===== Calculation =====

  /**
   * Adds two tensors element-wise.
   * 
   * @param b the tensor to be added
   */
  add(b: any, dim?: number) {
    tfc.tidy(() => {
      const b_: Tensor = new Tensor(b, dim);
      const result: tfc.Tensor = this.tensor.add(b_.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Subtracts two tensors element-wise.
   * 
   * @param b   the tensor to be subtracted
   * @param dim (optional) the number of dimensions in a p5.Vector
   */
  sub(b: any, dim?: number) {
    tfc.tidy(() => {
      const b_: Tensor = new Tensor(b, dim);
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
      const b_: Tensor = new Tensor(b, dim);
      const result: tfc.Tensor = this.tensor.mul(b_.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Divides two tensors element-wise.
   * 
   * @param b   the tensor to be divided by
   * @param dim (optional) the number of dimensions in a p5.Vector
   */
  div(b: any, dim?: number) {
    tfc.tidy(() => {
      const b_: Tensor = new Tensor(b, dim);
      const result: tfc.Tensor = this.tensor.div(b_.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Calculates the dot product of two matrices and/or vectors.
   * Note: Only works when both operands are rank 1 or 2.
   * 
   * @param b   the matrix or vector to be dotted
   * @param dim (optional) the number of dimensions in a p5.Vector
   */
  dot(b: any, dim?: number) {
    tfc.tidy(() => {
      const b_: Tensor = new Tensor(b, dim);
      const result: tfc.Tensor = this.tensor.dot(b_.tensor);
      this.handleRank(result);
    });
  }

  /**
   * Calculates the absolute value (magniutde) of each tensor element.
   * The absolute value of a number is always positive.
   * 
   * @returns the absolute value of each tensor element
   */
  abs(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.abs();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Calculates the closest int value that is greater than or equal to
   * the value of each tensor element. For example, ceil(9.03) returns
   * the value 10.
   * 
   * @returns each tensor element rounded up
   */
  ceil(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.ceil();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Constrains the value of each tensor element between a minimum and
   * maximum value.
   * 
   * @param low  the minimum value
   * @param high the maximum value
   * @returns    each tensor element constrained to the given range
   */
  constrain(low: number, high: number): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.clipByValue(low, high);
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Raise Euler's number e (2.71828...) to the power of each tensor
   * element.
   * 
   * @returns e^n for each tensor element
   */
  exp(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.exp();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Calculates the closest int value that is less than or equal to
   * the value of each tensor element. For example, floor(9.97) returns
   * the value 9.
   * 
   * @returns each tensor element rounded down
   */
  floor(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.floor();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Calculates the natural logarithm (the base-e logarithm) of each tensor
   * element. This function expects each tensor element to be a value
   * greater than 0.0.
   * 
   * @returns the natural logarithm of each tensor element
   */
  log(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.log();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Determines the largest value in a tensor, and then returns that value.
   * 
   * @returns the maximum number in the tensor
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
   * @returns the minimum number in the tensor
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
      const b_: Tensor = new Tensor(b);
      const t = this.tensor.pow(b_.tensor);
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Calculates the integer closest to each tensor element. For
   * example, round(133.8) returns the value 134.
   * 
   * @returns each tensor element rounded
   */
  round(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.round();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Squares each tensor element (multiplies a number by itself). The
   * result is always a positive number, as multiplying two negative
   * numbers always yields a positive result. For example, -1 * -1 = 1.
   * 
   * @returns the square of each tensor element
   */
  sq(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.square();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Calculates the square root of each tensor element. The square root
   * of a number is always positive, even though there may be a valid
   * negative root. The square root s of number a is such that s*s = a.
   * It is the opposite of squaring.
   * 
   * @returns the square root of each tensor element
   */
  sqrt(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.sqrt();
      result = new Tensor(t);
    });

    return result;
  }

  // ===== Trigonometry =====

  /**
   * The inverse of cos(), returns the arc cosine of each tensor element.
   * This function expects the values in the range of -1 to 1 and values
   * are returned in the range 0 to PI (3.1415927).
   * 
   * @returns the arc cosine of each tensor element
   */
  acos(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.acos();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * The inverse of sin(), returns the arc sine of a each tensor element.
   * This function expects the values in the range of -1 to 1 and values
   * are returned in the range -PI/2 to PI/2.
   * 
   * @returns the arc sine of each tensor element
   */
  asin(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.asin();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * The inverse of tan(), returns the arc tangent of each tensor element.
   * This function expects the values in the range of -Infinity to Infinity
   * (exclusive) and values are returned in the range -PI/2 to PI/2.
   * 
   * @returns the arc tangent of each tensor element
   */
  atan(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.atan();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Calculates the angle (in radians) from a specified point to the
   * coordinate origin as measured from the positive x-axis. Values are
   * returned as a float in the range from PI to -PI.
   * 
   * @param b the x-coordinate(s) used for computing the arc tangent
   * @returns the arc tangent of each tensor element
   */
  atan2(b: any): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const b_: Tensor = new Tensor(b);
      const t = this.tensor.atan2(b_.tensor);
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Calculates the cosine of each tensor element. This function
   * does not yet take into account the current angleMode.
   * Values are returned in the range -1 to 1.
   * 
   * @returns the cosine of each tensor element
   */
  cos(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.cos();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Calculates the sine of each tensor element. This function
   * does not yet take into account the current angleMode.
   * Values are returned in the range -1 to 1.
   * 
   * @returns the sine of each tensor element
   */
  sin(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.sin();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Calculates the tangent of each tensor element. This function
   * does not yet take into account the current angleMode.
   * Values are returned in the range of all real numbers.
   * 
   * @returns the tangent of each tensor element
   */
  tan(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.tan();
      result = new Tensor(t);
    });

    return result;
  }

  // ===== Creation Methods =====

  /**
   * Creates a complex tensor with the given real and imaginary
   * components.
   * 
   * @param real the real component(s)
   * @param imag the imaginary component(s)
   * @returns    the complex tensor
   */
  static complex(real: any, imag: any): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      let real_: tfc.Tensor;
      let imag_: tfc.Tensor;
      if (typeof real === 'number' && typeof imag === 'number') {
        real_ = tfc.tensor(real);
        imag_ = tfc.tensor(imag);
      } else if (real instanceof Tensor && imag instanceof Tensor) {
        real_ = real.tensor;
        imag_ = imag.tensor;
      } else {
        throw new Error('Components must be either Numbers or Tensors');
      }

      const t: tfc.Tensor = tfc.complex(real_, imag_);
      result = new Tensor(t);
      result.isComplex = true;
    });

    return result;
  };

  /**
   * Gets a copy of the tensor, returns a Tensor object.
   * 
   * @returns a copy of the tensor
   */
  copy(): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = this.tensor.clone();
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Creates an identity matrix with the given dimensions.
   * 
   * @param numRows the number of rows
   * @param numCols (optional) the number of columns
   * @returns       the identity matrix
   */
  static eye(numRows: number, numCols?: number): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = tfc.eye(numRows, numCols);
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Creates a tensor filled with a given value.
   * 
   * @param shape the shape of the tensor
   * @param value the value to fill the tensor with
   * @returns     the filled tensor
   */
  static fill(shape: number[], value: number): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = tfc.fill(shape, value);
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Creates a tensor filled with evenly spaced values.
   * 
   * @param min the lower bound (inclusive)
   * @param max the upper bound (inclusive)
   * @param num the number of values to generate
   * @returns   the filled tensor
   */
  static linspace(min: number, max: number, num: number): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = tfc.linspace(min, max, num);
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Creates a tensor filled with ones.
   * 
   * @param shape the shape of the tensor
   * @returns     the filled tensor
   */
  static ones(shape: number[]): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      let t: tfc.Tensor = tfc.ones(shape);
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Creates a tensor filled with uniformly distributed random numbers.
   * 
   * @param shape the shape of the tensor
   * @returns     the filled tensor
   */
  static random(shape: number[]): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      const t: tfc.Tensor = tfc.randomUniform(shape);
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Creates a tensor filled with normally distributed random numbers.
   * 
   * @param shape the shape of tensor
   * @param mean  (optional) the mean
   * @param sd    (optional) the standard deviation
   * @returns     the filled tensor
   */
  static randomGaussian(shape: number[], mean?: number, sd?: number): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      let t: tfc.Tensor = tfc.randomNormal(shape, mean, sd);
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Creates a tensor filled with numbers in the range provided.
   * 
   * @param min  the lower bound (inclusive)
   * @param max  the upper bound (exclusive)
   * @param step (optional) the integer spacing between values
   * @returns    the filled tensor
   */
  static range(min: number, max: number, step?: number): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      let t: tfc.Tensor = tfc.range(min, max, step);
      result = new Tensor(t);
    });

    return result;
  }

  /**
   * Creates a tensor filled with zeros.
   * 
   * @param shape the shape of the tensor
   * @returns     the filled tensor
   */
  static zeros(shape: number[]): Tensor {
    let result: Tensor;
    tfc.tidy(() => {
      let t: tfc.Tensor = tfc.zeros(shape);
      result = new Tensor(t);
    });

    return result;
  }
};

/**
 * Creates a new Tensor (the datatype for storing tensors).
 *
 * @param obj the numerical object used to create the tensor
 * @param dim (optional) the dimensionality of the p5.Vector used
 * @returns   the tensor
 */
export const createTensor = function createTensorObject(obj: any, dim?: number): Tensor {
  return new Tensor(obj, dim);
};
