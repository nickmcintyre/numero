import * as p5 from 'p5';

const {
  min,
  max,
  map,
} = p5.prototype;

/**
 * Constructs a figure to contain plotting elements such as axes,
 * lines, markers, etc.
 *
 * @param pInst the p5 instance used for rendering
 * @returns     an object describing the figure
 */
export const figure = function drawFigure(pInst: any): object {
  pInst.push();
  const bigPad = 40;
  const littlePad = 10;
  const ox = bigPad;
  const oy = littlePad;
  const width = pInst.width - (littlePad + bigPad);
  const height = pInst.height - (littlePad + bigPad);
  pInst.stroke('black');
  pInst.strokeWeight(1);
  pInst.fill('white');
  pInst.rect(ox, oy, width, height);
  pInst.pop();

  return {
    ox, oy, width, height, bigPad, littlePad,
  };
};

/**
 * Constructs a pair of x and y-axes.
 *
 * @param pInst     the p5 instance used for rendering
 * @param ox        the origin's x-coordinate
 * @param oy        the origin's y-coordinate
 * @param width     the width of the axes
 * @param height    the height of the eaxes
 * @param numTicks  the number of tick marks
 */
export const axes = function drawAxes(
  pInst: any,
  ox: number,
  oy: number,
  width: number,
  height: number,
  numTicks: number = 7,
  margin: number = 20,
) {
  pInst.push();
  pInst.translate(ox, oy);

  pInst.push();
  pInst.stroke('black');
  pInst.strokeWeight(1);
  pInst.line(0, 0, width, 0);
  pInst.line(0, 0, 0, height);
  pInst.pop();

  pInst.push();
  pInst.stroke('black');
  pInst.strokeWeight(1);
  const dx = (width - 2 * margin) / (numTicks - 1);
  for (let i = 0; i < numTicks; i += 1) {
    const x = margin + i * dx;
    pInst.line(x, 0, x, 5);
  }
  pInst.pop();

  pInst.push();
  pInst.stroke('black');
  pInst.strokeWeight(1);
  const dy = (height - 2 * margin) / (numTicks - 1);
  for (let i = 0; i < numTicks; i += 1) {
    const y = margin + i * dy;
    pInst.line(0, y, 5, y);
  }
  pInst.pop();

  pInst.pop();
};

/**
 * Constructs an empty plot.
 *
 * @param pInst     the p5 instance used for rendering
 * @param x         the x-values to be plotted
 * @param y         the y-values to be plotted
 * @param numTicks  (optional) the number of tick marks
 * @returns         an object describing the plot
 */
export const basePlot = function drawBasePlot(
  pInst: any,
  x: number[],
  y: number[],
  numTicks: number = 7,
): object {
  const {
    ox,
    oy,
    width,
    height,
    bigPad,
    littlePad,
  } = pInst.figure();

  pInst.push();
  pInst.scale(1, -1);
  pInst.translate(0, -pInst.height - littlePad + bigPad);
  const margin = 20;
  pInst.axes(
    ox,
    oy,
    width,
    height,
    numTicks,
    margin,
  );
  pInst.pop();

  // Summarize data
  const xmin = min(x);
  const xmax = max(x);
  const xrange = xmax - xmin;
  const ymin = min(y);
  const ymax = max(y);
  const yrange = ymax - ymin;
  const xstart = ox + margin;
  const ystart = oy + margin;

  // Draw x labels
  pInst.push();
  pInst.textAlign(pInst.CENTER, pInst.CENTER);
  pInst.noStroke();
  pInst.fill('black');
  pInst.translate(xstart, oy + height + margin);
  const dx = (width - 2 * margin) / (numTicks - 1);
  for (let i = 0; i < numTicks; i += 1) {
    let n = xmin + (i / (numTicks - 1)) * xrange;
    if (pInst.abs(n) < 1) {
      n = pInst.nf(n, 1, 2);
    } else if (pInst.abs(n) < 10) {
      n = pInst.nf(n, 1, 1);
    } else {
      n = pInst.round(n);
    }
    pInst.text(n, i * dx, 0);
  }
  pInst.pop();

  // Draw y labels
  pInst.push();
  pInst.textAlign(pInst.CENTER, pInst.CENTER);
  pInst.noStroke();
  pInst.fill('black');
  pInst.translate(ox - margin, ystart);
  const dy = (height - 2 * margin) / (numTicks - 1);
  for (let i = 0; i < numTicks; i += 1) {
    let n = ymax - (i / (numTicks - 1)) * yrange;
    if (pInst.abs(n) < 1) {
      n = pInst.nf(n, 1, 2);
    } else if (pInst.abs(n) < 10) {
      n = pInst.nf(n, 1, 1);
    } else {
      n = pInst.round(n);
    }
    pInst.text(n, 0, i * dy);
  }
  pInst.pop();

  return {
    xmin,
    xmax,
    ymin,
    ymax,
    pad: bigPad + margin,
    width: width - 2 * margin,
    height: height - 2 * margin,
  };
};

/**
 * Constructs a line plot from arrays of x and y-values.
 *
 * @param pInst     the p5 instance used for rendering
 * @param x         the x-values to be plotted
 * @param y         the y-values to be plotted
 * @param numTicks  (optional) the number of tick marks
 */
export const plot = function drawLinePlot(
  pInst: any,
  x: number[],
  y: number[],
  numTicks: number = 7,
) {
  if (!(x instanceof Array) || !(y instanceof Array)) {
    throw new Error('plots must be created from Arrays.');
  } else if (x.length !== y.length) {
    throw new Error('x and y Arrays must be the same length.');
  }

  // Summarize data
  const {
    xmin,
    xmax,
    ymin,
    ymax,
    pad,
    width,
    height,
  } = pInst.basePlot(x, y, numTicks);

  pInst.push();
  pInst.scale(1, -1);
  pInst.translate(pad, -pInst.height + pad);
  for (let i = 0; i < x.length - 1; i += 1) {
    const x1 = map(x[i], xmin, xmax, 0, width);
    const y1 = map(y[i], ymin, ymax, 0, height);
    const x2 = map(x[i + 1], xmin, xmax, 0, width);
    const y2 = map(y[i + 1], ymin, ymax, 0, height);
    pInst.line(x1, y1, x2, y2);
  }
  pInst.pop();
};

/**
 * Constructs a scatter plot from arrays of x and y-values.
 *
 * @param pInst     the p5 instance used for rendering
 * @param x         the x-values to be plotted
 * @param y         the y-values to be plotted
 * @param numTicks  (optional) the number of tick marks
 */
export const scatter = function drawScatterPlot(
  pInst: any,
  x: number[],
  y: number[],
  numTicks: number = 7,
) {
  if (!(x instanceof Array) || !(y instanceof Array)) {
    throw new Error('plots must be created from Arrays.');
  } else if (x.length !== y.length) {
    throw new Error('x and y Arrays must be the same length.');
  }

  // Summarize data
  const {
    xmin,
    xmax,
    ymin,
    ymax,
    pad,
    width,
    height,
  } = pInst.basePlot(x, y, numTicks);

  pInst.push();
  pInst.scale(1, -1);
  pInst.translate(pad, -pInst.height + pad);
  for (let i = 0; i < x.length; i += 1) {
    const xval = map(x[i], xmin, xmax, 0, width);
    const yval = map(y[i], ymin, ymax, 0, height);
    pInst.point(xval, yval);
  }
  pInst.pop();
};
