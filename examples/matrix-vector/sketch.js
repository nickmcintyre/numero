function setup() {
  num.tidy(() => {
    print('=== Create a matrix ===');
    const a = createTensor([[1, 0], [0, 1]]);
    print(a.toString());
    print('=== Scalar multiplication ===');
    const b = a.mult(2);
    print(b.toString());
    print('=== Matrix-vector multiplication ===');
    const v = createVector(1, 2);
    const dim = 2;
    const c = b.dot(v, dim);
    print(c.toString());
  });
}
