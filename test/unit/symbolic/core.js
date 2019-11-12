/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Symbolic core', function () {
  describe('run()', function () {
    it('Should handle algebraic expressions', function () {
      const expression = 'cos(x)^2 + sin(x)^2';
      const expected = '1';
      const simplification = num.run(`simplify(${expression})`);
      expect(simplification).to.equal(expected);
    });
  });
});
