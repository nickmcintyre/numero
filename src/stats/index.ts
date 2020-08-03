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
