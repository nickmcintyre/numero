import { Props } from '../utils';
import { scaleXContinuous, scaleYContinuous } from '../scale';

const drawXGrid = (props: Props): void => {
  const {
    pg,
    originX,
    originY,
    width,
    height,
    majorTicks,
    minorTicks,
    annotaionsPalette,
  } = props;
  pg.push();
  pg.stroke(annotaionsPalette.gridColor);
  pg.strokeWeight(1);
  pg.translate(originX, originY);
  const { numXTicks, dx } = scaleXContinuous({
    width,
    majorTicks,
    minorTicks,
  });
  for (let i = 0; i <= numXTicks; i += 1) {
    const tickX: number = dx * (i + 1);
    if (i % (minorTicks + 1) === 0) {
      pg.line(tickX, -1, tickX, -height);
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
    height,
    majorTicks,
    minorTicks,
    annotaionsPalette,
  } = props;
  pg.push();
  pg.stroke(annotaionsPalette.gridColor);
  pg.strokeWeight(1);
  pg.translate(originX, originY);
  const { numYTicks, dy } = scaleYContinuous({
    height,
    majorTicks,
    minorTicks,
  });
  for (let i = 0; i <= numYTicks; i += 1) {
    const tickY: number = -dy * (i + 1);
    if (i % (minorTicks + 1) === 0) {
      pg.line(1, tickY, width, tickY);
    }
  }
  pg.pop();
};

export default (props) => {
  drawXGrid(props);
  drawYGrid(props);
};
