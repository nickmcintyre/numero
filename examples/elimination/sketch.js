// Gaussian elimination example
// https://en.wikipedia.org/wiki/Gaussian_elimination
// CC-BY-SA

function setup() {
  createCanvas(400, 400);

  background(220);
  textFont('KaTeX-Main');
  textAlign(CENTER, CENTER);
  textSize(18);
  text('Gaussian elimination with row operations', 200, 50);

  print('Original Matrix');
  let a = createTensor([[2, 1, -1, 8],
    [-3, -1, 2, -11],
    [-2, 1, 2, -3]]);
  a.print();

  let m = a.arraySync();
  let tex = createTeX(`\\begin{bmatrix}
    ${m[0][0]} & ${m[0][1]} & ${m[0][2]} & ${m[0][3]} \\\\
    ${m[1][0]} & ${m[1][1]} & ${m[1][2]} & ${m[1][3]}  \\\\
    ${m[2][0]} & ${m[2][1]} & ${m[2][2]} & ${m[2][3]}
  \\end{bmatrix}`);
  tex.position(110, 100);

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
  a = a.multRow(1, 2);
  a.print();

  print('Row 2 *= -1');
  a = a.multRow(2, -1);
  a.print();

  print('Row 0 -= Row 1');
  a = a.subRows(0, 1);
  a.print();

  print('Row 0 *= 0.5');
  a = a.multRow(0, 0.5);
  a.print();

  tex = createTeX('=');
  tex.position(200, 200);

  m = a.arraySync();
  tex = createTeX(`\\begin{bmatrix}
    ${m[0][0]} & ${m[0][1]} & ${m[0][2]} & ${m[0][3]} \\\\
    ${m[1][0]} & ${m[1][1]} & ${m[1][2]} & ${m[1][3]}  \\\\
    ${m[2][0]} & ${m[2][1]} & ${m[2][2]} & ${m[2][3]}
  \\end{bmatrix}`);
  tex.position(140, 250);
}

function createTeX(expression) {
  const tex = createP('');
  katex.render(expression, tex.elt);
  return tex;
}
