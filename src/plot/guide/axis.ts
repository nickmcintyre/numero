import { scaleXContinuous, scaleYContinuous } from '../scale';
import { Props } from '../utils';

const drawXAxis = (props: Props) => {
  const {
    pg,
    originX,
    originY,
    width,
    majorTicks,
    minorTicks,
    tickSize,
    annotaionsPalette,
  } = props;
  pg.push();
  pg.stroke(annotaionsPalette.axesColor);
  pg.strokeWeight(1);
  pg.translate(originX, originY);
  pg.line(0, 0, width, 0);
  const { numXTicks, dx } = scaleXContinuous({
    width,
    majorTicks,
    minorTicks,
  });
  for (let i = 0; i <= numXTicks; i += 1) {
    const tickX: number = dx * (i + 1);
    let tickY: number;
    if (i % (minorTicks + 1) === 0) {
      tickY = 2 * tickSize;
    } else {
      tickY = tickSize;
    }
    pg.line(tickX, 0, tickX, tickY);
  }
  pg.pop();
};

const drawYAxis = (props: Props): void => {
  const {
    pg,
    originX,
    originY,
    height,
    majorTicks,
    minorTicks,
    tickSize,
    annotaionsPalette,
  } = props;
  pg.push();
  pg.stroke(annotaionsPalette.axesColor);
  pg.strokeWeight(1);
  pg.translate(originX, originY);
  pg.line(0, 0, 0, -height);
  const { numYTicks, dy } = scaleYContinuous({
    height,
    majorTicks,
    minorTicks,
  });
  for (let i = 0; i <= numYTicks; i += 1) {
    const tickY: number = -dy * (i + 1);
    let tickX: number;
    if (i % (minorTicks + 1) === 0) {
      tickX = 2 * tickSize;
    } else {
      tickX = tickSize;
    }
    pg.line(-tickX, tickY, 0, tickY);
  }
  pg.pop();
};

export default (props: Props) => {
  drawXAxis(props);
  drawYAxis(props);
};
