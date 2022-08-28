let original;
let imgFromTensor;
let redFilter;
let greenFilter;
let blueFilter;

function preload() {
  original = loadImage('assets/svanen.jpg');
}

function setup() {
  createCanvas(480, 480);

  const tensorFromImg = ten.fromImage(original);
  print('Tensor representation');
  print(tensorFromImg);

  imgFromTensor = ten.toImage(tensorFromImg).then((img) => {
    print('p5.Image representation');
    print(img);

    return img;
  });

  const r = createTensor([1, 0, 0]);
  redFilter = ten.toImage(tensorFromImg.mult(r));
  const g = createTensor([0, 1, 0]);
  greenFilter = ten.toImage(tensorFromImg.mult(g));
  const b = createTensor([0, 0, 1]);
  blueFilter = ten.toImage(tensorFromImg.mult(b));
}

function draw() {
  Promise.all([imgFromTensor, redFilter, greenFilter, blueFilter]).then((img) => {
    image(img[0], mouseX, mouseY);
    image(img[0], 0, 0);
    image(img[1], 120, 0);
    image(img[2], 240, 0);
    image(img[3], 360, 0);
  });
}
