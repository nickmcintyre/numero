let original;

function preload() {
  original = loadImage('assets/svanen.jpg');
}

function setup() {
  createCanvas(400, 400);

  background(220);

  // Draw the original image.
  image(original, 80, 80);

  // Create a rank-3 Tensor from the image.
  // A rank-3 Tensor is like a rectangular prism of numbers.
  // In this case, the Tensor's width and height match the
  // original image's. Its depth is 3 because the image has
  // has three color channels (RGB).
  let tensor = num.fromImage(original);

  // Create a rank-1 Tensor with a "red" RGB value.
  let redVector = createTensor([1, 0, 0]);

  // Filter the original image using element-wise multiplication.
  // For example, a white pixel has RGB values [255, 255, 255].
  // Element-wise multiplication produces:
  // [255, 255, 255] * [1, 0, 0] = [255 * 1, 255 * 0, 255 * 0]
  //                             = [255, 0, 0] (red)
  let filtered = tensor.mult(redVector);

  // Convert the filtered Tensor into a p5.Image, then draw it.
  num.toImage(filtered).then((img) => {
    image(img, 200, 200);
  });
}
