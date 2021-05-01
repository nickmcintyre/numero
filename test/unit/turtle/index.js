/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Turtle', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('createTurtle()', function () {
    it('Should create a Turtle', function () {
      const t = pInst.createTurtle();
      expect(t).to.be.an.instanceof(num.Turtle);
    });
  });
});
