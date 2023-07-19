let numSides;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

  numSides = createSlider(3, 50, 3, 1);
  numSides.position(100, 300);
  numSides.style('width', '200px');
}

function draw() {
  background('darkorchid');
  polygon(100, numSides.value());
  fill('darkturquoise');
  noStroke();
  text('3', 100, 330);
  text('50', 290, 330);
}

function polygon(diameter, n) {
  const interiorAngle = 180 * (n - 2) / n;
  const turnAngle = 180 - interiorAngle;
  const sideLength = 0.5 * diameter * sin(interiorAngle);
  const x = 0.5 * (width - diameter * sin(0.5 * interiorAngle));
  const y = 0.5 * height;
  setposition(x, y);
  pencolor('darkturquoise');
  for (let i = 0; i < n; i += 1) {
    forward(sideLength);
    right(turnAngle);
  }
}
