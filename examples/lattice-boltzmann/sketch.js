// A lattice-Boltzmann fluid simulation using p5.js and número.
// Based on the simulation and lab developed by Daniel Schroeder.

let t = 0;
const dt = 0.01;
const params = {};
let state = {};
const amplitude = 0.01;
let barriers;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  initialize();
}

function draw() {
  t += dt;
  params.u0 = -amplitude * noise(t);
  collide();
  stream();
  bounce();
  const uyMin = state.uy.min();
  const uyMax = state.uy.max();
  const uy = state.uy.arraySync();
  for (let i = 0; i < params.m; i += 1) {
    const y = i * params.gridSize;
    for (let j = 0; j < params.n; j += 1) {
      const x = j * params.gridSize;
      const c = color(map(uy[j][i], uyMin, uyMax, 0, 255), 255, 255);
      fill(c);
      stroke(c);
      square(x, y, params.gridSize);
    }
  }
}

// Initialize constants and data structures for simulation
function initialize() {
  setParameters();
  setTensors();
  bound();
  const { u0 } = params;
  equilibriate(['middle'], 0, u0, 1);
  for (let i = 0; i < 100; i += 1) {
    params.u0 = -amplitude * noise(t);
    t += dt;
    collide();
    stream();
    bounce();
  }
}

// Initialize various parameters for the flow simulation
function setParameters() {
  params.viscosity = 0.02;
  params.u0 = -amplitude;
  params.one36th = 1 / 36;
  params.one9th = 1 / 9;
  params.four9ths = 4 / 9;
  params.gridSize = 5;
  params.m = int(height / params.gridSize);
  params.n = int(width / params.gridSize);
}

// Initialize tensors for simulation
function setTensors() {
  const shape = [params.m, params.n];
  // Microscopic density
  state.n0 = num.Tensor.ones(shape);
  state.nN = num.Tensor.ones(shape);
  state.nS = num.Tensor.ones(shape);
  state.nE = num.Tensor.ones(shape);
  state.nW = num.Tensor.ones(shape);
  state.nNE = num.Tensor.ones(shape);
  state.nSE = num.Tensor.ones(shape);
  state.nNW = num.Tensor.ones(shape);
  state.nSW = num.Tensor.ones(shape);
  // Macroscopic properties
  state.rho = num.Tensor.ones(shape);
  state.ux = num.Tensor.zeros(shape);
  state.uy = num.Tensor.ones(shape).mult(params.u0);
  // Barriers
  barriers = num.Tensor.zeros(shape);
}

// Break up a 2D tensor into pieces
function fragment(tensor) {
  const { m, n } = params;
  const top = tensor.slice([0, 1], [1, n - 2]);
  const bottom = tensor.slice([m - 1, 1], [1, n - 2]);
  const left = tensor.slice([1, 0], [m - 2, 1]);
  const right = tensor.slice([1, n - 1], [m - 2, 1]);
  const middle = tensor.slice([1, 1], [m - 2, n - 2]);
  const tlc = tensor.slice([0, 0], [1, 1]);
  const trc = tensor.slice([0, n - 1], [1, 1]);
  const blc = tensor.slice([m - 1, 0], [1, 1]);
  const brc = tensor.slice([m - 1, n - 1], [1, 1]);

  return {
    top,
    bottom,
    left,
    right,
    middle,
    tlc,
    trc,
    blc,
    brc,
  };
}

// Make up a 2D tensor from pieces
function fuse(pieces) {
  const tensor = num.tidy(() => {
    const axis = 1;
    const topLayer = pieces.tlc.concat(pieces.top, axis).concat(pieces.trc, axis);
    const midLayer = pieces.left.concat(pieces.middle, axis).concat(pieces.right, axis);
    const botLayer = pieces.blc.concat(pieces.bottom, axis).concat(pieces.brc, axis);

    return topLayer.concat(midLayer).concat(botLayer);
  });

  return tensor;
}

