import * as tfc from '@tensorflow/tfjs-core';
import * as p5 from 'p5';


/**
 * A class to describe a tensor, a generalization of vectors and matrices.
 * Tensors can be thought of as (possibly) multidimensional arrays that support
 * many useful operations. They are applied throughout mathematics, physics,
 * engineering, and computer science.
 */
export class Tensor {
  public tensor: tfc.Tensor;

  private isComplex: boolean = false;

  /**
   * Constructs a new tensor object.
   *
   * @param x the numerical object used to create the tensor
   */
  constructor(x: number | number[] | p5.Vector | tfc.Tensor | Tensor) {
    if (typeof x === 'number') {
      this.tensor = tfc.scalar(x);
    } else if (x instanceof Array) {
      this.tensor = tfc.tensor(x);
    } else if (x instanceof p5.Vector) {
      const v = x.array();
      this.tensor = tfc.tensor(v);
    } else if (x instanceof Tensor) {
      this.tensor = x.tensor;
    } else if (x instanceof tfc.Tensor) {
      this.tensor = x;
    } else {
      throw new Error('Tensors must be created from Numbers, Arrays, or p5.Vectors.');
    }
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
   * Returns a representation of this tensor as a p5.Vector.
   *
   * @returns the p5.Vector
   */
  toVector(): p5.Vector {
    const shape = JSON.stringify(this.tensor.shape);
    if (shape === '[2]' || shape === '[3]') {
      const a = this.arraySync();
      const v = p5.prototype.createVector();
      return v.set(a);
    }

    throw new Error('Tensor cannot be represented as 3D vector');
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
   * @param b   the object to be compared
   * @returns   whether the objects are equals
   */
  equals(b: number | p5.Vector | Tensor): boolean {
    // FIXME: this feels like a hack
    if (b instanceof Tensor) {
      if (b.isComplex && this.isComplex) {
        return this.complexEquals(b);
      }

      if (b.isComplex || this.isComplex) {
        throw new Error('Both tensors must be either real or complex.');
      }
    }

    let result: boolean = false;
    tfc.tidy(() => {
      const z: Tensor = new Tensor(b);
      if (this.tensor.rank !== z.tensor.rank) {
        throw new Error('Both tensors must have the same rank.');
      } else {
        const check: tfc.Tensor = tfc.all(this.tensor.equal(z.tensor));
        if (check.arraySync() === 1) {
          result = true;
        }
      }
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

    const t: tfc.Tensor = tfc.tidy(() => tfc.real(this.tensor));
    const result: Tensor = new Tensor(t);

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

    const t: tfc.Tensor = tfc.tidy(() => tfc.imag(this.tensor));
    const result: Tensor = new Tensor(t);

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

  // ===== Calculation =====

  /**
   * Adds two tensors element-wise.
   *
   * @param b the tensor to be added
   * @returns the sum of the tensors
   */
  add(b: number | p5.Vector | Tensor): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      const z: Tensor = new Tensor(b);
      return this.tensor.add(z.tensor);
    });
    const result = new Tensor(t);
    if (b instanceof Tensor) {
      if (this.isComplex && b.isComplex) {
        result.isComplex = true;
      }
    }

    return result;
  }

  /**
   * Subtracts two tensors element-wise.
   *
   * @param b   the tensor to be subtracted
   * @returns   the difference of the tensors
   */
  sub(b: number | p5.Vector | Tensor): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      const z: Tensor = new Tensor(b);
      return this.tensor.sub(z.tensor);
    });
    const result: Tensor = new Tensor(t);
    if (b instanceof Tensor) {
      if (this.isComplex && b.isComplex) {
        result.isComplex = true;
      }
    }

