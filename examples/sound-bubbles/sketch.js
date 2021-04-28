// PoseNet tracking adapted from the ml5.js example. MIT License.
// https://ml5js.org/reference/api-PoseNet/

// The Lattice Boltzmann algorithm was ported to TensorFlow from Dan Schroeder's
// excellent lab assignment. MIT License.
// https://physics.weber.edu/schroeder/fluids/

// The convex hull algorithm was adapted for p5.js from Wikibooks' implementation.  CC BY-SA 3.0.
// https://en.m.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain
let video;
let poseNet;
let poses = [];
let fluid;
let mic;
let fft;
let nyquist = 22050;
let freqRange = 'bass';

function setup() {
  const cnv = createCanvas(400, 400);
  cnv.mousePressed(userStartAudio);
  colorMode(HSB);

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseNet = ml5.poseNet(video, () => {
    print('PoseNet model loaded.');
  });

  poseNet.on('pose', (results) => {
    poses = results;
  });

  fluid = new Fluid('deeppink');
}

function draw() {
  const spectrum = fft.analyze();
  // print(spectrum);

  // Map the "middle" frequency to hue for drawing
  // the fluid.
  const spectralCentroid = fft.getCentroid();
  // print(spectralCentroid);
  const h = map(spectralCentroid, 0, nyquist, 0, 360);
  // print(`hue: ${h}`);

  // Map the amount of energy in a frequency range to
  // hue for drawing the fluid.
  // Control frequency range with keyboard.
  // if (keyIsPressed) {
  //   if (key === 'a') {
  //     freqRange = 'bass';
  //   } else if (key === 's') {
  //     freqRange = 'lowMid';
  //   } else if (key === 'd') {
  //     freqRange = 'mid';
  //   } else if (key === 'f') {
  //     freqRange = 'highMid';
  //   } else if (key === 'g') {
  //     freqRange = 'treble';
  //   }
  // }
  // // print(`freqRange: ${freqRange}`);
  // const h = map(fft.getEnergy(freqRange), 0, 255, 0, 360);
  // // print(`hue: ${h}`);
  
  Bubble.envelop(poses, fluid);
  fluid.step();
  fluid.draw('rho', 40, 100, h);
}
