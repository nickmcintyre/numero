// Gaussian elimination example
// https://en.wikipedia.org/wiki/Gaussian_elimination
// CC-BY-SA

function setup() {
  print('=== Gaussian elimination with row operations ===');
  
  print('Original Matrix');
  let a = createTensor([[ 2,  1, -1,   8],
                        [-3, -1,  2, -11],
                        [-2,  1,  2,  -3]]);
  a.print();

  print('Row 1 += 1.5 * Row 0');
  a = a.addRows(1, 0, 1.5);
  a.print();

  print('Row 2 += Row 0');
  a = a.addRows(2, 0);
  a.print();

  print('Row 2 -= 4 * Row 1');
  a = a.subRows(2, 1, 4);
  a.print();

  print('Row 1 += 0.5 * Row 2');
  a = a.addRows(1, 2, 0.5);
  a.print();

  print('Row 0 -= Row 2');
  a = a.subRows(0, 2);
  a.print();

  print('Row 1 *= 2');
  a = a.mulRow(1, 2);
  a.print();

  print('Row 2 *= -1');
  a = a.mulRow(2, -1);
  a.print();

  print('Row 0 -= Row 1');
  a = a.subRows(0, 1);
  a.print();

  print('Row 0 *= 0.5');
  a = a.mulRow(0, 0.5);
  a.print();
}
