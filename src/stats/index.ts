import * as tf from '@tensorflow/tfjs';

import { Tensor } from '../tensor/index';

// ===== Order Statistics =====

/**
 * Calculates the range of values (max - min) of a tensor.
 *
 * @param t the input tensor
 * @returns the range
 */
export const ptp = function peakToPeak(t: Tensor): number {
  return t.max() - t.min();
};

/**
 * Calculates the q-th percentile of a tensor.
 *
 * @param t the input tensor
 * @param q the percentile to compute
 * @returns the range
 */
export const percentile = function tensorPercentile(
  t: Tensor,
  q: number | number[],
): number | number[] {
  const range = ptp(t);

  if (q instanceof Array) {
    const result: number[] = [];
    q.forEach((p) => {
      if (p < 0 || p > 100) {
        throw new Error('Percentile must be in the range [0, 100].');
      }

      result.push(range * (p / 100));
    });

    return result;
  }

  if (q < 0 || q > 100) {
    throw new Error('Percentile must be in the range [0, 100].');
  }

  return range * (q / 100);
};

/**
 * Calculates the q-th quantile of a tensor.
 *
 * @param t the input tensor
 * @param q the quantile to compute
 * @returns the range
 */
export const quantile = function tensorQuantile(
  t: Tensor,
  q: number | number[],
): number | number[] {
  const range = ptp(t);

  if (q instanceof Array) {
    const result: number[] = [];
    q.forEach((p) => {
      if (p < 0 || p > 1) {
        throw new Error('Quantile must be in the range [0, 1].');
      }

      result.push(range * p);
    });

    return result;
  }

  if (q < 0 || q > 1) {
    throw new Error('Quantile must be in the range [0, 1].');
  }

  return range * q;
};

// Averages and Variances

/**
 * Calculates the mean of elements across dimensions of a tensor.
 *
 * @param t the input tensor
 * @param axis (optional) the dimension(s) to reduce. By default it reduces all dimensions.
 * @param keepDims (optional) if true, retains reduced dimensions with size 1.
 * @returns the mean
 */
export const mean = function tensorMean(
  t: Tensor,
  axis?: number | number[],
  keepDims?: boolean,
): Tensor {
  const avg: any = t.tensor.mean(axis, keepDims);

  return new Tensor(avg);
};

/**
 * Calculates the weighted average of elements.
 *
 * @param t the input tensor
 * @param w (optional) the weights for each element
 * @returns the weighted average
 */
export const average = function tensorWeightedAverage(
  t: Tensor,
  w?: Tensor,
): Tensor {
  if (w instanceof Tensor) {
    const tw: Tensor = t.mult(w);
    const tsum: Tensor = tw.sum();
    const wsum: Tensor = w.sum();
    const weightedAverage: Tensor = tsum.div(wsum);
    tw.dispose();
    tsum.dispose();
    wsum.dispose();

    return weightedAverage;
  }

  return mean(t);
};

/**
 * Calculates the standard deviation of elements.
 *
 * @param t the input tensor
 * @returns the standard deviation
 */
export const sd = function tensorStandardDeviation(
  t: Tensor,
): Tensor {
  const s: tf.Tensor = tf.tidy(() => {
    const avg: Tensor = mean(t);
    const diff: Tensor = t.sub(avg);
    const diffSquared: Tensor = diff.sq();
    const diffSum: Tensor = diffSquared.sum();
    const n: number = t.shape.reduce((a, c) => a * c);
    const radicand: Tensor = diffSum.div(n);

    return radicand.sqrt().tensor;
  });

  return new Tensor(s);
};

/**
 * Calculates the variance of elements.
 *
 * @param t the input tensor
 * @returns the variance
 */
export const variance = function tensorVariance(
  t: Tensor,
): Tensor {
  const s: Tensor = sd(t);
  const v: Tensor = s.sq();
  s.dispose();

  return v;
};
