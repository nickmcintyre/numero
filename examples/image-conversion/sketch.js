let img;
let tensorFromImg;
let imgFromTensor;

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
}

function draw() {
  image(img, 0, 0);
  image(imgFromTensor, mouseX, mouseY);
}
