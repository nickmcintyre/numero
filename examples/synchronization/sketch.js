// Simulate the synchronization of neurons in the brain by varying their connective
// arrangement.
// https://researchspace.auckland.ac.nz/bitstream/handle/2292/2666/esc-tr-638-1.pdf
const networkSize = 20;
let time = 0;
const dt = 0.05;
let coupling;
const couplingStrength = 7;
const noiseLevel = 0;
let naturalFrequency;
let phase;
let velocity;
let acceleration;
let arrangement = 'Press a key 1-5';

function setup() {
  createCanvas(400, 400);
  naturalFrequency = ten.random([networkSize]).mult(PI);
  phase = ten.random([networkSize]).mult(TWO_PI);
  velocity = ten.zeros([networkSize]);
  acceleration = ten.zeros([networkSize]);
  coupling = ten.zeros([networkSize, networkSize]);
}

function draw() {
  background(255);
  noStroke();
  fill(54, 86, 148);
  text(arrangement, 10, 20);
  translate(width / 2, height / 2);
  const theta = phase.arraySync();
  for (let i = 0; i < networkSize; i += 1) {
    const r = i * TWO_PI / networkSize;
    const a = map(theta[i], 0, TWO_PI, 0, 255);
    push();
    rotate(r);
    translate(100, 0);
    fill(54, 86, 148, a);
    circle(0, 0, 25);
    pop();
  }

  step();
}

function keyPressed() {
  switch (key) {
    case '1': {
      /**
       * Linear Unidirectional
       *
       * [[0, X, 0, 0],
       *  [0, 0, X, 0],
       *  [0, 0, 0, X],
       *  [0, 0, 0, 0]]
       */
      coupling.dispose();
      const cpl = new Array(networkSize);
      for (let i = 0; i < networkSize; i += 1) {
        cpl[i] = new Array(networkSize);
        for (let j = 0; j < networkSize; j += 1) {
          if (j === i + 1) {
            cpl[i][j] = couplingStrength;
          } else {
            cpl[i][j] = 0;
          }
        }
      }

      coupling = createTensor(cpl);
      arrangement = 'Linear Unidirectional';
      break;
    }
    case '2': {
      /**
       * Linear Bidirectional
       *
       * [[0, X, 0, 0],
       *  [X, 0, X, 0],
       *  [0, X, 0, X],
       *  [0, 0, X, 0]]
       */
      coupling.dispose();
      const cpl = new Array(networkSize);
      for (let i = 0; i < networkSize; i += 1) {
        cpl[i] = new Array(networkSize);
        for (let j = 0; j < networkSize; j += 1) {
          if (j === i + 1) {
            cpl[i][j] = couplingStrength;
          } else if (i === j + 1) {
            cpl[i][j] = couplingStrength;
          } else {
            cpl[i][j] = 0;
          }
        }
      }

      coupling = createTensor(cpl);
      arrangement = 'Linear Bidirectional';
      break;
    }
    case '3': {
      /**
       * Box Unidirectional
       *
       * [[0, X, 0, 0],
       *  [0, 0, X, 0],
       *  [0, 0, 0, X],
       *  [X, 0, 0, 0]]
       */
      coupling.dispose();
      const cpl = new Array(networkSize);
      for (let i = 0; i < networkSize; i += 1) {
        cpl[i] = new Array(networkSize);
        for (let j = 0; j < networkSize; j += 1) {
          if (j === i + 1) {
            cpl[i][j] = couplingStrength;
          } else if (j === 0 && i === networkSize - 1) {
            cpl[i][j] = couplingStrength;
          } else {
            cpl[i][j] = 0;
          }
        }
      }

      coupling = createTensor(cpl);
      arrangement = 'Box Unidirectional';
      break;
    }
    case '4': {
      /**
       * Box Bidirectional
       *
       * [[0, X, 0, X],
       *  [X, 0, X, 0],
       *  [0, X, 0, X],
       *  [X, 0, X, 0]]
       */
      coupling.dispose();
      const cpl = new Array(networkSize);
      for (let i = 0; i < networkSize; i += 1) {
        cpl[i] = new Array(networkSize);
        for (let j = 0; j < networkSize; j += 1) {
          if (j === i + 1) {
            cpl[i][j] = couplingStrength;
          } else if (i === j + 1) {
            cpl[i][j] = couplingStrength;
          } else if (j === 0 && i === networkSize - 1) {
            cpl[i][j] = couplingStrength;
          } else if (i === 0 && j === networkSize - 1) {
            cpl[i][j] = couplingStrength;
          } else {
            cpl[i][j] = 0;
          }
        }
      }

      coupling = createTensor(cpl);
      arrangement = 'Box Bidirectional';
      break;
    }
    case '5': {
      /**
       * All-to-all
       *
       * [[0, X, X, X],
       *  [X, 0, X, X],
       *  [X, X, 0, X],
       *  [X, X, X, 0]]
       */
      coupling.dispose();
      const cpl = new Array(networkSize);
      for (let i = 0; i < networkSize; i += 1) {
        cpl[i] = new Array(networkSize);
        for (let j = 0; j < networkSize; j += 1) {
          if (i === j) {
            cpl[i][j] = 0;
          } else {
            cpl[i][j] = couplingStrength;
          }
        }
      }

      coupling = createTensor(cpl);
      arrangement = 'All-to-All';
      break;
    }
    default: {
      break;
    }
  }

  ten.keep(coupling);
}

/**
 * Calculate the next phase of the oscillator network by solving the governing
 * equation with the classical Runge-Kutta method.
 *
 * https://en.wikipedia.org/wiki/Runge-Kutta_methods
 */
function step() {
  time += dt;
  const zeta = noiseLevel * noise(time);
  const oldPhase = phase.copy();
  const oldVelocity = velocity.copy();

  const zeros = ten.zeros([networkSize]);
  const k1 = diff(zeros, zeta).mult(dt);
  const k2 = diff(k1.div(2), zeta).mult(dt);
  const k3 = diff(k2.div(2), zeta).mult(dt);
  const k4 = diff(k3, zeta).mult(dt);
  const solution = k1.add(k2.mult(2)).add(k3.mult(2)).add(k4).div(6);

  const newPhase = phase.add(solution).mod(TWO_PI);
  const newVelocity = phase.sub(oldPhase).div(dt);
  const newAcceleration = velocity.sub(oldVelocity).div(dt);
  ten.dispose([phase, velocity, acceleration]);
  phase = newPhase;
  velocity = newVelocity;
  acceleration = newAcceleration;
  ten.keep([phase, velocity, acceleration]);
}

/**
 * Calculate the time derivative of an oscillator's phase using the Kuramoto model.
 *
 * https://en.wikipedia.org/wiki/Kuramoto_model
 */
function diff(increment, zeta) {
  let dTheta = new Array(networkSize);
  for (let i = 0; i < networkSize; i += 1) {
    dTheta[i] = phase.sub(increment);
  }

  dTheta = ten.stack(dTheta);
  const t = dTheta.sin()
    .mult(coupling)
    .sum(1)
    .div(networkSize)
    .add(zeta)
    .add(naturalFrequency);

  const result = createTensor(t);

  return result;
}
