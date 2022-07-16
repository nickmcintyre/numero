import './groupby';
import './stats';
import './time';
import './wrangle';
import './utils';
import { createTable } from './utils';

declare const p5: any;

p5.prototype.createTable = createTable;
