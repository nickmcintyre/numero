import * as dayjs from 'dayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as p5 from 'p5';
import { BinnedData, SortedData } from '../data';
import { linspace, scaleXContinuous, scaleXDate, scaleYContinuous, timespace } from '../scale';
import { Props, Range } from '../utils';

const { CENTER, ITALIC, PI } = p5.prototype;

const drawTitle = (props: Props): void => {
  const {
    pg,
    padding,
    title,
    annotationsPalette,
  } = props;
  pg.push();
  pg.fill(annotationsPalette.fontColor);
  pg.noStroke();
  pg.translate(padding.left, padding.top - pg.textSize());
  pg.text(title, 0, 0);
  pg.pop();
};

const drawXLabel = (props: Props): void => {
  const {
    pg,
    originX,
    originY,
    width,
    xLabel,
    annotationsPalette,
  } = props;
  pg.push();
  pg.fill(annotationsPalette.fontColor);
  pg.noStroke();
  pg.translate(originX + width / 2, originY + 3 * pg.textSize());
  pg.textAlign(CENTER, CENTER);
  pg.textStyle(ITALIC);
  pg.text(xLabel, 0, 0);
  pg.pop();
};

const drawYLabel = (props: Props): void => {
  const {
    pg,
    originX,
    originY,
    height,
    yLabel,
    annotationsPalette,
  } = props;
  const textSize: number = pg.textSize();
  pg.push();
  pg.fill(annotationsPalette.fontColor);
  pg.noStroke();
  pg.translate(originX - 3 * textSize, originY - height / 2);
  pg.rotate(1.5 * PI);
  pg.textAlign(CENTER, CENTER);
  pg.textStyle(ITALIC);
  pg.text(yLabel, 0, 0);
  pg.pop();
};

const drawXTickLabels = (props: Props): void => {
  const {
    pg,
    dataset,
    x,
    y,
    originX,
    originY,
    majorTicks,
    minorTicks,
    tickSize,
    annotationsPalette,
    xRange,
  } = props;
  pg.push();
  pg.fill(annotationsPalette.fontColor);
  pg.noStroke();
  pg.textAlign(pg.CENTER, pg.CENTER);
  pg.translate(originX, originY);
  const sorted: SortedData = dataset.getSorted(x, y);
  const range = xRange || sorted.xRange;
  const xCoord: number[] = scaleXContinuous(props);
  const xLabel: number[] = linspace(range.min, range.max, majorTicks + 1);
  const yCoord: number = 4 * tickSize;
  for (let i = 0; i < xCoord.length; i += 1) {
    if (i % (minorTicks + 1) === 0) {
      let label: string;
      const n: number = xLabel.shift();
      if (n > 100) {
        label = `${pg.round(n, 0)}`;
      } else {
        label = `${pg.round(n, 1)}`;
      }
      pg.text(label, xCoord[i], yCoord);
    }
  }
  pg.pop();
};

const drawYTickLabels = (props: Props): void => {
  const {
    pg,
    dataset,
    x,
    y,
    originX,
    originY,
    majorTicks,
    minorTicks,
    tickSize,
    annotationsPalette,
    numBins,
    yRange,
  } = props;
  pg.push();
  pg.fill(annotationsPalette.fontColor);
  pg.noStroke();
  pg.textAlign(pg.CENTER, pg.CENTER);
  pg.translate(originX, originY);
  let range: Range;
  if (yRange) {
    range = yRange;
  } else if (numBins > 0) {
    const binned: BinnedData = dataset.getBinned(x, numBins);
    range = binned.xRange;
  } else {
    const sorted: SortedData = dataset.getSorted(x, y);
    range = sorted.yRange;
  }
  const yCoord: number[] = scaleYContinuous(props);
  const yLabel: number[] = linspace(range.min, range.max, majorTicks + 1);
  const xCoord: number = -5 * tickSize;
  for (let i = 0; i < yCoord.length; i += 1) {
    if (i % (minorTicks + 1) === 0) {
      let label: string;
      const n: number = yLabel.shift();
      if (n > 100) {
        label = `${pg.round(n, 0)}`;
      } else {
        label = `${pg.round(n, 1)}`;
      }
      pg.text(label, xCoord, -yCoord[i]);
    }
  }
  pg.pop();
};

const drawXDateLabels = (props: Props): void => {
  const {
    pg,
    dataset,
    x,
    y,
    originX,
    originY,
    majorTicks,
    minorTicks,
    tickSize,
    annotationsPalette,
  } = props;
  pg.push();
  pg.fill(annotationsPalette.fontColor);
  pg.noStroke();
  pg.textAlign(pg.CENTER, pg.CENTER);
  pg.translate(originX, originY);
  const sorted: SortedData = dataset.getSorted(x, y);
  const isTime: boolean = dataset.raw.time.includes(x);
  const { xRange } = sorted;
  const xCoord: number[] = scaleXDate(props);
  const xLabel: number[] = timespace(xRange.min, xRange.max, majorTicks + 1);
  const yCoord: number = 4 * tickSize;
  for (let i = 0; i < xCoord.length; i += 1) {
    if (i % (minorTicks + 1) === 0) {
      let label: string;
      const n: number = xLabel.shift();
      if (isTime) {
        label = dayjs(n).format('MMM-DD-YYYY');
      } else if (n > 100) {
        label = `${pg.round(n, 0)}`;
      } else {
        label = `${pg.round(n, 1)}`;
      }
      pg.text(label, xCoord[i], yCoord);
    }
  }
  pg.pop();
};

export {
  drawTitle,
  drawXLabel,
  drawXTickLabels,
  drawYLabel,
  drawYTickLabels,
  drawXDateLabels,
};
