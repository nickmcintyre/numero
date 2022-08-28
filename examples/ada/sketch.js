// Ada Lovelace
// Portrait by Catherine Stroud
// Thanks Juan Carlos and Coding Train!
// CC-BY-NC 4.0
const ada = {
  x: [], y: [],
};
let path = [];
const drawSpeed = 10;
const bufferSize = 10;
const scaleFactor = 0.00002;
let timeStep = 0;
let fourierX;

function preload() {
  loadJSON('ada-lovelace.json', (points) => {
    for (const p of points) {
      ada.x.push(p.x);
      ada.y.push(p.y);
    }
  });
}

function setup() {
  createCanvas(900, 500);
  rescalePortrait(ada);
  fourierX = fft(ada);
}

function draw() {
  background(220);
  renderCycles(fourierX, bufferSize);
}

function rescalePortrait(points) {
  for (let i = 0; i < points.x.length; i += 1) {
    points.x[i] *= scaleFactor;
    points.y[i] *= scaleFactor;
  }
}

function fft(points) {
  const X = ten.scope(() => {
    const x = ten.complex(points.x, points.y);
    const X = ten.fft(x);
    let re = X.real();
    let im = X.imag();
    let amp = re.sq().add(im.sq()).sqrt();
    let phase = im.atan2(re);
    [re] = re.arraySync();
    [im] = im.arraySync();
    [amp] = amp.arraySync();
    [phase] = phase.arraySync();
    const output = [];
    for (let k = 0; k < points.x.length; k += 1) {
      output.push({
        re: re[k],
        im: im[k],
        amp: amp[k],
        phase: phase[k],
        freq: k * drawSpeed,
      });
    }
    output.sort((a, b) => b.amp - a.amp);
    return output;
  });
  return X;
}

function epicycles(fourier, numCycles, buffer) {
  let x = width / 2;
  let y = height / 2;
  for (let i = 0; i < numCycles; i += 1) {
    const prevx = x;
    const prevy = y;
    const {
      amp,
      freq,
      phase,
    } = fourier[i];
    x += amp * cos(freq * timeStep + phase);
    y += amp * sin(freq * timeStep + phase);
    // Only draw machinery on first iteration
    if (buffer === 0) {
      push();
      stroke(0, 25);
      strokeWeight(1);
      noFill();
      circle(prevx, prevy, amp * 2);
      line(prevx, prevy, x, y);
      pop();
    }
  }
  return { x, y };
}

function renderCycles(fourier, bufferSize) {
  const numCycles = int(fourier.length / 2);
  stroke('black');
  strokeWeight(2);
  strokeJoin(ROUND);
  noFill();
  for (let i = 0; i < bufferSize; i += 1) {
    const v = epicycles(fourier, numCycles, i);
    path.unshift(v);
    beginShape();
    for (const p of path) {
      vertex(p.x, p.y);
    }
    endShape();
    const dt = TWO_PI / numCycles;
    timeStep += dt;
    if (drawSpeed * timeStep > TWO_PI) {
      timeStep = 0;
      path = [];
    }
  }
}
