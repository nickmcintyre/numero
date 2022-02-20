const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const y = x.map(xval => xval ** 2);

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  stroke("red");
  strokeWeight(5);
  // plot(x, y);
  scatter(x, y);
}
