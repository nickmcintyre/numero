function setup() {
  print('=== Create a matrix ===');
  const a = createTensor([[1, 0], [0, 1]]);
  print(a.toString());
  print('=== Scalar multiplication ===');
  a.mult(2);
  print(a.toString());
  print('=== Matrix-vector multiplication ===');
  const x = createVector(1, 2);
  const dim = 2;
  a.dot(x, dim);
  print(a.toString());
}
