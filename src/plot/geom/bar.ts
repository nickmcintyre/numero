import { BinnedData } from '../data';
import { Props, Range, range } from '../utils';

export default (props: Props) => {
  const {
    pg,
    dataset,
    x,
    originX,
    originY,
    width,
    height,
    majorTicks,
    minorTicks,
    layersPalette,
    numBins,
  } = props;
  pg.push();
  pg.translate(originX, originY);
  pg.stroke(layersPalette[0]);
  pg.strokeWeight(1);
  pg.fill(layersPalette[0]);
  const numTicks: number = majorTicks * (minorTicks + 1) + 1;
  const padX: number = width / (numTicks + 1);
  const padY: number = height / (numTicks + 1);
  pg.translate(padX, -padY);
  const binned: BinnedData = dataset.getBinned(x, numBins);
  const dx: number = (width - 2 * padX) / numBins;
  const yRange: Range = range(binned.data.count);
  const yCoord: number = 0;
  for (let i = 0; i < numBins; i += 1) {
    const xCoord: number = i * dx;
    const h: number = -pg.map(binned.data.count[i], yRange.min, yRange.max, 0, height - 2 * padY);
    pg.rect(xCoord, yCoord, dx, h);
  }
  pg.pop();
};