// Set micro and macroscopic variables to their equilibrium values
function equilibriate(pieces, newux, newuy, newrho) {
  state = num.tidy(() => {
    // Microscopic properties
    let n0 = fragment(state.n0);
    let nN = fragment(state.nN);
    let nS = fragment(state.nS);
    let nE = fragment(state.nE);
    let nW = fragment(state.nW);
    let nNW = fragment(state.nNW);
    let nNE = fragment(state.nNE);
    let nSW = fragment(state.nSW);
    let nSE = fragment(state.nSE);
    // Macroscopic properties
    let rho = fragment(state.rho);
    let ux = fragment(state.ux);
    let uy = fragment(state.uy);
    // Helpful values
    const { one36th, one9th, four9ths } = params;
    for (let i = 0; i < pieces.length; i += 1) {
      const p = pieces[i];
      const ones = num.Tensor.ones(n0[p].tensor.shape);
      const ux3 = newux * 3;
      const uy3 = newuy * 3;
      const ux2 = newux ** 2;
      const uy2 = newuy ** 2;
      const uxuy2 = newux * newuy * 2;
      const u2 = ux2 + uy2;
      const u215 = u2 * 1.5;
      const one36thrho = newrho * one36th;
      const one9thrho = newrho * one9th;
      const four9thsrho = newrho * four9ths;

      n0[p] = ones.sub(u215).mult(four9thsrho);

      nE[p] = ones.mult(ux2)
                .mult(4.5)
                .add(ones)
                .add(ux3)
                .sub(u215)
                .mult(one9thrho);

      nW[p] = ones.mult(ux2)
                .mult(4.5)
                .add(ones)
                .sub(ux3)
                .sub(u215)
                .mult(one9thrho);

      nN[p] = ones.mult(uy2)
                .mult(4.5)
                .add(ones)
                .add(uy3)
                .sub(u215)
                .mult(one9thrho);

      nS[p] = ones.mult(uy2)
                .mult(4.5)
                .add(ones)
                .sub(uy3)
                .sub(u215)
                .mult(one9thrho);

      nNE[p] = ones.mult(u2)
                .add(uxuy2)
                .mult(4.5)
                .add(ones)
                .add(ux3)
                .add(uy3)
                .sub(u215)
                .mult(one36thrho);

      nSE[p] = ones.mult(u2)
                .sub(uxuy2)
                .mult(4.5)
                .add(ones)
                .add(ux3)
                .sub(uy3)
                .sub(u215)
                .mult(one36thrho);

      nNW[p] = ones.mult(u2)
                .sub(uxuy2)
                .mult(4.5)
                .add(ones)
                .sub(ux3)
                .add(uy3)
                .sub(u215)
                .mult(one36thrho);

      nSW[p] = ones.mult(u2)
                .add(uxuy2)
                .mult(4.5)
                .add(ones)
                .sub(ux3)
                .sub(uy3)
                .sub(u215)
                .mult(one36thrho);

      ux[p] = ones.mult(newux);
      uy[p] = ones.mult(newuy);
      rho[p] = ones.mult(newrho);
    }

    n0 = fuse(n0);
    nE = fuse(nE);
    nW = fuse(nW);
    nN = fuse(nN);
    nS = fuse(nS);
    nNE = fuse(nNE);
    nSE = fuse(nSE);
    nNW = fuse(nNW);
    nSW = fuse(nSW);
    ux = fuse(ux);
    uy = fuse(uy);
    rho = fuse(rho);

    for (const t in state) {
      state[t].dispose();
    }

    return {
      n0,
      nE,
      nW,
      nN,
      nS,
      nNE,
      nSE,
      nNW,
      nSW,
      ux,
      uy,
      rho,
    };
  });
}

// Set fluid variables at the simulation boundaries
function bound() {
  const { u0 } = params;
  // top and bottom rows
  equilibriate(['top'], 0, u0, 1);
  equilibriate(['bottom'], 0, u0, 1);
  // left and right columns, including corners
  equilibriate(['tlc', 'left', 'blc'], 0, u0, 1);
  equilibriate(['trc', 'right', 'brc'], 0, u0, 1);
}

