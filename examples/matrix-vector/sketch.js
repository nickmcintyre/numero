function setup() {
  createCanvas(400, 400, WEBGL);
  frameRate(1);
  const original = createP('Original');
  original.position(20, 15);
  original.style('font-family', 'Arial');
  original.style('color', 'red');
  const transformed = createP('Transformed');
  transformed.position(20, 40);
  transformed.style('font-family', 'Arial');
  transformed.style('color', 'black');
}

function draw() {
  background('white');
  const a = createTensor([[2, 0, 0], [0, 2, 0], [0, 0, 2]]);
  const x = createVector(random(50), random(50), random(50));
  let b = a.dot(x);

  print('\n==========\n');
  // Result as a Tensor:
  print(b.toString());

  // Result as a p5.Vector
  b = b.toVector();
  print(b.toString());

  // Visualize the original and transformed vectors
  strokeWeight(5);
  stroke('red');
  line(0, 0, 0, x.x, x.y, x.z); // original
  const offset = 10;
  stroke('black');
  translate(offset, offset, 0);
  line(0, 0, 0, b.x, b.y, b.z); // transformed
}
