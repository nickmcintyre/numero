# número

![número](numero.png)
> A friendly and intuitive math library for p5.js

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

[![Build Status](https://github.com/nickmcintyre/numero/actions/workflows/ci.yml/badge.svg)](https://github.com/nickmcintyre/numero/actions/workflows/ci.yml)

This addon library for p5.js turns the "software sketchbook" into a beginner-friendly environment for technical computing. It provides the following features:

- A tensor object similar to [NumPy](https://numpy.org/) arrays
- A grammar of data manipulation similar to [dplyr](https://dplyr.tidyverse.org/)
- A drawing turtle 🐢

The library is written in [TypeScript](http://www.typescriptlang.org/) and uses [TensorFlow.js](https://js.tensorflow.org/api/latest/) and [tidy.js](https://pbeshai.github.io/tidy/) under the hood. It bundles [p5.ten](https://github.com/nickmcintyre/p5.ten), [p5.tidy](https://github.com/nickmcintyre/p5.tidy), and [TurtleGFX](https://github.com/CodeGuppyPrograms/TurtleGFX).

## Usage

### Turtle Geometry
View the [Polygon example](/examples/polygon/).
```javascript
let numSides;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

  numSides = createSlider(3, 50, 3, 1);
  numSides.position(100, 300);
  numSides.style('width', '200px');
}

function draw() {
  background('darkorchid');
  polygon(100, numSides.value());
  fill('darkturquoise');
  noStroke();
  text('3', 100, 330);
  text('50', 290, 330);
}

function polygon(diameter, n) {
  const interiorAngle = 180 * (n - 2) / n;
  const turnAngle = 180 - interiorAngle;
  const sideLength = 0.5 * diameter * sin(interiorAngle);
  const x = 0.5 * (width - diameter * sin(0.5 * interiorAngle));
  const y = 0.5 * height;
  setposition(x, y);
  pencolor('darkturquoise');
  for (let i = 0; i < n; i += 1) {
    forward(sideLength);
    right(turnAngle);
  }
}
```

### Data Wrangling
View the [Mauna Loa example](/examples/mauna-loa/).
```javascript
let data;

function preload() {
  data = loadTable('co2.csv', 'csv', 'header');
}

function setup() {
  noCanvas();
  tidy(
    data,
    filter((d) => d.mean > 400),
    debug('Observations greater than 400ppm CO2'),
  );
}

/**
[tidy.debug] Observations greater than 400ppm CO2 -----------------------------
console.table()
(index) date        mean    unc
0       2013-05-01  400.02  0.13
1       2014-04-01  401.51  0.19
2       2014-05-01  401.96  0.21
**/
```

### Tensors
View the [matrix-vector example](/examples/matrix-vector/).
```javascript
function setup() {
  noCanvas();
  print("---\n A \n---\n");
  const a = createTensor([[1, 0], [0, 2]]);
  a.print();
  print("---\n x \n---\n");
  const x = createTensor([3, 4]);
  x.print();
  print("--------\n Ax = b \n--------\n");
  const b = a.dot(x);
  b.print();
}

/**
---
 A 
---
Tensor
    [[1, 0],
     [0, 2]]
---
 x 
---
Tensor
    [3, 4]
--------
 Ax = b 
--------
Tensor
    [3, 8]
**/
```

## Demo

The [fluid simulation](/examples/fluid-simulation/) below was created using a 2-dimensional [lattice Boltzmann method](https://en.wikipedia.org/wiki/Lattice_Boltzmann_methods).

![A fluid simulation](examples/fluid-simulation/lbm.gif)

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
