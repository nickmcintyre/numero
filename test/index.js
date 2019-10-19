/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('hello, número', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
  });

  afterEach(function () {
    num.tfc.disposeVariables();
    pInst.remove();
  });

  describe('the math is mathing', function () {
    it('sure is', function () {
      let c;
      num.tfc.setBackend('cpu');
      num.tfc.tidy(() => {
        const a = num.tfc.tensor1d([0, 1, 2, 3]);
        const b = num.tfc.scalar(2);
        c = a.mul(b).arraySync();
      });
      expect(c).to.eql([0, 2, 4, 6]);
    });
  });
});
