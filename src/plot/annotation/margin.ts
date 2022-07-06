import { Props } from '../utils';

export default (props: Props): void => {
  const {
    pg,
    annotationsPalette,
  } = props;
  pg.background(annotationsPalette.marginColor);
};
