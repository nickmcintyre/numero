# número
![número](numero.png)
> A friendly and intuitive math library for p5.js

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

[![Build Status](https://travis-ci.com/nickmcintyre/numero.svg?branch=master)](https://travis-ci.com/nickmcintyre/numero)

This addon library for p5.js turns the "software sketchbook" into a beginner-friendly environment for technical computing. It provides the following features:

- A tensor object (similar to [NumPy](https://numpy.org/) arrays)
- A computer algebra system (similar to [SymPy](https://www.sympy.org/en/index.html))
- A plotting API (similar to [Matplotlib](https://matplotlib.org/) -- coming soon!)
- A drawing turtle (because they're awesome)

The library is written in [TypeScript](http://www.typescriptlang.org/) and uses [TensorFlow.js](https://js.tensorflow.org/api/latest/) and [Math.js](https://mathjs.org/) under the hood. It bundles [TurtleGFX](https://github.com/CodeGuppyPrograms/TurtleGFX) for drawing with turtles.

## Usage

```javascript
// A little matrix-vector multiplication
const a = createTensor([[1, 2], [3, 4]]);
const x = createTensor([5, 6]);
const b = a.dot(x);

b.print();
```

## Demo
The fluid simulation below was created using a 2-dimensional [lattice Boltzmann method](https://en.wikipedia.org/wiki/Lattice_Boltzmann_methods).

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