// Compute macroscopic density and velocity components
function macro() {
  state = num.tidy(() => {
    // Microscopic properties
    let n0 = fragment(state.n0);
    let nN = fragment(state.nN);
    let nS = fragment(state.nS);
    let nE = fragment(state.nE);
    let nW = fragment(state.nW);
    let nNW = fragment(state.nNW);
    let nNE = fragment(state.nNE);
    let nSW = fragment(state.nSW);
    let nSE = fragment(state.nSE);
    // Macroscopic properties
    let rho = fragment(state.rho);
    let ux = fragment(state.ux);
    let uy = fragment(state.uy);

    rho.middle = n0.middle
                    .add(nN.middle)
                    .add(nS.middle)
                    .add(nE.middle)
                    .add(nW.middle)
                    .add(nNW.middle)
                    .add(nNE.middle)
                    .add(nSW.middle)
                    .add(nSE.middle);

    ux.middle = nE.middle
                    .add(nNE.middle)
                    .add(nSE.middle)
                    .sub(nW.middle)
                    .sub(nNW.middle)
                    .sub(nSW.middle)
                    .div(rho.middle);

    uy.middle = nN.middle
                    .add(nNE.middle)
                    .add(nNW.middle)
                    .sub(nS.middle)
                    .sub(nSE.middle)
                    .sub(nSW.middle)
                    .div(rho.middle);

    n0 = fuse(n0);
    nE = fuse(nE);
    nW = fuse(nW);
    nN = fuse(nN);
    nS = fuse(nS);
    nNE = fuse(nNE);
    nSE = fuse(nSE);
    nNW = fuse(nNW);
    nSW = fuse(nSW);
    ux = fuse(ux);
    uy = fuse(uy);
    rho = fuse(rho);

    for (const t in state) {
      state[t].dispose();
    }

    return {
      n0,
      nE,
      nW,
      nN,
      nS,
      nNE,
      nSE,
      nNW,
      nSW,
      ux,
      uy,
      rho,
    };
  });
}

// Compute microscopic density
function micro() {
  state = num.tidy(() => {
    // Microscopic properties
    let n0 = fragment(state.n0);
    let nN = fragment(state.nN);
    let nS = fragment(state.nS);
    let nE = fragment(state.nE);
    let nW = fragment(state.nW);
    let nNW = fragment(state.nNW);
    let nNE = fragment(state.nNE);
    let nSW = fragment(state.nSW);
    let nSE = fragment(state.nSE);
    // Macroscopic properties
    let rho = fragment(state.rho);
    let ux = fragment(state.ux);
    let uy = fragment(state.uy);
    // Helpful values
    const shape = [params.m - 2, params.n - 2];
    const ones = num.Tensor.ones(shape);
    const omega = 1 / (3 * params.viscosity + 0.5);
    const { one36th, one9th, four9ths } = params;
    const one36thrho = rho.middle.mult(one36th);
    const one9thrho = rho.middle.mult(one9th);
    const four9thsrho = rho.middle.mult(four9ths);
    const ux3 = ux.middle.mult(3);
    const uy3 = uy.middle.mult(3);
    const ux2 = ux.middle.sq();
    const uy2 = uy.middle.sq();
    const uxuy2 = ux.middle.mult(uy.middle).mult(2);
    const u2 = ux2.add(uy2);
    const u215 = u2.mult(1.5);

    n0.middle = n0.middle
                    .add(ones
                      .sub(u215)
                      .mult(four9thsrho)
                      .sub(n0.middle)
                      .mult(omega));

    nE.middle = nE.middle
                    .add(ux2
                      .mult(4.5)
                      .add(ones)
                      .add(ux3)
                      .sub(u215)
                      .mult(one9thrho)
                      .sub(nE.middle)
                      .mult(omega));

    nW.middle = nW.middle
                    .add(ux2
                      .mult(4.5)
                      .add(ones)
                      .sub(ux3)
                      .sub(u215)
                      .mult(one9thrho)
                      .sub(nW.middle)
                      .mult(omega));

    nN.middle = nN.middle
                    .add(uy2
                      .mult(4.5)
                      .add(ones)
                      .add(uy3)
                      .sub(u215)
                      .mult(one9thrho)
                      .sub(nN.middle)
                      .mult(omega));

    nS.middle = nS.middle
                    .add(uy2
                      .mult(4.5)
                      .add(ones)
                      .sub(uy3)
                      .sub(u215)
                      .mult(one9thrho)
                      .sub(nS.middle)
                      .mult(omega));

    nNE.middle = nNE.middle
                    .add(u2
                      .add(uxuy2)
                      .mult(4.5)
                      .add(ones)
                      .add(ux3)
                      .add(uy3)
                      .sub(u215)
                      .mult(one36thrho)
                      .sub(nNE.middle)
                      .mult(omega));

    nSE.middle = nSE.middle
                    .add(u2
                      .sub(uxuy2)
                      .mult(4.5)
                      .add(ones)
                      .add(ux3)
                      .sub(uy3)
                      .sub(u215)
                      .mult(one36thrho)
                      .sub(nSE.middle)
                      .mult(omega));

    nNW.middle = nNW.middle
                    .add(u2
                      .sub(uxuy2)
                      .mult(4.5)
                      .add(ones)
                      .sub(ux3)
                      .add(uy3)
                      .sub(u215)
                      .mult(one36thrho)
                      .sub(nNW.middle)
                      .mult(omega));

    nSW.middle = nSW.middle
                    .add(u2
                      .add(uxuy2)
                      .mult(4.5)
                      .add(ones)
                      .sub(ux3)
                      .sub(uy3)
                      .sub(u215)
                      .mult(one36thrho)
                      .sub(nSW.middle)
                      .mult(omega));

    n0 = fuse(n0);
    nE = fuse(nE);
    nW = fuse(nW);
    nN = fuse(nN);
    nS = fuse(nS);
    nNE = fuse(nNE);
    nSE = fuse(nSE);
    nNW = fuse(nNW);
    nSW = fuse(nSW);
    ux = fuse(ux);
    uy = fuse(uy);
    rho = fuse(rho);

    for (const t in state) {
      state[t].dispose();
    }

    return {
      n0,
      nE,
      nW,
      nN,
      nS,
      nNE,
      nSE,
      nNW,
      nSW,
      ux,
      uy,
      rho,
    };
  });
}

