import {
  scaleXContinuous,
  scaleYContinuous,
} from '../scale';
import { Props } from '../utils';

const drawXAxis = (props: Props) => {
  const {
    pg,
    originX,
    originY,
    width,
    annotationsPalette,
  } = props;
  pg.push();
  pg.stroke(annotationsPalette.axesColor);
  pg.strokeWeight(annotationsPalette.axesWeight);
  pg.translate(originX, originY);
  pg.line(0, 0, width, 0);
  pg.pop();
};

const drawXTicks = (props: Props): void => {
  const {
    pg,
    originX,
    originY,
    minorTicks,
    tickSize,
    annotationsPalette,
  } = props;
  pg.push();
  pg.stroke(annotationsPalette.axesColor);
  pg.strokeWeight(annotationsPalette.axesWeight);
  pg.translate(originX, originY);
  const xTicks: number[] = scaleXContinuous(props);
  for (let i = 0; i < xTicks.length; i += 1) {
    const x: number = xTicks[i];
    let y: number;
    if (i % (minorTicks + 1) === 0) {
      y = 2 * tickSize;
    } else {
      y = tickSize;
    }
    pg.line(x, 0, x, y);
  }
  pg.pop();
};

const drawYAxis = (props: Props): void => {
  const {
    pg,
    originX,
    originY,
    height,
    annotationsPalette,
  } = props;
  pg.push();
  pg.stroke(annotationsPalette.axesColor);
  pg.strokeWeight(annotationsPalette.axesWeight);
  pg.translate(originX, originY);
  pg.line(0, 0, 0, -height);
  pg.pop();
};

const drawYTicks = (props: Props): void => {
  const {
    pg,
    originX,
    originY,
    minorTicks,
    tickSize,
    annotationsPalette,
  } = props;
  pg.push();
  pg.stroke(annotationsPalette.axesColor);
  pg.strokeWeight(annotationsPalette.axesWeight);
  pg.translate(originX, originY);
  const yTicks: number[] = scaleYContinuous(props);
  for (let i = 0; i < yTicks.length; i += 1) {
    let x: number;
    const y: number = yTicks[i];
    if (i % (minorTicks + 1) === 0) {
      x = 2 * tickSize;
    } else {
      x = tickSize;
    }
    pg.line(-x, -y, 0, -y);
  }
  pg.pop();
};

export default (props: Props) => {
  drawXAxis(props);
  drawXTicks(props);
  drawYAxis(props);
  drawYTicks(props);
};
