function setup() {
  createCanvas(400, 400);

  background(220);

  // Translate the origin to the center.
  translate(200, 200);
  
  // Create the rotation matrix.
  let R = createTensor([[cos(HALF_PI), -sin(HALF_PI)],
                        [sin(HALF_PI), cos(HALF_PI)]]);

  // Create the vector.
  let v = createTensor([100, 0]);

  // Get the vector's components.
  let [x1, y1] = v.arraySync();

  // Draw the vector in red.
  stroke('red');
  line(0, 0, x1, y1);

  // Rotate the vector using matrix-vector multiplication.
  v = R.dot(v);

  // Get the rotated vector's components.
  let [x2, y2] = v.arraySync();

  // Draw the rotated vector in blue.
  stroke('blue');
  line(0, 0, x2, y2);

  describe('Two lines extend from the center of a gray square. A red line extends to the right. A blue line extends downward.');
}