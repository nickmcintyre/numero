/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Statistics', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('ptp()', function () {
    it('Should calculate the peak-to-peak range', function () {
      const t = num.range(0, 10);
      expect(num.ptp(t)).to.eq(9);
    });
  });

  describe('percentile()', function () {
    it('Should calculate the q-th percentile', function () {
      const t = num.range(0, 10);
      const q = 50;
      expect(num.percentile(t, q)).to.eq(4.5);
    });

    it('Should calculate an array of percentiles', function () {
      const t = num.range(0, 10);
      const q = [0, 50, 100];
      expect(num.percentile(t, q)).to.eql([0, 4.5, 9]);
    });

    it('Should require percentiles in the range [0, 100]', function () {
      const t = num.range(0, 10);
      expect(() => num.quantile(t, -1)).to.throw(Error);
      expect(() => num.quantile(t, 101)).to.throw(Error);
    });
  });

  describe('quantile()', function () {
    it('Should calculate the q-th quantile', function () {
      const t = num.range(0, 10);
      const q = 0.5;
      expect(num.quantile(t, q)).to.eq(4.5);
    });

    it('Should calculate an array of quantiles', function () {
      const t = num.range(0, 10);
      const q = [0, 0.5, 1];
      expect(num.quantile(t, q)).to.eql([0, 4.5, 9]);
    });

    it('Should require quantiles in the range [0, 1]', function () {
      const t = num.range(0, 10);
      expect(() => num.quantile(t, -1)).to.throw(Error);
      expect(() => num.quantile(t, 1.1)).to.throw(Error);
    });
  });
});
