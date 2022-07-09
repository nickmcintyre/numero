// Heavily inspired by NanoNeuron
// https://github.com/trekhleb/nano-neuron
// MIT License
const numPoints = 100;
const data = {
  x: [],
  y: [],
};
let epoch = 0;
const learningRate = 0.0005;
const neuron = {
  W: 0.5,
  b: 0,
};
const grad = {
  W: null,
  b: null,
};

// 1. Generate data set
function fahr(cels) {
  const W = 1.8;
  const b = 32;
  return W * cels + b;
}

function generateData() {
  for (let x = 0; x < numPoints; x += 1) {
    data.x.push(x);
    const y = fahr(x);
    data.y.push(y);
  }
}

// 2. Forward Propagation
function predict(x) {
  return neuron.W * x + neuron.b;
}

function error(yHat, y) {
  return 0.5 * (yHat - y) ** 2;
}

function forwardProp() {
  let err = 0;
  for (let i = 0; i < numPoints; i += 1) {
    const yHat = predict(data.x[i]);
    err += error(yHat, data.y[i]);
  }
  err /= numPoints;
  return err;
}

// 3. Backpropagation
function gradient() {
  let dW = 0;
  let db = 0;
  for (let i = 0; i < numPoints; i += 1) {
    const scope = {
      W: neuron.W,
      b: neuron.b,
      x: data.x[i],
      y: data.y[i],
    };
    dW += grad.W.evaluate(scope); // (W * x + b - y) * x
    db += grad.b.evaluate(scope); // W * x + b - y
  }
  dW /= numPoints;
  db /= numPoints;
  return [dW, db];
}

function backProp() {
  const [dW, db] = gradient();
  neuron.W -= learningRate * dW;
  neuron.b -= learningRate * db;
}

function train(numEpochs = 1) {
  let err = 0;
  for (let i = 0; i < numEpochs; i += 1) {
    epoch += 1;
    err = forwardProp();
    backProp();
  }
  return err;
}
