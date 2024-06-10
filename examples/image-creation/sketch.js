function setup() {
  createCanvas(400, 400);
  randomImage();
}

function randomImage() {
  const a = num.random([width, height, 3]);
  const b = a.mult(255);
  num.toImage(b).then((img) => {
    image(img, 0, 0);
    num.dispose([a, b]);
    randomImage();
  });
}
