let img;
let tensorFromImg;
let imgFromTensor;
let redFilter;
let greenFilter;
let blueFilter;

function preload() {
  img = loadImage('assets/svanen.jpg');
}

function setup() {
  createCanvas(768, 768);

  tensorFromImg = num.fromImage(img);
  print('Tensor representation');
  print(tensorFromImg);

  imgFromTensor = num.toImage(tensorFromImg);
  print('p5.Image representation');
  print(imgFromTensor);

  const r = createTensor([1, 0, 0]);
  redFilter = num.toImage(tensorFromImg.mult(r));

  const g = createTensor([0, 1, 0]);
  greenFilter = num.toImage(tensorFromImg.mult(g));

  const b = createTensor([0, 0, 1]);
  blueFilter = num.toImage(tensorFromImg.mult(b));
}

function draw() {
  image(img, 0, 0);
  image(imgFromTensor, mouseX, mouseY);
  image(redFilter, 50, 100);
  image(greenFilter, 100, 200);
  image(blueFilter, 150, 300);
}
