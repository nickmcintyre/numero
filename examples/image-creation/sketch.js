let a;

function setup() {
  createCanvas(400, 400);

  a = num.random([width, height, 3]);
  a = a.mult(255);
  num.toImage(a).then((img) => {
    image(img, 0, 0);
  });
}
