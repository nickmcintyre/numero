import { Props } from '../utils';

export default (props: Props): void => {
  const {
    pg,
    originX,
    originY,
    width,
    height,
    annotationsPalette,
  } = props;
  pg.push();
  pg.fill(annotationsPalette.backgroundColor);
  pg.strokeWeight(1);
  pg.stroke(annotationsPalette.backgroundColor);
  pg.rect(originX, originY, width, -height);
  pg.pop();
};
