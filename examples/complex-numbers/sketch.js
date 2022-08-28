function setup() {
  createCanvas(400, 400);

  background(220);

  textAlign(CENTER, CENTER);
  textFont('KaTeX-Main');
  textSize(18);
  text('Complex quadratic polynomial', 200, 50);
  let tex = createTeX('f(z) = z^2 + c');
  tex.position(160, 100);
  tex.style('font-size', '12px');
  tex = createTeX('z = 2 + 5i');
  tex.position(170, 150);
  tex.style('font-size', '12px');
  tex = createTeX('c = -0.4 + 0.6i');
  tex.position(155, 170);
  tex.style('font-size', '12px');

  const z = ten.complex(2, 5);
  const c = ten.complex(-0.4, 0.6);
  const f = z.mult(z)
    .add(c);

  fill(240);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, 253, 350, 50);
  let { real, imag } = f.arraySync();
  real = nfc(real, 1);
  imag = nfc(imag, 1);
  tex = createTeX(`f(z) = (2 + 5i)^2 + (-0.4 + 0.6i) = ${real} + ${imag}i`);
  tex.position(55, 240);
  tex.style('font-size', '12px');
}

function createTeX(expression) {
  const tex = createP('');
  katex.render(expression, tex.elt);
  return tex;
}
