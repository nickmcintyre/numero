let header, input, button, result;

function setup() {
  createCanvas(400, 400);

  header = createElement('h2', 'Enter a polynomial');
  header.position(20, 5);

  input = createInput('x^2-9');
  input.position(20, 65);

  button = createButton('Factor');
  button.position(input.x + input.width, 65);
  button.mousePressed(factor);

  result = createElement('h4', '');
  result.position(20, 95);
}

function factor() {
  const expr = input.value();
  input.value('');
  const factorization = num.run(`printlatex(factor(${expr}))`);
  katex.render(factorization, result.elt);
}
