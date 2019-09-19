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
    it('Should require an argument', function () {
      expect(pInst.createTensor).to.throw(Error);
    });

    it('Should accept Number arguments', function () {
      const t = pInst.createTensor(1);

      expect(t).to.be.an.instanceof(pInst.Tensor);
    });

    it('Should accept Array arguments', function () {
      const t = pInst.createTensor([0, 1]);

      expect(t).to.be.an.instanceof(pInst.Tensor);
    });

    it('Should accept p5.Vector arguments', function () {
      const v = pInst.createVector();
      const t = pInst.createTensor(v);

      expect(t).to.be.an.instanceof(pInst.Tensor);
    });
  });
});
