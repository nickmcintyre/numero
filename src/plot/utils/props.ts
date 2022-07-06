// eslint-disable-next-line import/no-extraneous-dependencies
import * as p5 from 'p5';
import { Dataset } from '../data';
import { annotations, layers } from '../theme';

export interface Range {
  min: number;
  max: number;
}

interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Props {
  pg?: p5.Graphics;
  dataset?: Dataset;
  x?: string;
  y?: string;
  plotX?: number;
  plotY?: number;
  originX?: number;
  originY?: number;
  width?: number;
  height?: number;
  size?: number;
  majorTicks?: number;
  minorTicks?: number;
  tickSize?: number;
  title?: string;
  xLabel?: string;
  yLabel?: string;
  padding?: Padding;
  layersPalette?: any;
  annotationsPalette?: any;
  numBins?: number;
}

const PAD: number = 50;

export const defaultProps = (pInst: p5, raw: any): Props => ({
  pg: pInst.createGraphics(pInst.width, pInst.height),
  dataset: new Dataset(raw),
  plotX: 0,
  plotY: 0,
  size: 5,
  padding: {
    top: PAD,
    right: PAD,
    bottom: PAD,
    left: PAD,
  },
  originX: PAD,
  originY: pInst.height - PAD,
  width: pInst.width - 2 * PAD,
  height: pInst.height - 2 * PAD,
  majorTicks: 5,
  minorTicks: 4,
  tickSize: 4,
  layersPalette: layers.default,
  annotationsPalette: annotations.default,
  numBins: undefined,
});
