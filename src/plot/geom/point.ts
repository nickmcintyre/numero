import { SortedData } from '../data';
import { scaleXContinuous, scaleYContinuous } from '../scale/continuous';
import { Props } from '../utils';

export default (props: Props) => {
  const {
    pg,
    dataset,
    x,
    y,
    size,
    originX,
    originY,
    width,
    height,
    majorTicks,
    minorTicks,
    layersPalette,
  } = props;
  pg.push();
  pg.translate(originX, originY);
  const { dx } = scaleXContinuous({
    width,
    majorTicks,
    minorTicks,
  });
  const { dy } = scaleYContinuous({
    height,
    majorTicks,
    minorTicks,
  });
  pg.translate(dx, -dy);
  pg.noStroke();
  pg.fill(layersPalette[0]);
  const sorted: SortedData = dataset.get(x, y);
  const { data, xRange, yRange } = sorted;
  for (let i = 0; i < data.x.length; i += 1) {
    const tx = pg.map(data.x[i], xRange.min, xRange.max, 0, width - 2 * dx);
    const ty = -pg.map(data.y[i], yRange.min, yRange.max, 0, height - 2 * dy);
    pg.circle(tx, ty, size);
  }
  pg.pop();
};
