function setup() {
  createCanvas(400, 400);
  generateData();
  let err = '0.5 * (W * x + b - y)^2';
  grad.W = num.derivative(err, 'W'); // (W * x + b - y) * x
  grad.b = num.derivative(err, 'b'); // W * x + b - y

  drawData();
  let neuronDisplay = drawNeuron();
  drawControls(neuronDisplay);
  textAlign(CENTER, CENTER);
  textFont('KaTeX-Main');
  textSize(18);
}

function draw() {
  background(220);
  drawGui();
  fill('white');
  stroke('black');
  rect(90, 95, 220, 50);
  drawArrow(90, 120);
  drawArrow(360, 120);
  fill('black');
  noStroke();
  text(`Error: ${avgError.toFixed(2)}`, 200, 300);
}
