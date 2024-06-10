# número
> A friendly and intuitive math library for p5.js

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

[![Build Status](https://github.com/nickmcintyre/numero/actions/workflows/ci.yml/badge.svg)](https://github.com/nickmcintyre/numero/actions/workflows/ci.yml)

This p5.js addon library provides a beginner-friendly `Tensor` class that's similar to a [NumPy](https://numpy.org/) array. It builds on the linear algebra engine from [TensorFlow.js](https://js.tensorflow.org/api/latest/) and adapts it for sketching. You can view número's source code along with examples on [GitHub](https://github.com/nickmcintyre/numero).

## Usage

número's `Tensor` class is a generalization of numbers (scalars), vectors, and matrices. `Tensor`s are used heavily in fields ranging from physics to machine learning. Here are a few examples of `Tensor`s you may recognize:

```javascript
// The age of a cat in years.
// Rank-0 (Scalar)
let age = createTensor(5);

// The position of a cat in space.
// Rank-1 (Vector)
let position = createTensor([10, 20, 30]);

// The grayscale values of the pixels in a 2x2 cat picture.
// Rank-2 (Matrix)
let grayscale = createTensor([[100, 187],
                              [123, 182]]);

// The RGB values of the pixels in a 2x2 cat picture.
// Rank-3 (Array of Matrices)
let rgb = createTensor([
                        // Red.
                        [[100, 187],
                        [123, 182]],
                        // Green.
                        [[80, 205],
                        [20, 133]],
                        // Blue.
                        [[201, 72],
                        [209, 247]],
                      ]);
```

The following example multiplies a rank-1 `Tensor` (vector) by a rank-2 `Tensor` (matrix):

```javascript
function setup() {
  createCanvas(400, 400);

  background(220);

  // Translate the origin to the center.
  translate(200, 200);
  
  // Create the rotation matrix.
  let R = createTensor([[cos(HALF_PI), -sin(HALF_PI)],
                        [sin(HALF_PI), cos(HALF_PI)]]);

  // Create the vector.
  let v = createTensor([100, 0]);

  // Get the vector's components.
  let [x1, y1] = v.arraySync();

  // Draw the vector in red.
  stroke('red');
  line(0, 0, x1, y1);

  // Rotate the vector using matrix-vector multiplication,
  // also called the "inner" or "dot" product.
  v = R.dot(v);

  // Get the rotated vector's components.
  let [x2, y2] = v.arraySync();

  // Draw the rotated vector in blue.
  stroke('blue');
  line(0, 0, x2, y2);

  describe('Two lines extend from the center of a gray square. A red line extends to the right. A blue line extends downward.');
}
```

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ashneeldas2"><img src="https://avatars3.githubusercontent.com/u/18149521?v=4" width="100px;" alt="Ashneel Das"/><br /><sub><b>Ashneel Das</b></sub></a><br /><a href="https://github.com/nickmcintyre/numero/commits?author=ashneeldas2" title="Code">💻</a> <a href="https://github.com/nickmcintyre/numero/commits?author=ashneeldas2" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