// Handle outlet boundary conditions
function outlet() {
  const result = num.tidy(() => {
    const { m } = params;
    const eye = num.Tensor.eye(m);
    const shiftBottom = eye
                  .slice([0], [m - 1])
                  .concat(eye.slice([m - 2], [1]));

    const nS = shiftBottom.dot(state.nS);
    const nSE = shiftBottom.dot(state.nSE);
    const nSW = shiftBottom.dot(state.nSW);

    return {
      nS,
      nSE,
      nSW,
    };
  });

  ['nS', 'nSE', 'nSW'].forEach((dir) => {
    state[dir].dispose();
    state[dir] = result[dir];
  });
}

// Physics!
function collide() {
  bound();
  macro();
  micro();
  outlet();
}

// Move particles along each displacement vector
function stream() {
  state = num.tidy(() => {
    const m = params.m - 2;
    const eye = num.Tensor.eye(m - 1);
    const upperShift = eye.pad([[0, 1], [1, 0]]);
    const lowerShift = eye.pad([[1, 0], [0, 1]]);
    const n0 = state.n0.copy();
    const rho = state.rho.copy();
    const ux = state.ux.copy();
    const uy = state.uy.copy();

    // Move north-moving particles to the north
    let nN = fragment(state.nN);
    nN.middle = upperShift
                    .dot(nN.middle)
                    .slice([0, 0], [m - 1, m])
                    .concat(nN.bottom);

    // Move northwest-moving particles to the northwest
    let nNW = fragment(state.nNW);
    nNW.middle = upperShift
                      .dot(nNW.middle)
                      .dot(lowerShift) // shift left
                      .slice([0, 0], [m - 1, m])
                      .concat(nNW.bottom)
                      .slice([0, 0], [m, m - 1])
                      .concat(nNW.right, 1);

    // Move the east-moving particles to the east
    let nE = fragment(state.nE);
    nE.middle = nE.left
                      .concat(nE.middle
                        .dot(upperShift) // shift right
                        .slice([0, 1], [m, m - 1]), 1);

    // Move the northeast-moving particles to the northeast
    let nNE = fragment(state.nNE);
    nNE.middle = nNE.left
                      .concat(upperShift
                        .dot(nNE.middle)
                        .dot(upperShift) // shift right
                        .slice([0, 0], [m - 1, m])
                        .concat(nNE.bottom)
                        .slice([0, 1], [m, m - 1]), 1);

    // Move the south-moving particles to the south
    let nS = fragment(state.nS);
    nS.middle = nS.top
                    .concat(lowerShift
                      .dot(nS.middle)
                      .slice([1, 0], [m - 1, m]));

    // Move southeast-moving particles to the southeast
    let nSE = fragment(state.nSE);
    nSE.middle = nSE.left
                      .concat(nSE.top
                        .concat(lowerShift
                          .dot(nSE.middle)
                          .dot(upperShift) // shift right
                          .slice([1, 0], [m - 1, m]))
                        .slice([0, 1], [m, m - 1]), 1);

    // Move west-moving particles to the west
    let nW = fragment(state.nW);
    nW.middle = nW.middle
                      .dot(lowerShift) // shift left
                      .slice([0, 0], [m, m - 1])
                      .concat(nW.right, 1);

    // Move southwest-moving particles to the southwest
    let nSW = fragment(state.nSW);
    nSW.middle = nSW.top
                      .concat(lowerShift
                        .dot(nSW.middle)
                        .dot(lowerShift) // shift left
                        .slice([0, 0], [m, m - 1])
                        .concat(nSW.right, 1)
                        .slice([1, 0], [m - 1, m]));

    nE = fuse(nE);
    nW = fuse(nW);
    nN = fuse(nN);
    nS = fuse(nS);
    nNE = fuse(nNE);
    nSE = fuse(nSE);
    nNW = fuse(nNW);
    nSW = fuse(nSW);

    for (const t in state) {
      state[t].dispose();
    }

    return {
      n0,
      nE,
      nW,
      nN,
      nS,
      nNE,
      nSE,
      nNW,
      nSW,
      ux,
      uy,
      rho,
    };
  });
}

