// A lattice-Boltzmann fluid simulation using p5.js and número.
// Based on the simulation and lab developed by Daniel Schroeder.

let fluid;

function setup() {
  createCanvas(400, 400);
  fluid = new Fluid('indigo');
}

function draw() {
  fluid.step();
  fluid.draw('rho', 40, 100);
}
