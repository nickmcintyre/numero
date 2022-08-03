/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Image', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('fromImage()', function () {
    it('Should require an argument', function () {
      expect(num.fromImage).to.throw(Error);
    });

    it('Should accept a p5.Image argument', function () {
      num.scope(() => {
        const img = pInst.createImage(100, 100);
        const t = num.fromImage(img);
        expect(t).to.be.an.instanceof(num.Tensor);
      });
    });
  });

  describe('toImage()', function () {
    it('Should require an argument', function () {
      expect(num.toImage).to.throw(Error);
    });

    it('Should accept a Tensor argument', function () {
      num.scope(() => {
        const t = num.random([512, 512, 3]);
        num.toImage(t).then((img) => {
          expect(img).to.be.an.instanceof(p5.Image);
        });
      });
    });
  });
});