    return result;
  }

  /**
   * Multiplies two tensors element-wise.
   *
   * @param b the tensor to be multiplied
   * @returns the product of the tensors
   */
  mult(b: number | p5.Vector | Tensor): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      const z: Tensor = new Tensor(b);
      return this.tensor.mul(z.tensor);
    });
    const result: Tensor = new Tensor(t);
    if (b instanceof Tensor) {
      if (this.isComplex && b.isComplex) {
        result.isComplex = true;
      }
    }

    return result;
  }

  /**
   * Divides two tensors element-wise.
   *
   * @param b   the tensor to be divided by
   * @returns   the quotient of the tensors
   */
  div(b: number | p5.Vector | Tensor): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      const z: Tensor = new Tensor(b);
      return this.tensor.div(z.tensor);
    });
    const result: Tensor = new Tensor(t);
    if (b instanceof Tensor) {
      if (this.isComplex && b.isComplex) {
        result.isComplex = true;
      }
    }

    return result;
  }

  /**
   * Calculates the dot product of two matrices and/or vectors.
   * Note: Only works when both operands are rank 1 or 2.
   *
   * @param b   the matrix or vector to be dotted
   * @returns   the dot product of the tensors
   */
  dot(b: p5.Vector | Tensor): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      const z: Tensor = new Tensor(b);
      return this.tensor.dot(z.tensor);
    });
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Calculates the absolute value (magniutde) of each tensor element.
   * The absolute value of a number is always positive.
   *
   * @returns the absolute value of each tensor element
   */
  abs(): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.abs());
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.ceil());
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.clipByValue(low, high));
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Raise Euler's number e (2.71828...) to the power of each tensor
   * element.
   *
   * @returns e^n for each tensor element
   */
  exp(): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.exp());
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.floor());
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.log());
    const result: Tensor = new Tensor(t);

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
   * Performs modular (remainder) division on two tensors element-wise.
   *
   * @param b the tensor to be divided by
   * @returns the remainder(s)
   */
  mod(b: number | Tensor): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      const z: Tensor = new Tensor(b);
      return this.tensor.mod(z.tensor);
    });
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Facilitates exponential expressions. The pow() method is an
   * efficient way of multiplying tensors by themselves (or their
   * reciprocals) in large quantities.
   *
   * @param b the power by which to raise each tensor element
   */
  pow(b: number | Tensor): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      const z: Tensor = new Tensor(b);
      return this.tensor.pow(z.tensor);
    });
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Calculates the integer closest to each tensor element. For
   * example, round(133.8) returns the value 134.
   *
   * @returns each tensor element rounded
   */
  round(): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.round());
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.square());
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.sqrt());
    const result: Tensor = new Tensor(t);

    return result;
  }

  // ===== Reduction =====

  /**
   * Calculates the sum of tensor elements along an axis.
   *
   * @param axis (optional) the axis to sum along
   * @returns    the sum
   */
  sum(axis?: number | number[]): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.sum(axis));
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.acos());
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.asin());
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.atan());
    const result: Tensor = new Tensor(t);

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
  atan2(b: number | Tensor): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      const z: Tensor = new Tensor(b);
      return this.tensor.atan2(z.tensor);
    });
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.cos());
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.sin());
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.tan());
    const result: Tensor = new Tensor(t);

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
  static complex(real: number | Tensor, imag: number | Tensor): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      let re: tfc.Tensor;
      let im: tfc.Tensor;
      if (typeof real === 'number' && typeof imag === 'number') {
        re = tfc.tensor(real);
        im = tfc.tensor(imag);
      } else if (real instanceof Tensor && imag instanceof Tensor) {
        re = tfc.clone(real.tensor);
        im = tfc.clone(imag.tensor);
      } else {
        throw new Error('Components must be either Numbers or Tensors');
      }

      return tfc.complex(re, im);
    });
    const result: Tensor = new Tensor(t);
    result.isComplex = true;

    return result;
  }

  /**
   * Gets a copy of the tensor, returns a Tensor object.
   *
   * @returns a copy of the tensor
   */
  copy(): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.clone());
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => tfc.eye(numRows, numCols));
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => tfc.fill(shape, value));
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => tfc.linspace(min, max, num));
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Creates a tensor filled with ones.
   *
   * @param shape the shape of the tensor
   * @returns     the filled tensor
   */
  static ones(shape: number[]): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => tfc.ones(shape));
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Creates a tensor filled with uniformly distributed random numbers.
   *
   * @param shape the shape of the tensor
   * @returns     the filled tensor
   */
  static random(shape: number[]): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => tfc.randomUniform(shape));
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => tfc.randomNormal(shape, mean, sd));
    const result: Tensor = new Tensor(t);

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
    const t: tfc.Tensor = tfc.tidy(() => tfc.range(min, max, step));
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Creates a tensor filled with zeros.
   *
   * @param shape the shape of the tensor
   * @returns     the filled tensor
   */
  static zeros(shape: number[]): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => tfc.zeros(shape));
    const result: Tensor = new Tensor(t);

    return result;
  }

  // ===== Transformations =====

  /**
   * Flattens this tensor to one dimension.
   *
   * @returns the flattened tensor
   */
  flatten(): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.flatten());
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Pads a tensor with a given value and paddings.
   *
   * @param paddings      an array prescribing how much to pad [before, after] along
   *                      each tensor axis
   * @param constantValue (optional) the pad value to use
   * @returns             the padded tensor
   */
  pad(paddings: Array<[number, number]>, constantValue?: number): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.pad(paddings, constantValue));
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Reshapes a tensor to a given shape.
   *
   * @param shape an array of integers defining the output tensor shape
   * @returns     the reshaped tensor
   */
  reshape(shape: number[]): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.reshape(shape));
    const result: Tensor = new Tensor(t);

    return result;
  }

  // ===== Slicing and Joining =====

  /**
   * Concatenates two or more tensors.
   *
   * @param b    the tensor(s) to be concatenated
   * @param axis (optional) the axis to concatenate along
   * @returns    the concatenated tensor
   */
  concat(b: Tensor | Tensor[], axis?: number): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      const tensors: tfc.Tensor[] = [this.tensor];
      if (b instanceof Tensor) {
        tensors.push(b.tensor);
      } else if (b instanceof Array) {
        const z: tfc.Tensor[] = b.map((x) => x.tensor);
        tensors.concat(z);
      }

      return tfc.concat(tensors, axis);
    });
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Reverses the tensor along a specificed axis.
   *
   * @param axis (optional) the axis to reverse along
   * @returns    the reversed tensor
   */
  reverse(axis?: number | number[]): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.reverse(axis));
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Extracts a slice from a tensor.
   *
   * @param begin the coordinates to start the slice from
   * @param size  (optional) the size of the slice
   * @returns     the tensor slice
   */
  slice(begin: number | number[], size?: number | number[]): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => this.tensor.slice(begin, size));
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Splits a tensor into sub tensors.
   *
   * @param numOrSizeSplits either an integer indicating the number of splits along the axis
   *                        or an array of integers containing the sizes of each output tensor
   *                        along the axis. If a number then it must evenly divide the axis
   *                        length; otherwise the sum of sizes must match axis length.
   * @param axis            (optional) the dimension along which to split
   * @returns               the split tensor
   */
  split(numOrSizeSplits: number | number[], axis?: number): Tensor[] {
    const t: tfc.Tensor<tfc.Rank>[] = tfc.tidy(() => this.tensor.split(numOrSizeSplits, axis));
    const result: Tensor[] = t.map((tensor) => new Tensor(tensor));

    return result;
  }

  /**
   * Stacks a list of tensors along an axis. Tensors must have the same rank.
   *
   * @param tensors the tensors to be stacked
   * @param axis    (optional) the axis to stack along
   * @returns       the stacked tensor
   */
  static stack(tensors: Tensor[], axis?: number): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      const tarray: tfc.Tensor[] = new Array(tensors.length);
      for (let i = 0; i < tensors.length; i += 1) {
        tarray[i] = tensors[i].tensor;
      }

      return tfc.stack(tarray, axis);
    });
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Unstacks a rank-R tensor into an array of rank-(R-1) tensors.
   *
   * @param axis (optional) the axis to unstack along
   * @returns    the array of tensors
   */
  unstack(axis?: number): Tensor[] {
    const t: tfc.Tensor<tfc.Rank>[] = tfc.tidy(() => this.tensor.unstack(axis));
    const result: Tensor[] = t.map((tensor) => new Tensor(tensor));

    return result;
  }

  // ===== Elementary Row Operations =====

  /**
   * Adds two rows of a matrix.
   *
   * @param r1 the index of the row being added to the other row
   * @param r2 the index of the row being added to
   * @param c  (optional) the constant multiplier for r1
   * @returns  the resulting matrix
   */
  addRows(r1: number, r2: number, c = 1): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      if (this.tensor.shape.length !== 2) {
        throw new Error('Elementary row operations are only defined on matrices.');
      }

      const begin: tfc.Tensor = this.tensor.slice(0, r2);
      const row1: tfc.Tensor = this.tensor.slice(r1, 1);
      let row2: tfc.Tensor = this.tensor.slice(r2, 1);
      const final: tfc.Tensor = this.tensor.slice(r2 + 1, this.tensor.shape[0] - r2 - 1);
      row2 = row2.add(row1.mul(c));

      return begin.concat([row2, final]);
    });
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Subtracts two rows of a matrix.
   *
   * @param r1 the index of the row being subtracted from the other row
   * @param r2 the index of the row being subtracted from
   * @param c  (optional) the constant multiplier for r1
   * @returns  the resulting matrix
   */
  subRows(r1: number, r2: number, c = 1): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      if (this.tensor.shape.length !== 2) {
        throw new Error('Elementary row operations are only defined on matrices.');
      }

      const begin: tfc.Tensor = this.tensor.slice(0, r2);
      const row1: tfc.Tensor = this.tensor.slice(r1, 1);
      let row2: tfc.Tensor = this.tensor.slice(r2, 1);
      const final: tfc.Tensor = this.tensor.slice(r2 + 1, this.tensor.shape[0] - r2 - 1);
      row2 = row2.sub(row1.mul(c));

      return begin.concat([row2, final]);
    });
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Swaps two rows of a matrix.
   *
   * @param r1 the index of the first row being swapped
   * @param r2 the index of the second row being swapped
   * @returns  the resulting matrix
   */
  swapRows(r1: number, r2: number): Tensor {
    const first: number = Math.min(r1, r2);
    const second: number = Math.max(r1, r2);

    const t: tfc.Tensor = tfc.tidy(() => {
      if (this.tensor.shape.length !== 2) {
        throw new Error('Elementary row operations are only defined on matrices.');
      }

      const begin: tfc.Tensor = this.tensor.slice(0, first);
      const row1: tfc.Tensor = this.tensor.slice(first, 1);
      const middle: tfc.Tensor = this.tensor.slice(first + 1, second - first - 1);
      const row2: tfc.Tensor = this.tensor.slice(second, 1);
      const final: tfc.Tensor = this.tensor.slice(second + 1, this.tensor.shape[0] - second - 1);

      return begin.concat([row2, middle, row1, final]);
    });
    const result: Tensor = new Tensor(t);

    return result;
  }

  /**
   * Multiplies a row of a matrix by a constant.
   *
   * @param r1 the index of the row being multiplied
   * @param c  the constant multiplier
   * @returns  the resulting matrix
   */
  mulRow(r1: number, c: number): Tensor {
    const t: tfc.Tensor = tfc.tidy(() => {
      if (this.tensor.shape.length !== 2) {
        throw new Error('Elementary row operations are only defined on matrices.');
      }

      const begin: tfc.Tensor = this.tensor.slice(0, r1);
      let row1: tfc.Tensor = this.tensor.slice(r1, 1);
      const final: tfc.Tensor = this.tensor.slice(r1 + 1, this.tensor.shape[0] - r1 - 1);
      row1 = row1.mul(c);

      return begin.concat([row1, final]);
    });
    const result: Tensor = new Tensor(t);

    return result;
  }
}

/**
 * Creates a new Tensor (the datatype for storing tensors).
 *
 * @param x   the numerical object used to create the tensor
 * @returns   the tensor
 */
export const createTensor = function createTensorObject(
  x: number | number[] | p5.Vector | tfc.Tensor | Tensor,
): Tensor {
  return new Tensor(x);
};
