import * as p5 from 'p5';

import { Tensor } from './index';

// ===== Calculation =====

/**
 * Adds two tensors element-wise.
 *
 * @param a the first tensor to be added
 * @param b the second tensor to be added
 * @returns the sum of the tensors
 */
export const add = function tensorAdd(
  a: Tensor,
  b: number | p5.Vector | Tensor,
): Tensor {
  return a.add(b);
};

/**
 * Subtracts two tensors element-wise.
 *
 * @param a the tensor to subtract from
 * @param b the tensor to be subtracted
 * @returns the difference of the tensors
 */
export const sub = function tensorSub(
  a: Tensor,
  b: number | p5.Vector | Tensor,
): Tensor {
  return a.sub(b);
};

/**
 * Multiplies two tensors element-wise.
 *
 * @param a the first tensor to multiply
 * @param b the second tensor to multiply
 * @returns the product of the tensors
 */
export const mult = function tensorMult(
  a: Tensor,
  b: number | p5.Vector | Tensor,
): Tensor {
  return a.mult(b);
};

/**
 * Divides two tensors element-wise.
 *
 * @param a the dividend tensor
 * @param b the divisor tensor
 * @returns the quotient of the tensors
 */
export const div = function tensorDiv(
  a: Tensor,
  b: number | p5.Vector | Tensor,
): Tensor {
  return a.div(b);
};

/**
 * Calculates the dot product of two matrices and/or vectors.
 * Note: Only works when both operands are rank 1 or 2.
 *
 * @param a the first tensor in the dot operation
 * @param b the second tensor in the dot operation
 * @returns the dot product of the tensors
 */
export const dot = function tensorDot(
  a: Tensor,
  b: p5.Vector | Tensor,
): Tensor {
  return a.dot(b);
};

/**
 * Calculates the absolute value (magniutde) of each tensor element.
 * The absolute value of a number is always positive.
 *
 * @param t the input tensor
 * @returns the absolute value of each tensor element
 */
export const abs = function tensorAbs(t: Tensor): Tensor {
  return t.abs();
};

/**
 * Calculates the closest int value that is greater than or equal to
 * the value of each tensor element. For example, ceil(9.03) returns
 * the value 10.
 *
 * @param t the input tensor
 * @returns each tensor element rounded up
 */
export const ceil = function tensorCeil(t: Tensor): Tensor {
  return t.ceil();
};

/**
 * Constrains the value of each tensor element between a minimum and
 * maximum value.
 *
 * @param t    the input tensor
 * @param low  the minimum value
 * @param high the maximum value
 * @returns    each tensor element constrained to the given range
 */
export const constrain = function tensorConstrain(
  t: Tensor,
  low: number,
  high: number,
): Tensor {
  return t.constrain(low, high);
};

/**
 * Raise Euler's number e (2.71828...) to the power of each tensor
 * element.
 *
 * @param t the input tensor
 * @returns e^n for each tensor element
 */
export const exp = function tensorExp(t: Tensor): Tensor {
  return t.exp();
};

/**
 * Calculates the closest int value that is less than or equal to
 * the value of each tensor element. For example, floor(9.97) returns
 * the value 9.
 *
 * @param t the input tensor
 * @returns each tensor element rounded down
 */
export const floor = function tensorFloor(t: Tensor): Tensor {
  return t.floor();
};

/**
 * Calculates the natural logarithm (the base-e logarithm) of each tensor
 * element. This function expects each tensor element to be a value
 * greater than 0.0.
 *
 * @param t the input tensor
 * @returns the natural logarithm of each tensor element
 */
export const log = function tensorLog(t: Tensor): Tensor {
  return t.log();
};

/**
 * Determines the largest value in a tensor, and then returns that value.
 *
 * @param t the input tensor
 * @returns the maximum number in the tensor
 */
export const max = function tensorMax(t: Tensor): number {
  return t.max();
};

