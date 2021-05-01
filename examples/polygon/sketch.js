let sidesSlider;
let button;

function setup() {
  createCanvas(400, 400);
  noLoop();
  angleMode(DEGREES);
  
  numSides = createSlider(3, 20, 3, 1);
  numSides.position(100, 300);
  numSides.style('width', '200px');
  button = createButton('Redraw');
  button.style('width', '100px');
  button.position(150, 350);
  button.mousePressed(() => {
    redraw();
  });
}

function draw() {
  background('darkorchid');
  polygon(100, numSides.value());
  fill('darkturquoise');
  noStroke();
  text('3', 100, 330);
  text('20', 290, 330);
}

function polygon(diameter) {
  let n = numSides.value();
  let interiorAngle = 180 * (n - 2) / n;
  let turnAngle = 180 - interiorAngle;
  let sideLength = 0.5 * diameter * sin(interiorAngle);
  let x = 0.5 * (width - diameter * sin(0.5 * interiorAngle));
  let y = 0.5 * height;
  setposition(x, y);
  pencolor('darkturquoise');
  for(let i = 0; i < n; i += 1) {
    forward(sideLength);
    right(turnAngle);
  }
}
