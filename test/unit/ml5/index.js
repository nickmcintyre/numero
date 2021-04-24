/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('ml5', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('window.ml5', function () {
    it('Should exist', function () {
      expect(ml5.version).to.equal('0.6.1');
    });
  });
});
