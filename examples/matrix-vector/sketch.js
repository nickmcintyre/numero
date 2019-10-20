function setup() {
  print('=== Matrix-vector multiplication ===');
  const b = num.tidy(() => {
    const a = createTensor([[2, 0], [0, 2]]);
    const x = createVector(1, 2);
    const dim = 2;
    return a.dot(x, dim);
  });

  print(b.toString());
}