/**
 * Determines the smallest value in a tensor, and then returns that value.
 *
 * @param t the input tensor
 * @returns the minimum number in the tensor
 */
export const min = function tensorMin(t: Tensor): number {
  return t.min();
};

/**
 * Performs modular (remainder) division on two tensors element-wise.
 *
 * @param a the tensor dividend
 * @param b the tensor divisor
 * @returns the remainder(s)
 */
export const mod = function tensorMod(
  a: Tensor,
  b: number | Tensor,
): Tensor {
  return a.mod(b);
};

/**
 * Facilitates exponential expressions. The pow() method is an
 * efficient way of multiplying tensors by themselves (or their
 * reciprocals) in large quantities.
 *
 * @param a the base tensor
 * @param b the power by which to raise each tensor element
 */
export const pow = function tensorPow(
  a: Tensor,
  b: number | Tensor,
): Tensor {
  return a.pow(b);
};

/**
 * Calculates the integer closest to each tensor element. For
 * example, round(133.8) returns the value 134.
 *
 * @param t the input tensor
 * @returns each tensor element rounded
 */
export const round = function tensorRound(t: Tensor): Tensor {
  return t.round();
};

/**
 * Squares each tensor element (multiplies a number by itself). The
 * result is always a positive number, as multiplying two negative
 * numbers always yields a positive result. For example, -1 * -1 = 1.
 *
 * @param t the input tensor
 * @returns the square of each tensor element
 */
export const sq = function tensorSq(t: Tensor): Tensor {
  return t.sq();
};

/**
 * Calculates the square root of each tensor element. The square root
 * of a number is always positive, even though there may be a valid
 * negative root. The square root s of number a is such that s*s = a.
 * It is the opposite of squaring.
 *
 * @param t the input tensor
 * @returns the square root of each tensor element
 */
export const sqrt = function tensorSqrt(t: Tensor): Tensor {
  return t.sqrt();
};

// ===== Reduction =====

/**
 * Calculates the sum of tensor elements along an axis.
 *
 * @param t    the input tensor
 * @param axis (optional) the axis to sum along
 * @returns    the sum
 */
export const sum = function tensorSum(t: Tensor, axis?: number | number[]): Tensor {
  return t.sum(axis);
};

// ===== Trigonometry =====

/**
 * The inverse of cos(), returns the arc cosine of each tensor element.
 * This function expects the values in the range of -1 to 1 and values
 * are returned in the range 0 to PI (3.1415927).
 *
 * @param t the input tensor
 * @returns the arc cosine of each tensor element
 */
export const acos = function tensorAcos(t: Tensor): Tensor {
  return t.acos();
};

/**
 * The inverse of sin(), returns the arc sine of a each tensor element.
 * This function expects the values in the range of -1 to 1 and values
 * are returned in the range -PI/2 to PI/2.
 *
 * @param t the input tensor
 * @returns the arc sine of each tensor element
 */
export const asin = function tensorAsin(t: Tensor): Tensor {
  return t.asin();
};

/**
 * The inverse of tan(), returns the arc tangent of each tensor element.
 * This function expects the values in the range of -Infinity to Infinity
 * (exclusive) and values are returned in the range -PI/2 to PI/2.
 *
 * @param t the input tensor
 * @returns the arc tangent of each tensor element
 */
export const atan = function tensorAtan(t: Tensor): Tensor {
  return t.atan();
};

/**
 * Calculates the angle (in radians) from a specified point to the
 * coordinate origin as measured from the positive x-axis. Values are
 * returned as a float in the range from PI to -PI.
 *
 * @param t the input tensor
 * @param b the x-coordinate(s) used for computing the arc tangent
 * @returns the arc tangent of each tensor element
 */
export const atan2 = function tensorAtan2(t: Tensor, b: number | Tensor): Tensor {
  return t.atan2(b);
};

/**
 * Calculates the cosine of each tensor element. This function
 * does not yet take into account the current angleMode.
 * Values are returned in the range -1 to 1.
 *
 * @param t the input tensor
 * @returns the cosine of each tensor element
 */
