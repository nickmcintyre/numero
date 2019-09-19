/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Tensor', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('createTensor()', function () {
    it('Should create a Tensor object', function () {
      let t = pInst.createTensor();

      expect(t).to.be.an.instanceof(pInst.Tensor);
    });
  });
});
