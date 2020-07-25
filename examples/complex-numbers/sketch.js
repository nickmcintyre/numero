function setup() {
  print('=== Complex quadratic polynomial ===');
  print('\n');
  print('f(z) = z^2 + c');
  print('\n');
  print('z: 2 + 5i');
  print('c: -0.4 + 0.6i');
  print('\n');
  
  const z = num.complex(2, 5);
  const c = num.complex(-0.4, 0.6);
  const f = z.mult(z)
             .add(c);

  print(f.toString());
}
