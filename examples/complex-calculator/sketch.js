function setup() {
  print('=== Complex quadratic polynomial ===');
  
  const z = num.complex(2, 5);
  const zsquared = z.mult(z);
  const c = num.complex(-0.4, 0.6);
  const output = zsquared.add(c);
  print(output.toString());
}
