import {
  cumsum,
  lag,
  lead,
  roll,
} from '@tidyjs/tidy';

declare const p5: any;

p5.prototype.cumsum = cumsum;

p5.prototype.lag = lag;

p5.prototype.lead = lead;

p5.prototype.roll = roll;
