import { Props } from '../utils';
import { scaleXContinuous, scaleYContinuous } from '../scale';

const drawXGrid = (props: Props): void => {
  const {
    pg,
    originX,
    originY,
    height,
    minorTicks,
    annotationsPalette,
  } = props;
  pg.push();
  pg.stroke(annotationsPalette.gridColor);
  pg.strokeWeight(1);
  pg.translate(originX, originY);
  const xTicks: number[] = scaleXContinuous(props);
  for (let i = 0; i <= xTicks.length; i += 1) {
    const x: number = xTicks[i];
    if (i % (minorTicks + 1) === 0) {
      pg.line(x, -1, x, -height);
    }
  }
  pg.pop();
};

const drawYGrid = (props: Props): void => {
  const {
    pg,
    originX,
    originY,
    width,
    minorTicks,
    annotationsPalette,
  } = props;
  pg.push();
  pg.stroke(annotationsPalette.gridColor);
  pg.strokeWeight(1);
  pg.translate(originX, originY);
  const yTicks: number[] = scaleYContinuous(props);
  for (let i = 0; i <= yTicks.length; i += 1) {
    const y: number = -yTicks[i];
    if (i % (minorTicks + 1) === 0) {
      pg.line(1, y, width, y);
    }
  }
  pg.pop();
};

export default (props: Props) => {
  drawXGrid(props);
  drawYGrid(props);
};
