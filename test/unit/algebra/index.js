/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Algebra', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('derivative()', function () {
    it('Should handle quadratics', function () {
      const dx = num.derivative('x^2', 'x');
      expect(dx.toString()).to.equal('2 * x');
    });
  });
});
