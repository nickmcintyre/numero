// A lattice-Boltzmann fluid simulation using p5.js and número.
// Based on the simulation and lab developed by Daniel Schroeder.

let t = 0;
const dt = 0.01;
const params = {};
const state = {};
const amplitude = 0.01;

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
  num.startScope();
  let uy = fuse(state.uy);
  const uyMin = uy.min();
  const uyMax = uy.max();
  uy = uy.arraySync();
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
  num.endScope();
}

// Initialize constants and data structures for simulation
function initialize() {
  setParameters();
  setTensors();
  bound();
  equilibriate('middle', 0, params.u0, 1);
  for (let i = 0; i < 100; i += 1) {
    params.u0 = -amplitude * noise(t);
    t += dt;
    collide();
    stream();
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
  state.n0 = fragment(num.ones(shape));
  state.nN = fragment(num.ones(shape));
  state.nS = fragment(num.ones(shape));
  state.nE = fragment(num.ones(shape));
  state.nW = fragment(num.ones(shape));
  state.nNE = fragment(num.ones(shape));
  state.nSE = fragment(num.ones(shape));
  state.nNW = fragment(num.ones(shape));
  state.nSW = fragment(num.ones(shape));
  // Macroscopic properties
  state.rho = fragment(num.ones(shape));
  state.ux = fragment(num.zeros(shape));
  state.uy = fragment(num.ones(shape).mult(params.u0));
  // Barriers
  barriers = fragment(num.zeros(shape));
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
function equilibriate(piece, newux, newuy, newrho) {
  const result = num.tidy(() => {
    // Helpful values
    const { one36th, one9th, four9ths } = params;
    const ones = num.ones(state.n0[piece].tensor.shape);
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

    const n0_ = ones.sub(u215).mult(four9thsrho);

    const nE_ = ones.mult(ux2)
                    .mult(4.5)
                    .add(ones)
                    .add(ux3)
                    .sub(u215)
                    .mult(one9thrho);

    const nW_ = ones.mult(ux2)
                    .mult(4.5)
                    .add(ones)
                    .sub(ux3)
                    .sub(u215)
                    .mult(one9thrho);

    const nN_ = ones.mult(uy2)
                    .mult(4.5)
                    .add(ones)
                    .add(uy3)
                    .sub(u215)
                    .mult(one9thrho);

    const nS_ = ones.mult(uy2)
                    .mult(4.5)
                    .add(ones)
                    .sub(uy3)
                    .sub(u215)
                    .mult(one9thrho);

    const nNE_ = ones.mult(u2)
                    .add(uxuy2)
                    .mult(4.5)
                    .add(ones)
                    .add(ux3)
                    .add(uy3)
                    .sub(u215)
                    .mult(one36thrho);

    const nSE_ = ones.mult(u2)
                    .sub(uxuy2)
                    .mult(4.5)
                    .add(ones)
                    .add(ux3)
                    .sub(uy3)
                    .sub(u215)
                    .mult(one36thrho);

    const nNW_ = ones.mult(u2)
                    .sub(uxuy2)
                    .mult(4.5)
                    .add(ones)
                    .sub(ux3)
                    .add(uy3)
                    .sub(u215)
                    .mult(one36thrho);

    const nSW_ = ones.mult(u2)
                    .add(uxuy2)
                    .mult(4.5)
                    .add(ones)
                    .sub(ux3)
                    .sub(uy3)
                    .sub(u215)
                    .mult(one36thrho);

    const ux_ = ones.mult(newux);
    const uy_ = ones.mult(newuy);
    const rho_ = ones.mult(newrho);

    return {
      n0_,
      nE_,
      nW_,
      nN_,
      nS_,
      nNE_,
      nSE_,
      nNW_,
      nSW_,
      ux_,
      uy_,
      rho_,
    };
  });

  ['n0', 'nE', 'nW', 'nN', 'nS', 'nNE', 'nSE', 'nNW', 'nSW', 'ux', 'uy', 'rho'].forEach((quantity) => {
    state[quantity][piece].dispose();
    state[quantity][piece] = result[`${quantity}_`];
  });
}

// Set fluid variables at the simulation boundaries
function bound() {
  ['top', 'bottom', 'tlc', 'left', 'blc', 'trc', 'right', 'brc'].forEach((piece) => {
    equilibriate(piece, 0, params.u0, 1);
  });
}

// Compute macroscopic density and velocity components
function macro() {
  const {
    n0,
    nN,
    nS,
    nE,
    nW,
    nNW,
    nNE,
    nSW,
    nSE,
    rho,
    ux,
    uy,
  } = state;

  rho.middle.dispose();
  rho.middle = num.tidy(() => {
    const result = n0.middle
                    .add(nN.middle)
                    .add(nS.middle)
                    .add(nE.middle)
                    .add(nW.middle)
                    .add(nNW.middle)
                    .add(nNE.middle)
                    .add(nSW.middle)
                    .add(nSE.middle);
    return result;
  });

  ux.middle.dispose();
  ux.middle = num.tidy(() => {
    const result = nE.middle
                    .add(nNE.middle)
                    .add(nSE.middle)
                    .sub(nW.middle)
                    .sub(nNW.middle)
                    .sub(nSW.middle)
                    .div(rho.middle);
    return result;
  });

  uy.middle.dispose();
  uy.middle = num.tidy(() => {
    const result = nN.middle
                    .add(nNE.middle)
                    .add(nNW.middle)
                    .sub(nS.middle)
                    .sub(nSE.middle)
                    .sub(nSW.middle)
                    .div(rho.middle);
    return result;
  });
}

// Compute microscopic density
function micro() {
  const {
    n0,
    nN,
    nS,
    nE,
    nW,
    nNW,
    nNE,
    nSW,
    nSE,
    rho,
    ux,
    uy,
  } = state;

  const result = num.tidy(() => {
    // Helpful values
    const shape = [params.m - 2, params.n - 2];
    const ones = num.ones(shape);
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

    const n0_ = n0.middle
                    .add(ones
                      .sub(u215)
                      .mult(four9thsrho)
                      .sub(n0.middle)
                      .mult(omega));

    const nE_ = nE.middle
                    .add(ux2
                      .mult(4.5)
                      .add(ones)
                      .add(ux3)
                      .sub(u215)
                      .mult(one9thrho)
                      .sub(nE.middle)
                      .mult(omega));

    const nW_ = nW.middle
                    .add(ux2
                      .mult(4.5)
                      .add(ones)
                      .sub(ux3)
                      .sub(u215)
                      .mult(one9thrho)
                      .sub(nW.middle)
                      .mult(omega));

    const nN_ = nN.middle
                    .add(uy2
                      .mult(4.5)
                      .add(ones)
                      .add(uy3)
                      .sub(u215)
                      .mult(one9thrho)
                      .sub(nN.middle)
                      .mult(omega));

    const nS_ = nS.middle
                    .add(uy2
                      .mult(4.5)
                      .add(ones)
                      .sub(uy3)
                      .sub(u215)
                      .mult(one9thrho)
                      .sub(nS.middle)
                      .mult(omega));

    const nNE_ = nNE.middle
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

    const nSE_ = nSE.middle
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

    const nNW_ = nNW.middle
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

    const nSW_ = nSW.middle
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

    return {
      n0_,
      nE_,
      nW_,
      nN_,
      nS_,
      nNE_,
      nSE_,
      nNW_,
      nSW_,
    };
  });

  ['n0', 'nE', 'nW', 'nN', 'nS', 'nNE', 'nSE', 'nNW', 'nSW'].forEach((quantity) => {
    state[quantity].middle.dispose();
    state[quantity].middle = result[`${quantity}_`];
  });
}

// Handle outlet boundary conditions
function outlet() {
  const result = num.tidy(() => {
    const { m } = params;
    const eye = num.eye(m);
    const shiftBottom = eye
                        .slice([0], [m - 1])
                        .concat(eye.slice([m - 2], [1]));
    let nS = fuse(state.nS);
    let nSE = fuse(state.nSE);
    let nSW = fuse(state.nSW);
    nS = shiftBottom.dot(nS);
    nSE = shiftBottom.dot(nSE);
    nSW = shiftBottom.dot(nSW);

    return {
      nS,
      nSE,
      nSW,
    };
  });

  ['nS', 'nSE', 'nSW'].forEach((quantity) => {
    ['top', 'bottom', 'left', 'right', 'middle', 'tlc', 'trc', 'blc', 'brc'].forEach((piece) => {
      state[quantity][piece].dispose();
    });
    state[quantity] = fragment(result[quantity]);
    result[quantity].dispose();
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
  const {
    nN,
    nS,
    nE,
    nW,
    nNW,
    nNE,
    nSW,
    nSE,
  } = state;

  const result = num.tidy(() => {
    const m = params.m - 2;
    const eye = num.eye(m - 1);
    const upperShift = eye.pad([[0, 1], [1, 0]]);
    const lowerShift = eye.pad([[1, 0], [0, 1]]);

    // Move north-moving particles to the north
    const nN_ = upperShift
                  .dot(nN.middle)
                  .slice([0, 0], [m - 1, m])
                  .concat(nN.bottom);

    // Move northwest-moving particles to the northwest
    const nNW_ = upperShift
                  .dot(nNW.middle)
                  .dot(lowerShift) // shift left
                  .slice([0, 0], [m - 1, m])
                  .concat(nNW.bottom)
                  .slice([0, 0], [m, m - 1])
                  .concat(nNW.right, 1);

    // Move the east-moving particles to the east
    const nE_ = nE.left
                  .concat(nE.middle
                    .dot(upperShift) // shift right
                    .slice([0, 1], [m, m - 1]), 1);

    // Move the northeast-moving particles to the northeast
    const nNE_ = nNE.left
                  .concat(upperShift
                    .dot(nNE.middle)
                    .dot(upperShift) // shift right
                    .slice([0, 0], [m - 1, m])
                    .concat(nNE.bottom)
                    .slice([0, 1], [m, m - 1]), 1);

    // Move the south-moving particles to the south
    const nS_ = nS.top
                  .concat(lowerShift
                    .dot(nS.middle)
                    .slice([1, 0], [m - 1, m]));

    // Move southeast-moving particles to the southeast
    const nSE_ = nSE.left
                  .concat(nSE.top
                    .concat(lowerShift
                      .dot(nSE.middle)
                      .dot(upperShift) // shift right
                      .slice([1, 0], [m - 1, m]))
                    .slice([0, 1], [m, m - 1]), 1);

    // Move west-moving particles to the west
    const nW_ = nW.middle
                  .dot(lowerShift) // shift left
                  .slice([0, 0], [m, m - 1])
                  .concat(nW.right, 1);

    // Move southwest-moving particles to the southwest
    const nSW_ = nSW.top
                  .concat(lowerShift
                    .dot(nSW.middle)
                    .dot(lowerShift) // shift left
                    .slice([0, 0], [m, m - 1])
                    .concat(nSW.right, 1)
                    .slice([1, 0], [m - 1, m]));

    return {
      nE_,
      nW_,
      nN_,
      nS_,
      nNE_,
      nSE_,
      nNW_,
      nSW_,
    };
  });

  ['nE', 'nW', 'nN', 'nS', 'nNE', 'nSE', 'nNW', 'nSW'].forEach((quantity) => {
    state[quantity].middle.dispose();
    state[quantity].middle = result[`${quantity}_`];
  });
}
