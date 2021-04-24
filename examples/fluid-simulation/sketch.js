// A lattice-Boltzmann fluid simulation using p5.js and número.
// Based on the simulation and lab developed by Daniel Schroeder.

let fluid;

function setup() {
  createCanvas(400, 400);
  fluid = new Fluid('navy');
}

function draw() {
  fluid.step();
  fluid.draw('rho', 50, 100);
}
