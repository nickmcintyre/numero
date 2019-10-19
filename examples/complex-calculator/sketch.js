function setup() {
  print('=== Create a complex number ===');
  const z = num.Tensor.complex(2, 5);
  print(z.toString());
  print('=== Square a complex number ===');
  z.mult(z);
  print(z.toString());
  print('=== Add a complex number ===');
  const c = num.Tensor.complex(-0.4, 0.6);
  z.add(c);
  print(z.toString());
}
