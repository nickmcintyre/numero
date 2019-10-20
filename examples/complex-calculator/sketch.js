function setup() {
  print('=== Complex quadratic polynomial ===');
  const output = num.tidy(() => {
    const z = num.Tensor.complex(2, 5);
    const zsquared = z.mult(z);
    const c = num.Tensor.complex(-0.4, 0.6);
    return zsquared.add(c);
  });

  print(output.toString());
}
