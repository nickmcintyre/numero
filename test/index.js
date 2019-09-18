/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('hello, número', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('the math is mathing', function () {
    it('sure is', function () {
      let c;

      pInst.tfc.setBackend('cpu');
      pInst.tfc.tidy(() => {
        const a = pInst.tfc.tensor1d([0, 1, 2, 3]);
        const b = pInst.tfc.scalar(2);
        c = a.mul(b).arraySync();
      });

      expect(c).to.deep.equal([0, 2, 4, 6]);
    });
  });
});
