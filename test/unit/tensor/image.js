/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Image', function () {
  let pInst;

  before(function () {
    ten.setBackend('cpu');
  });

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('fromImage()', function () {
    it('Should require an argument', function () {
      expect(ten.fromImage).to.throw(Error);
    });

    it('Should accept a p5.Image argument', function () {
      ten.scope(() => {
        const img = pInst.createImage(100, 100);
        const t = ten.fromImage(img);
        expect(t).to.be.an.instanceof(ten.Tensor);
      });
    });
  });

  describe('toImage()', function () {
    it('Should require an argument', function () {
      expect(ten.toImage).to.throw(Error);
    });

    it('Should accept a Tensor argument', function () {
      ten.scope(() => {
        const t = ten.random([512, 512, 3]);
        ten.toImage(t).then((img) => {
          expect(img).to.be.an.instanceof(p5.Image);
        });
      });
    });
  });
});
