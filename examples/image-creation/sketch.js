function setup() {
  createCanvas(400, 400);
  randomImage();
}

function randomImage() {
  const a = ten.random([width, height, 3]);
  const b = a.mult(255);
  ten.toImage(b).then((img) => {
    image(img, 0, 0);
    ten.dispose([a, b]);
    randomImage();
  });
}