export const cos = function tensorCos(t: Tensor): Tensor {
  return t.cos();
};

/**
 * Calculates the sine of each tensor element. This function
 * does not yet take into account the current angleMode.
 * Values are returned in the range -1 to 1.
 *
 * @param t the input tensor
 * @returns the sine of each tensor element
 */
export const sin = function tensorSin(t: Tensor): Tensor {
  return t.sin();
};

/**
 * Calculates the tangent of each tensor element. This function
 * does not yet take into account the current angleMode.
 * Values are returned in the range of all real numbers.
 *
 * @param t the input tensor
 * @returns the tangent of each tensor element
 */
export const tan = function tensorTan(t: Tensor): Tensor {
  return t.tan();
};

// ===== Creation Methods =====

/**
 * Creates a complex tensor with the given real and imaginary
 * components.
 *
 * @param real the real component(s)
 * @param imag the imaginary component(s)
 * @returns    the complex tensor
 */
export const complex = function tensorComplex(
  real: number | Tensor,
  imag: number | Tensor,
): Tensor {
  return Tensor.complex(real, imag);
};

/**
 * Gets a copy of the tensor, returns a Tensor object.
 *
 * @param t the input tensor
 * @returns a copy of the tensor
 */
export const copy = function tensorCopy(t: Tensor): Tensor {
  return t.copy();
};

/**
 * Creates an identity matrix with the given dimensions.
 *
 * @param numRows the number of rows
 * @param numCols (optional) the number of columns
 * @returns       the identity matrix
 */
export const eye = function tensorEye(numRows: number, numCols?: number): Tensor {
  return Tensor.eye(numRows, numCols);
};

/**
 * Creates a tensor filled with a given value.
 *
 * @param shape the shape of the tensor
 * @param value the value to fill the tensor with
 * @returns     the filled tensor
 */
export const fill = function tensorFill(shape: number[], value: number): Tensor {
  return Tensor.fill(shape, value);
};

/**
 * Creates a tensor filled with evenly spaced values.
 *
 * @param min the lower bound (inclusive)
 * @param max the upper bound (inclusive)
 * @param num the number of values to generate
 * @returns   the filled tensor
 */
export const linspace = function tensorLinspace(
  min: number,
  max: number,
  num: number,
): Tensor {
  return Tensor.linspace(min, max, num);
};

/**
 * Creates a tensor filled with ones.
 *
 * @param shape the shape of the tensor
 * @returns     the filled tensor
 */
export const ones = function tensorOnes(shape: number[]): Tensor {
  return Tensor.ones(shape);
};

/**
 * Creates a tensor filled with uniformly distributed random numbers.
 *
 * @param shape the shape of the tensor
 * @returns     the filled tensor
 */
export const random = function tensorRandom(shape: number[]): Tensor {
  return Tensor.random(shape);
};

/**
 * Creates a tensor filled with normally distributed random numbers.
 *
 * @param shape the shape of tensor
 * @param mean  (optional) the mean
 * @param sd    (optional) the standard deviation
 * @returns     the filled tensor
 */
export const randomGaussian = function tensorRandomGaussian(
  shape: number[],
  mean?: number,
  sd?: number,
): Tensor {
  return Tensor.randomGaussian(shape, mean, sd);
};

/**
 * Creates a tensor filled with numbers in the range provided.
 *
 * @param min  the lower bound (inclusive)
 * @param max  the upper bound (exclusive)
 * @param step (optional) the integer spacing between values
 * @returns    the filled tensor
 */
export const range = function tensorRange(
  min: number,
  max: number,
  step?: number,
): Tensor {
  return Tensor.range(min, max, step);
};

/**
 * Creates a tensor filled with zeros.
 *
 * @param shape the shape of the tensor
 * @returns     the filled tensor
 */
export const zeros = function tensorZeros(shape: number[]): Tensor {
  return Tensor.zeros(shape);
};

