# número
![número](numero.png)
> A friendly and intuitive math library for p5.js

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

This project aims to bring the mathematical chops of [NumPy](https://numpy.org/) and [SymPy](https://www.sympy.org/en/index.html) to the [p5.js](https://p5js.org/) ecosystem. A few guiding principles are:

- Focus on beginners.
- Complement core p5.js math functions and play nicely with p5.Vector.
- Make the API familiar (e.g., `createTensor()`).
- Let [ml5.js](https://ml5js.org/) handle machine learning.
- Encourage all kinds of contributions.

The initial plan is to develop the library in [TypeScript](http://www.typescriptlang.org/) using [TensorFlow.js](https://js.tensorflow.org/api/latest/) as a linear algebra engine.

## Why though?
Excellent libraries like [math.js](https://mathjs.org/) and [p5.dimensions](https://github.com/Smilebags/p5.dimensions.js) already exist. The idea is to study the masters while creating something new: a production grade library for numeric and symbolic computation that beginners can grow into over time.

Also, math + code = awesome :)

## Usage

```javascript
const b = num.tidy(() => {
    const a = createTensor([[1, 2], [3, 4]]);
    const x = createTensor([5, 6]);
    return a.dot(x);
});

print(b.toString());
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
