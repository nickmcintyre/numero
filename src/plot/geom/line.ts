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
  const { data, xRange, yRange } = sorted;
  for (let i = 0; i < data.x.length - 1; i += 1) {
    const x1 = pg.map(data.x[i], xRange.min, xRange.max, 0, width - 2 * dx);
    const y1 = -pg.map(data.y[i], yRange.min, yRange.max, 0, height - 2 * dy);
    const x2 = pg.map(data.x[i + 1], xRange.min, xRange.max, 0, width - 2 * dx);
    const y2 = -pg.map(data.y[i + 1], yRange.min, yRange.max, 0, height - 2 * dy);
    pg.line(x1, y1, x2, y2);
  }
  pg.pop();
};