// Handle particle bounce-back from objects
function bounce() {
  state = num.tidy(() => {
    const m = params.m - 2;
    const eye = num.Tensor.eye(m - 1);
    const upperShift = eye.pad([[0, 1], [1, 0]]);
    const lowerShift = eye.pad([[1, 0], [0, 1]]);
    const n0 = state.n0.copy();
    const ux = state.ux.copy();
    const uy = state.uy.copy();
    const rho = state.rho.copy();
    let nN = fragment(state.nN);
    let nNW = fragment(state.nNW);
    let nE = fragment(state.nE);
    let nNE = fragment(state.nNE);
    let nS = fragment(state.nS);
    let nSE = fragment(state.nSE);
    let nW = fragment(state.nW);
    let nSW = fragment(state.nSW);
    const bar = fragment(barriers);
    let nSource;
    let nTarget;

    // Bounce north-moving particles to the south
    nSource = bar.middle.mult(nN.middle);
    nTarget = nS.middle.sub(
                lowerShift.dot(bar.middle).mult(nS.middle))
                .add(lowerShift.dot(nSource));
    nS.middle = nTarget;

    // Bounce northwest-moving particles to the southeast
    nSource = bar.middle.mult(nNW.middle);
    nTarget = nSE.middle.sub(
                lowerShift.dot(bar.middle).dot(upperShift)
                  .mult(nSE.middle))
                .add(lowerShift.dot(nSource).dot(upperShift));
    nSE.middle = nTarget;

    // Bounce west-moving particles to the east
    nSource = bar.middle.mult(nW.middle);
    nTarget = nE.middle.sub(
                bar.middle.dot(upperShift).mult(nE.middle))
                  .add(nSource.dot(upperShift));
    nE.middle = nTarget;

    // Bounce northeast-moving particles to the southwest
    nSource = bar.middle.mult(nNE.middle);
    nTarget = nSW.middle.sub(
                lowerShift.dot(bar.middle).dot(lowerShift)
                  .mult(nSW.middle))
                .add(lowerShift.dot(nSource).dot(lowerShift));
    nSW.middle = nTarget;

    // Bounce south-moving particles to the north
    nSource = bar.middle.mult(nS.middle);
    nTarget = nN.middle.sub(
                upperShift.dot(bar.middle).mult(nN.middle))
                .add(upperShift.dot(nSource));
    nN.middle = nTarget;

    // Bounce southeast-moving particles to the northwest
    nSource = bar.middle.mult(nSE.middle);
    nTarget = nNW.middle.sub(
                upperShift.dot(bar.middle).dot(lowerShift)
                  .mult(nNW.middle))
                .add(upperShift.dot(nSource).dot(lowerShift));
    nNW.middle = nTarget;

    // Bounce west-moving particles to the east
    nSource = bar.middle.mult(nW.middle);
    nTarget = nE.middle.sub(
                bar.middle.dot(upperShift).mult(nE.middle))
                .add(nSource.dot(upperShift));
    nE.middle = nTarget;

    // Bounce southwest-moving particles to the northeast
    nSource = bar.middle.mult(nSW.middle);
    nTarget = nNE.middle.sub(
                upperShift.dot(bar.middle).dot(upperShift)
                  .mult(nNE.middle))
                .add(upperShift.dot(nSource).dot(upperShift));
    nNE.middle = nTarget;

    nE = fuse(nE);
    nW = fuse(nW);
    nN = fuse(nN);
    nS = fuse(nS);
    nNE = fuse(nNE);
    nSE = fuse(nSE);
    nNW = fuse(nNW);
    nSW = fuse(nSW);

    for (const t in state) {
      state[t].dispose();
    }

    return {
      n0,
      nE,
      nW,
      nN,
      nS,
      nNE,
      nSE,
      nNW,
      nSW,
      ux,
      uy,
      rho,
    };
  });
}
