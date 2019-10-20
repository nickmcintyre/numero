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
      num.tfc.setBackend('cpu');
      const c = num.tfc.tidy(() => {
        const a = num.tfc.tensor1d([0, 1, 2, 3]);
        const b = num.tfc.scalar(2);
        return a.mul(b).arraySync();
      });
      expect(c).to.eql([0, 2, 4, 6]);
    });
  });

  describe('tidy()', function () {
    it('Cleans up memory', function () {
      const start = num.tfc.memory().numTensors;
      num.tidy(() => {
        const t = num.tfc.tensor([1, 2, 3]);
      });
      const end = num.tfc.memory().numTensors;
      expect(start).to.equal(end);
    });
  });
});
