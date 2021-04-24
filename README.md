# número
![número](numero.png)
> A friendly and intuitive math library for p5.js

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

[![Build Status](https://travis-ci.com/nickmcintyre/numero.svg?branch=master)](https://travis-ci.com/nickmcintyre/numero)

This project aims to bring the mathematical chops of [NumPy](https://numpy.org/), [pandas](https://pandas.pydata.org/), and [SymPy](https://www.sympy.org/en/index.html) to the [p5.js](https://p5js.org/) ecosystem. A few guiding principles are:

- Focus on beginners.
- Complement core p5.js math functions and play nicely with p5.Vector.
- Make the API familiar (e.g., `createTensor()`).
- Encourage all kinds of contributions.

The library is written in [TypeScript](http://www.typescriptlang.org/) and uses [TensorFlow.js](https://js.tensorflow.org/api/latest/), [Danfo.js](https://danfo.jsdata.org/), and [Math.js](https://mathjs.org/) under the hood. It bundles [ml5.js](https://ml5js.org/) to handle machine learning.

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
