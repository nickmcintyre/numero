// Gaussian elimination example
// https://en.wikipedia.org/wiki/Gaussian_elimination
// CC-BY-SA

function setup() {
  print('=== Gaussian elimination with row operations ===');
  
  let a = createTensor([[ 2,  1, -1,   8],
                        [-3, -1,  2, -11],
                        [-2,  1,  2,  -3]]);
  print('Original Matrix');
  print(a.toString());
  a = a.addRows(0, 1, 1.5);
  print('Row 1 + 1.5 * Row 0');
  print(a.toString());
  a = a.addRows(0, 2);
  print('Row 2 + Row 0');
  print(a.toString());
  a = a.subRows(1, 2, 4);
  print('Row 2 - 4 * Row 1');;
  print(a.toString());
  a = a.addRows(2, 1, 0.5);
  print('Row 1 + 0.5 * Row 2');
  print(a.toString());
  a = a.subRows(2, 0);
  print('Row 0 - Row 2');
  print(a.toString());
  a = a.mulRow(1, 2);
  print('Row 1 -> 2 * Row 1');
  print(a.toString());
  a = a.mulRow(2, -1);
  print('Row 2 -> -1 * Row 2');
  print(a.toString());
  a = a.subRows(1, 0);
  print('Row 0 - Row 1');
  print(a.toString());
  a = a.mulRow(0, 0.5);
  print('Row 0 -> 0.5 * Row 0');
  print(a.toString());
}
