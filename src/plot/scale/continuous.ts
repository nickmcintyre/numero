import { Props } from '../utils';

interface XScale {
  numXTicks: number;
  dx: number;
}

export const scaleXContinuous = (props: Props): XScale => {
  const {
    width,
    majorTicks,
    minorTicks,
  } = props;
  const numXTicks: number = majorTicks * (minorTicks + 1);
  const dx: number = width / (numXTicks + 2);
  return { numXTicks, dx };
};

interface YScale {
  numYTicks: number;
  dy: number;
}

export const scaleYContinuous = (props: Props): YScale => {
  const {
    height,
    majorTicks,
    minorTicks,
  } = props;
  const numYTicks: number = majorTicks * (minorTicks + 1);
  const dy: number = height / (numYTicks + 2);
  return { numYTicks, dy };
};
