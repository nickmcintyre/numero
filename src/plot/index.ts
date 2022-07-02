// eslint-disable-next-line import/no-extraneous-dependencies
import * as _p5 from 'p5';
import { Props, defaultProps } from './utils';
import { pointGeom } from './geom';
import { drawAxes, drawGrid } from './guide';
import { inferTypes } from './utils'
import {
  drawBackground,
  drawTitle,
  drawXLabel,
  drawYLabel,
} from './annotation';

declare const p5: any;

interface Layer {
  props: Props;
  operation(props: Props): void;
}

class Plot {
  pInst: _p5;

  props: Props;

  layers: Layer[];

  constructor(pInst: _p5, raw: any) {
    this.pInst = pInst;
    this.props = defaultProps(pInst, raw);
    this.layers = [];
    this.wrangle();
  }

  wrangle(): void {
    if (this.props.dataset.raw.data instanceof _p5.Table) {
      inferTypes(this.props.dataset.raw.data);
    }
  }

  annotations(): void {
    this.background();
    this.title();
    this.xlabel();
    this.ylabel();
    this.gridLines();
    this.axes();
  }

  render(): void {
    this.annotations();
    this.layers.forEach((layer: Layer) => layer.operation(layer.props));
  }

  clear(): void {
    this.layers = [];
  }

  title(title?: string) {
    this.props.title = title || this.props.title;
    drawTitle(this.props);
  }

  xlabel(label?: string) {
    this.props.xLabel = label || this.props.xLabel;
    drawXLabel(this.props);
  }

  ylabel(label?: string) {
    this.props.yLabel = label || this.props.yLabel;
    drawYLabel(this.props);
  }

  gridLines(props?: Props) {
    this.props = { ...this.props, ...props };
    drawGrid(this.props);
  }

  axes(props?: Props) {
    this.props = { ...this.props, ...props };
    drawAxes(this.props);
  }

  background(color?: any) {
    this.props.backgroundColor = color || this.props.backgroundColor;
    drawBackground(this.props);
  }

  point(props?: Props): void {
    this.props = { ...this.props, ...props };
    this.layers.push({ props: this.props, operation: pointGeom });
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
    const {
      pg,
      plotX,
      plotY,
    } = plot.props;
    plot.render();
    this.image(pg, plotX, plotY, pg.width, pg.height);
    plot.clear();
  });
});

p5.prototype.registerMethod('remove', function _removeFigures() {
  // eslint-disable-next-line no-underscore-dangle
  this._plots.forEach((plot: Plot) => plot.props.pg.remove());
  // eslint-disable-next-line no-underscore-dangle
  this._plots = undefined;
});
