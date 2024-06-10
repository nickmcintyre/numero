class Fluid {
  // Initialize constants and data structures for simulation
  constructor(baseColor = 'cornflowerblue') {
    this.baseColor = color(baseColor);
    this.hue = hue(baseColor);
    this.t = 0;
    this.dt = 0.01;
    this.params = {};
    this.state = {};
    this.amplitude = 0.01;
    this.setParameters();
    this.setTensors();
    this.bound();
    this.equilibriate('middle', 0, this.params.u0, 1);
    this.step(100);
  }

  // Initialize various parameters for the flow simulation
  setParameters() {
    this.params.viscosity = 0.02;
    this.params.u0 = -this.amplitude;
    this.params.one36th = 1 / 36;
    this.params.one9th = 1 / 9;
    this.params.four9ths = 4 / 9;
    this.params.gridSize = 5;
    this.params.m = int(height / this.params.gridSize);
    this.params.n = int(width / this.params.gridSize);
  }

  // Initialize tensors for simulation
  setTensors() {
    const shape = [this.params.m, this.params.n];
    // Microscopic density
    this.state.n0 = Fluid.fragment(num.ones(shape));
    this.state.nN = Fluid.fragment(num.ones(shape));
    this.state.nS = Fluid.fragment(num.ones(shape));
    this.state.nE = Fluid.fragment(num.ones(shape));
    this.state.nW = Fluid.fragment(num.ones(shape));
    this.state.nNE = Fluid.fragment(num.ones(shape));
    this.state.nSE = Fluid.fragment(num.ones(shape));
    this.state.nNW = Fluid.fragment(num.ones(shape));
    this.state.nSW = Fluid.fragment(num.ones(shape));
    // Macroscopic properties
    this.state.rho = Fluid.fragment(num.ones(shape));
    this.state.ux = Fluid.fragment(num.zeros(shape));
    this.state.uy = Fluid.fragment(num.ones(shape).mult(this.params.u0));
    // Barriers
    this.state.bar = Fluid.fragment(num.zeros(shape));
  }

  // Break up a 2D tensor into pieces
  static fragment(tensor) {
    const [m, n] = tensor.shape;
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
  static fuse(pieces) {
    const axis = 1;
    const topLayer = pieces.tlc.concat(pieces.top, axis).concat(pieces.trc, axis);
    const midLayer = pieces.left.concat(pieces.middle, axis).concat(pieces.right, axis);
    const botLayer = pieces.blc.concat(pieces.bottom, axis).concat(pieces.brc, axis);

    return topLayer.concat(midLayer).concat(botLayer);
  }

  // Set micro and macroscopic variables to their equilibrium values
  equilibriate(piece, newux, newuy, newrho) {
    const result = {};
    // Helpful values
    const { one36th, one9th, four9ths } = this.params;
    const ones = num.ones(this.state.n0[piece].shape);
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

    result.n0 = ones.sub(u215).mult(four9thsrho);

    result.nE = ones.mult(ux2)
      .mult(4.5)
      .add(ones)
      .add(ux3)
      .sub(u215)
      .mult(one9thrho);

    result.nW = ones.mult(ux2)
      .mult(4.5)
      .add(ones)
      .sub(ux3)
      .sub(u215)
      .mult(one9thrho);

    result.nN = ones.mult(uy2)
      .mult(4.5)
      .add(ones)
      .add(uy3)
      .sub(u215)
      .mult(one9thrho);

    result.nS = ones.mult(uy2)
      .mult(4.5)
      .add(ones)
      .sub(uy3)
      .sub(u215)
      .mult(one9thrho);

    result.nNE = ones.mult(u2)
      .add(uxuy2)
      .mult(4.5)
      .add(ones)
      .add(ux3)
      .add(uy3)
      .sub(u215)
      .mult(one36thrho);

    result.nSE = ones.mult(u2)
      .sub(uxuy2)
      .mult(4.5)
      .add(ones)
      .add(ux3)
      .sub(uy3)
      .sub(u215)
      .mult(one36thrho);

    result.nNW = ones.mult(u2)
      .sub(uxuy2)
      .mult(4.5)
      .add(ones)
      .sub(ux3)
      .add(uy3)
      .sub(u215)
      .mult(one36thrho);

    result.nSW = ones.mult(u2)
      .add(uxuy2)
      .mult(4.5)
      .add(ones)
      .sub(ux3)
      .sub(uy3)
      .sub(u215)
      .mult(one36thrho);

    result.ux = ones.mult(newux);
    result.uy = ones.mult(newuy);
    result.rho = ones.mult(newrho);

    ['n0', 'nE', 'nW', 'nN', 'nS', 'nNE', 'nSE', 'nNW', 'nSW', 'ux', 'uy', 'rho'].forEach((quantity) => {
      this.state[quantity][piece].dispose();
      this.state[quantity][piece] = result[quantity];
    });
  }

  // Set fluid variables at the simulation boundaries
  bound() {
    ['top', 'bottom', 'tlc', 'left', 'blc', 'trc', 'right', 'brc'].forEach((piece) => {
      this.equilibriate(piece, 0, this.params.u0, 1);
    });
  }

  // Compute macroscopic density and velocity components
  macro() {
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
    } = this.state;

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
  }

  // Compute microscopic density
  micro() {
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
    } = this.state;

    // Helpful values
    const shape = [this.params.m - 2, this.params.n - 2];
    const ones = num.ones(shape);
    const omega = 1 / (3 * this.params.viscosity + 0.5);
    const { one36th, one9th, four9ths } = this.params;
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

    const result = {};
    result.n0 = n0.middle
      .add(ones
        .sub(u215)
        .mult(four9thsrho)
        .sub(n0.middle)
        .mult(omega));

    result.nE = nE.middle
      .add(ux2
        .mult(4.5)
        .add(ones)
        .add(ux3)
        .sub(u215)
        .mult(one9thrho)
        .sub(nE.middle)
        .mult(omega));

    result.nW = nW.middle
      .add(ux2
        .mult(4.5)
        .add(ones)
        .sub(ux3)
        .sub(u215)
        .mult(one9thrho)
        .sub(nW.middle)
        .mult(omega));

    result.nN = nN.middle
      .add(uy2
        .mult(4.5)
        .add(ones)
        .add(uy3)
        .sub(u215)
        .mult(one9thrho)
        .sub(nN.middle)
        .mult(omega));

    result.nS = nS.middle
      .add(uy2
        .mult(4.5)
        .add(ones)
        .sub(uy3)
        .sub(u215)
        .mult(one9thrho)
        .sub(nS.middle)
        .mult(omega));

    result.nNE = nNE.middle
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

    result.nSE = nSE.middle
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

    result.nNW = nNW.middle
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

    result.nSW = nSW.middle
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

    ['n0', 'nE', 'nW', 'nN', 'nS', 'nNE', 'nSE', 'nNW', 'nSW'].forEach((quantity) => {
      this.state[quantity].middle.dispose();
      this.state[quantity].middle = result[quantity];
    });
  }

  // Handle outlet boundary conditions
  outlet() {
    const result = {};
    const { m } = this.params;
    const eye = num.eye(m);
    const shiftBottom = eye.slice([0], [m - 1])
      .concat(eye.slice([m - 2], [1]));
    result.nS = Fluid.fuse(this.state.nS);
    result.nSE = Fluid.fuse(this.state.nSE);
    result.nSW = Fluid.fuse(this.state.nSW);
    result.nS = shiftBottom.dot(result.nS);
    result.nSE = shiftBottom.dot(result.nSE);
    result.nSW = shiftBottom.dot(result.nSW);
    ['nS', 'nSE', 'nSW'].forEach((quantity) => {
      ['top', 'bottom', 'left', 'right', 'middle', 'tlc', 'trc', 'blc', 'brc'].forEach((piece) => {
        this.state[quantity][piece].dispose();
      });
      this.state[quantity] = Fluid.fragment(result[quantity]);
    });
  }

  // Physics!
  collide() {
    this.bound();
    this.macro();
    this.micro();
    this.outlet();
  }

  // Move particles along each displacement vector
  stream() {
    const {
      nN,
      nS,
      nE,
      nW,
      nNW,
      nNE,
      nSW,
      nSE,
    } = this.state;

    const result = {};
    const m = this.params.m - 2;
    const eye = num.eye(m - 1);
    const upperShift = eye.pad([[0, 1], [1, 0]]);
    const lowerShift = eye.pad([[1, 0], [0, 1]]);

    // Move north-moving particles to the north
    result.nN = upperShift.dot(nN.middle)
      .slice([0, 0], [m - 1, m])
      .concat(nN.bottom);

    // Move northwest-moving particles to the northwest
    result.nNW = upperShift.dot(nNW.middle)
      .dot(lowerShift) // shift left
      .slice([0, 0], [m - 1, m])
      .concat(nNW.bottom)
      .slice([0, 0], [m, m - 1])
      .concat(nNW.right, 1);

    // Move the east-moving particles to the east
    result.nE = nE.left
      .concat(nE.middle
        .dot(upperShift) // shift right
        .slice([0, 1], [m, m - 1]), 1);

    // Move the northeast-moving particles to the northeast
    result.nNE = nNE.left
      .concat(upperShift
        .dot(nNE.middle)
        .dot(upperShift) // shift right
        .slice([0, 0], [m - 1, m])
        .concat(nNE.bottom)
        .slice([0, 1], [m, m - 1]), 1);

    // Move the south-moving particles to the south
    result.nS = nS.top
      .concat(lowerShift
        .dot(nS.middle)
        .slice([1, 0], [m - 1, m]));

    // Move southeast-moving particles to the southeast
    result.nSE = nSE.left
      .concat(nSE.top
        .concat(lowerShift
          .dot(nSE.middle)
          .dot(upperShift) // shift right
          .slice([1, 0], [m - 1, m]))
        .slice([0, 1], [m, m - 1]), 1);

    // Move west-moving particles to the west
    result.nW = nW.middle
      .dot(lowerShift) // shift left
      .slice([0, 0], [m, m - 1])
      .concat(nW.right, 1);

    // Move southwest-moving particles to the southwest
    result.nSW = nSW.top
      .concat(lowerShift
        .dot(nSW.middle)
        .dot(lowerShift) // shift left
        .slice([0, 0], [m, m - 1])
        .concat(nSW.right, 1)
        .slice([1, 0], [m - 1, m]));

    ['nE', 'nW', 'nN', 'nS', 'nNE', 'nSE', 'nNW', 'nSW'].forEach((quantity) => {
      this.state[quantity].middle = result[quantity];
    });
  }

  keepState() {
    ['n0', 'nE', 'nW', 'nN', 'nS', 'nNE', 'nSE', 'nNW', 'nSW'].forEach((quantity) => {
      ['top', 'bottom', 'left', 'right', 'middle', 'tlc', 'trc', 'blc', 'brc'].forEach((piece) => {
        num.keep(this.state[quantity][piece]);
      });
    });
  }

  step(numSteps = 1) {
    for (let i = 0; i < numSteps; i += 1) {
      this.params.u0 = -this.amplitude * noise(this.t);
      this.t += this.dt;
      this.collide();
      this.stream();
      this.keepState();
    }
  }

  draw(param = 'uy', low = 0, high = 100) {
    // map tensor elements to the range 0-100
    let tensor = Fluid.fuse(this.state[param]);
    const tensorMin = tensor.min();
    const tensorMax = tensor.max();
    let range = tensorMax - tensorMin;
    tensor = tensor.sub(tensorMin);
    tensor = tensor.div(range);
    range = high - low;
    tensor = tensor.mult(range);
    tensor = tensor.add(low);
    tensor = tensor.arraySync();
    // draw grid cells
    colorMode(HSB);
    const { m, n, gridSize } = this.params;
    for (let i = 0; i < m; i += 1) {
      const y = i * gridSize;
      for (let j = 0; j < n; j += 1) {
        const x = j * gridSize;
        const c = color(this.hue, tensor[j][i], 100);
        fill(c);
        stroke(c);
        square(x, y, gridSize);
      }
    }
  }
}
