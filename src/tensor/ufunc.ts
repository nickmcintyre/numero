import * as p5 from 'p5';

import { Tensor } from './index';


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
