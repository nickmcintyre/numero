let avgError = 0;

function drawData() {
  let input = createP('');
  input.position(10, 70);
  katex.render(`\\begin{bmatrix}
    x_1 \\\\
    x_2 \\\\
    : \\\\
    x_m
  \\end{bmatrix}`, input.elt);
  let output = createP('');
  output.position(360, 70);
  katex.render(`\\begin{bmatrix}
    \\hat{y}_1 \\\\
    \\hat{y}_2 \\\\
    : \\\\
    \\hat{y}_m
  \\end{bmatrix}`, output.elt);
}

function drawNeuron() {
  let neuronDisplay = createP('');
  neuronDisplay.position(130, 100);
  katex.render('f(x) = 0.5x + 0', neuronDisplay.elt);
  return neuronDisplay;
}

function drawControls(neuronDisplay) {
  let gui = createGui();
  let numEpochs = 100;
  gui.setFont('KaTeX-Main');
  gui.setTextSize(18);
  let trainButton = createButton('Train', 125, 230, 150, 40);
  trainButton.onPress = () => {
    for (let i = 0; i < numEpochs; i += 1) {
      avgError = train();
    }
    let W = neuron.W.toFixed(2);
    let b = neuron.b.toFixed(2);
    katex.render(`f(x) = ${W}x + ${b}`, neuronDisplay.elt);
  };
}

function drawArrow(x, y) {
  push();
  fill('black');
  stroke('black');
  translate(x, y);
  line(-50, 0, 0, 0);
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}
