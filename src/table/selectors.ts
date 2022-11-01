import {
  contains,
  endsWith,
  everything,
  matches,
  negate,
  numRange,
  startsWith,
} from '@tidyjs/tidy';

declare const p5: any;

p5.prototype.contains = contains;

p5.prototype.endsWith = endsWith;

p5.prototype.everything = everything;

p5.prototype.matches = matches;

p5.prototype.negate = negate;

p5.prototype.numRange = numRange;

p5.prototype.startsWith = startsWith;
