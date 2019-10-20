function setup() {
  num.tidy(() => {
    print('=== Create a complex number ===');
    const z = num.Tensor.complex(2, 5);
    print(z.toString());
    print('=== Square a complex number ===');
    const zsquared = z.mult(z);
    print(zsquared.toString());
    print('=== Add a complex number ===');
    const c = num.Tensor.complex(-0.4, 0.6);
    const f = zsquared.add(c);
    print(f.toString());
  });
}
