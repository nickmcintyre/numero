// eslint-disable-next-line import/no-extraneous-dependencies
import * as _p5 from 'p5';
import {
  drawBackground,
  drawMargin,
  drawTitle,
  drawXLabel,
  drawXTickLabels,
  drawYLabel,
  drawYTickLabels,
  drawXDateLabels,
} from './annotation';
import { Dataset } from './data';
import {
  barGeom,
  pointGeom,
  lineGeom,
} from './geom';
import { drawAxes, drawGrid } from './guide';
import './table';
import {
  Props,
  defaultProps,
} from './utils';

declare const p5: any;

interface Layer {
  props: Props;
  operation(props: Props): void;
}

class Plot {
  pInst: _p5;

  raw: any;

  props: Props;

  layers: Layer[];

  constructor(pInst: _p5, raw: any) {
    this.pInst = pInst;
    this.raw = raw;
    this.props = defaultProps(pInst, raw);
    this.layers = [];
  }

  configure(props: Props) {
    this.props = { ...this.props, ...props };
  }

  annotations(): void {
    // adding to the front of this.layers[]
    this.axes();
    this.gridLines();
    this.ylabel();
    this.xlabel();
    this.title();
    this.background();
    this.margin();
    // adding to end of this.layers[]
    // this.yticks();
    // this.xticks();
  }

  render(): void {
    if (this.props.isDynamic) {
      this.props.dataset = new Dataset(this.raw);
    }
    this.annotations();
    this.layers.forEach((layer: Layer) => layer.operation(this.props));
    const {
      pg,
      plotX,
      plotY,
    } = this.props;
    this.yticks();
    this.xticks();
    this.pInst.image(pg, plotX, plotY, pg.width, pg.height);
  }

  clear(): void {
    this.layers = [];
  }

  title(title?: string) {
    this.props.title = title || this.props.title;
    this.layers.unshift({ props: this.props, operation: drawTitle });
  }

  xlabel(label?: string) {
    this.props.xLabel = label || this.props.xLabel;
    this.layers.unshift({ props: this.props, operation: drawXLabel });
  }

  ylabel(label?: string) {
    this.props.yLabel = label || this.props.yLabel;
    this.layers.unshift({ props: this.props, operation: drawYLabel });
  }

  size(width: number, height: number) {
    this.props.pg.width = width;
    this.props.pg.height = height;
    this.props.width = width - this.props.padding.left - this.props.padding.right;
    this.props.height = height - this.props.padding.top - this.props.padding.bottom;
    this.props.originY = height - this.props.padding.bottom;
  }

  position(x: number, y: number) {
    this.props.plotX = x;
    this.props.plotY = y;
  }

  gridLines(props?: Props) {
    this.props = { ...this.props, ...props };
    this.layers.unshift({ props: this.props, operation: drawGrid });
  }

  axes(props?: Props) {
    this.props = { ...this.props, ...props };
    this.layers.unshift({ props: this.props, operation: drawAxes });
  }

  xticks(props?: Props) {
    this.props = { ...this.props, ...props };
    if (this.props.dataset.raw.time.includes(this.props.x)) {
      // this.layers.push({ props: this.props, operation: drawXDateLabels });
      drawXDateLabels(this.props);
    } else {
      // this.layers.push({ props: this.props, operation: drawXTickLabels });
      drawXTickLabels(this.props);
    }
  }

  yticks(props?: Props) {
    this.props = { ...this.props, ...props };
    // this.layers.push({ props: this.props, operation: drawYTickLabels });
    drawYTickLabels(this.props);
  }

  background(color?: any) {
    this.props.annotationsPalette.backgroundColor = color
      || this.props.annotationsPalette.backgroundColor;
    this.layers.unshift({ props: this.props, operation: drawBackground });
  }

  margin(color?: any) {
    this.props.annotationsPalette.marginColor = color
      || this.props.annotationsPalette.marginColor;
    this.layers.unshift({ props: this.props, operation: drawMargin });
  }

  bar(props?: Props): void {
    this.props = { ...this.props, ...props };
    this.props.numBins = this.props.numBins || 20;
    this.layers.push({ props: this.props, operation: barGeom });
  }

  point(props?: Props): void {
    this.props = { ...this.props, ...props };
    this.layers.push({ props: this.props, operation: pointGeom });
  }

  line(props?: Props): void {
    this.props = { ...this.props, ...props };
    this.layers.push({ props: this.props, operation: lineGeom });
  }
}

// eslint-disable-next-line no-underscore-dangle
p5.prototype.registerMethod('init', function _trackPlots() {
  // eslint-disable-next-line no-underscore-dangle
  this._plots = [];
});

p5.prototype.createPlot = function _createPlot(data: any): Plot {
  const plot: Plot = new Plot(this, data);
  // eslint-disable-next-line no-underscore-dangle
  this._plots.push(plot);
  return plot;
};

p5.prototype.registerMethod('post', function _drawPlots() {
  // eslint-disable-next-line no-underscore-dangle
  this._plots.forEach((plot: Plot) => {
    plot.clear();
  });
});

p5.prototype.registerMethod('remove', function _removeFigures() {
  // eslint-disable-next-line no-underscore-dangle
  this._plots.forEach((plot: Plot) => plot.props.pg.remove());
  // eslint-disable-next-line no-underscore-dangle
  this._plots = undefined;
});
