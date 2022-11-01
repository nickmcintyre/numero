import {
  fullSeq,
  fullSeqDate,
  fullSeqDateISOString,
} from '@tidyjs/tidy';

declare const p5: any;

p5.prototype.fullSeq = fullSeq;

p5.prototype.fullSeqDate = fullSeqDate;

p5.prototype.fullSeqDateISOString = fullSeqDateISOString;
