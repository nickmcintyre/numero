import { Props } from '../utils';

export const timespace = (
  start: number,
  stop: number,
  num: number = 50,
): number[] => {
  const range: number = stop - start;
  const samples: number[] = [];
  const space: number = range / (num - 1);
  for (let i = 0; i < num; i += 1) {
    const n: number = start + i * space;
    samples.push(n);
  }
  return samples;
};

export const scaleXDate = (props: Props): number[] => {
  const {
    width,
    majorTicks,
    minorTicks,
  } = props;
  const numXTicks: number = majorTicks * (minorTicks + 1) + 1;
  const dx: number = width / (numXTicks + 1);
  const start: number = dx;
  const stop: number = width - dx;
  const xTicks: number[] = timespace(start, stop, numXTicks);
  return xTicks;
};

export const scaleYDate = (props: Props): number[] => {
  const {
    height,
    majorTicks,
    minorTicks,
  } = props;
  const numYTicks: number = majorTicks * (minorTicks + 1) + 1;
  const dy: number = height / (numYTicks + 1);
  const start: number = dy;
  const stop: number = height - dy;
  const yTicks: number[] = timespace(start, stop, numYTicks);
  return yTicks;
};
