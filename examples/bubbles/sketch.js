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

function setup() {
  createCanvas(400, 400);

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
  Bubble.envelop(poses, fluid);
  fluid.step();
  fluid.draw('rho', 40, 100);
}
