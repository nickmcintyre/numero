// eslint-disable-next-line import/no-extraneous-dependencies
import * as p5 from 'p5';
import { Props } from '../utils';

const { CENTER, ITALIC, PI } = p5.prototype;

const drawTitle = (props: Props): void => {
  const {
    pg,
    padding,
    title,
    annotaionsPalette,
  } = props;
  pg.push();
  pg.fill(annotaionsPalette.fontColor);
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
    annotaionsPalette,
  } = props;
  pg.push();
  pg.fill(annotaionsPalette.fontColor);
  pg.noStroke();
  pg.translate(originX + width / 2, originY + 2.5 * pg.textSize());
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
    annotaionsPalette,
  } = props;
  pg.push();
  pg.fill(annotaionsPalette.fontColor);
  pg.noStroke();
  pg.translate(originX - 2.5 * pg.textSize(), originY - height / 2);
  pg.rotate(1.5 * PI);
  pg.textAlign(CENTER, CENTER);
  pg.textStyle(ITALIC);
  pg.text(yLabel, 0, 0);
  pg.pop();
};

export {
  drawTitle,
  drawXLabel,
  drawYLabel,
};
