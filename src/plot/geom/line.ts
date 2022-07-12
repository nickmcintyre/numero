import { SortedData } from '../data';
import { scaleXContinuous, scaleYContinuous } from '../scale';
import { Props } from '../utils';

export default (props: Props) => {
  const {
    pg,
    dataset,
    x,
    y,
    originX,
    originY,
    width,
    height,
    layersPalette,
    xRange,
    yRange,
  } = props;
  pg.push();
  pg.translate(originX, originY);
  const xTicks: number[] = scaleXContinuous(props);
  const yTicks: number[] = scaleYContinuous(props);
  const dx: number = xTicks[1] - xTicks[0];
  const dy: number = yTicks[1] - yTicks[0];
  pg.translate(dx, -dy);
  pg.stroke(layersPalette[0]);
  const sorted: SortedData = dataset.getSorted(x, y);
  const { data } = sorted;
  const range = {
    x: xRange || sorted.xRange,
    y: yRange || sorted.yRange,
  };
  pg.noFill();
  pg.beginShape();
  for (let i = 0; i < data.x.length; i += 1) {
    const px = pg.map(data.x[i], range.x.min, range.x.max, 0, width - 2 * dx);
    const py = -pg.map(data.y[i], range.y.min, range.y.max, 0, height - 2 * dy);
    pg.vertex(px, py);
  }
  pg.endShape();
  pg.pop();
};
