import {
  compile,
  derivative,
  evaluate,
  parse,
  simplify,
} from 'mathjs';

declare const p5: any;

p5.prototype.compile = compile;
p5.prototype.derivative = derivative;
p5.prototype.evaluate = evaluate;
p5.prototype.parse = parse;
p5.prototype.simplify = simplify;
