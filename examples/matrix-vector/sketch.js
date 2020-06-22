function setup() {
  createCanvas(400, 400, WEBGL);
  frameRate(5);
}

function draw() {
  background('white');
  const a = createTensor([[2, 0, 0], [0, 2, 0], [0, 0, 2]]);
  const x = createVector(random(50), random(50), random(50));
  const b = a.dot(x);

  print('Result as a Tensor:');
  print(b.toString());

  print('Result as a p5.Vector:');
  const v = b.toVector();
  print(v.toString());
  
  // Visualize the original and transformed vectors
  strokeWeight(5);
  stroke('red');
  line(0, 0, 0, x.x, x.y, x.z); // original
  stroke('black');
  const offset = 10;
  translate(offset, offset, 0);
  line(0, 0, 0, v.x, v.y, v.z); // transformed
}