// ===== Transformations =====

/**
 * Flattens this tensor to one dimension.
 *
 * @param t the input tensor
 * @returns the flattened tensor
 */
export const flatten = function tensorFlatten(t: Tensor): Tensor {
  return t.flatten();
};

/**
 * Pads a tensor with a given value and paddings.
 *
 * @param t             the input tensor
 * @param paddings      an array prescribing how much to pad [before, after] along
 *                      each tensor axis
 * @param constantValue (optional) the pad value to use
 * @returns             the padded tensor
 */
export const pad = function tensorPad(
  t: Tensor,
  paddings: Array<[number, number]>,
  constantValue?: number,
): Tensor {
  return t.pad(paddings, constantValue);
};

/**
 * Reshapes a tensor to a given shape.
 *
 * @param t     the input tensor
 * @param shape an array of integers defining the output tensor shape
 * @returns     the reshaped tensor
 */
export const reshape = function tensorReshape(
  t: Tensor,
  shape: number[],
): Tensor {
  return t.reshape(shape);
};

// ===== Slicing and Joining =====

/**
 * Concatenates an array of tensors.
 *
 * @param t    the tensor(s) to be concatenated
 * @param axis (optional) the axis to concatenate along
 * @returns    the concatenated tensor
 */
export const concat = function tensorConcat(t: Tensor[], axis?: number): Tensor {
  if (t.length < 2) {
    throw new Error('Two or more tensors must be provided.');
  }

  const a = t[0];
  const b = t.slice(1);

  return a.concat(b, axis);
};

/**
 * Reverses a tensor along a specificed axis.
 *
 * @param t    the input tensor
 * @param axis (optional) the axis to reverse along
 * @returns    the reversed tensor
 */
export const reverse = function tensorReverse(
  t: Tensor,
  axis?: number | number[],
): Tensor {
  return t.reverse(axis);
};

/**
 * Extracts a slice from a tensor.
 *
 * @param t     the input tensor
 * @param begin the coordinates to start the slice from
 * @param size  (optional) the size of the slice
 * @returns     the tensor slice
 */
export const slice = function tensorSlice(
  t: Tensor,
  begin: number | number[],
  size?: number | number[],
): Tensor {
  return t.slice(begin, size);
};

/**
 * Splits a tensor into sub tensors.
 *
 * @param t               the input tensor
 * @param numOrSizeSplits either an integer indicating the number of splits along the axis
 *                        or an array of integers containing the sizes of each output tensor
 *                        along the axis. If a number then it must evenly divide the axis
 *                        length; otherwise the sum of sizes must match axis length.
 * @param axis            (optional) the dimension along which to split
 * @returns               the split tensor
 */
export const split = function tensorSplit(
  t: Tensor,
  numOrSizeSplits: number | number[],
  axis?: number,
): Tensor[] {
  return t.split(numOrSizeSplits, axis);
};

/**
 * Stacks an array of tensors along an axis. Tensors must have the same rank.
 *
 * @param tensors the tensors to be stacked
 * @param axis    (optional) the axis to stack along
 * @returns       the stacked tensor
 */
export const stack = function tensorStack(
  tensors: Tensor[],
  axis?: number,
): Tensor {
  return Tensor.stack(tensors, axis);
};

/**
 * Unstacks a rank-R tensor into an array of rank-(R-1) tensors.
 *
 * @param t    the input tensor
 * @param axis (optional) the axis to unstack along
 * @returns    the array of tensors
 */
export const unstack = function tensorUnstack(t: Tensor, axis?: number): Tensor[] {
  return t.unstack(axis);
};

/**
 * Sorts a tensor in descending order.
 *
 * @param t the input tensor
 * @returns the sorted tensor
 */
export const sort = function tensorSort(t: Tensor): Tensor {
  const k: number = t.tensor.shape[t.tensor.shape.length - 1];
  const { values, indices } = t.tensor.topk(k, true);
  indices.dispose();

  return new Tensor(values);
};
