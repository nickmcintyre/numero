import { Props } from '../utils';

export default (props: Props): void => {
  const {
    pg,
    annotaionsPalette,
  } = props;
  pg.background(annotaionsPalette.backgroundColor);
};
