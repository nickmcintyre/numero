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

  describe('mean()', function () {
    it('Should calculate the mean', function () {
      const t1 = pInst.createTensor([1, 2, 3]);
      const t2 = num.mean(t1);
      const t3 = pInst.createTensor(2);
      expect(t2.equals(t3)).to.equal(true);
    });

    it('Should calculate means along different axes', function () {
      const t1 = pInst.createTensor([[1, 2], [3, 4]]);
      const t2 = num.mean(t1, 0);
      const t3 = pInst.createTensor([2, 3]);
      expect(t2.equals(t3)).to.equal(true);
      const t4 = num.mean(t1, 1);
      const t5 = pInst.createTensor([1.5, 3.5]);
      expect(t4.equals(t5)).to.equal(true);
    });

    it('Should keep dimensions of the original tensor', function () {
      const t1 = num.random([3, 3, 3]);
      const t2 = num.mean(t1, 0, true);
      expect(t2.shape.slice(1)).to.eql(t1.shape.slice(1));
    });
  });

  describe('average()', function () {
    it('Should default to equal weights', function () {
      const t1 = pInst.createTensor([1, 2, 3]);
      const t2 = num.average(t1);
      const t3 = pInst.createTensor(2);
      expect(t2.equals(t3)).to.equal(true);
    });

    it('Should apply weights when averaging', function () {
      const t1 = pInst.createTensor([2, 2, 2]);
      const w = pInst.createTensor([1, 2, 3]);
      const t2 = num.average(t1, w);
      const t3 = pInst.createTensor(2);
      expect(t2.equals(t3)).to.equal(true);
    });
  });

  describe('sd()', function () {
    it('Should calculate the standard deviation', function () {
      /**
       * Example data from Wikipedia.
       * https://en.wikipedia.org/wiki/Standard_deviation
       * CC-BY-SA
       */
      const t1 = pInst.createTensor([2, 4, 4, 4, 5, 5, 7, 9]);
      const t2 = pInst.createTensor(2);
      const t3 = num.sd(t1);
      expect(t2.equals(t3)).to.equal(true);
    });
  });

  describe('variance()', function () {
    it('Should calculate the variance', function () {
      /**
       * Example data from Wikipedia.
       * https://en.wikipedia.org/wiki/Standard_deviation
       * CC-BY-SA
       */
      const t1 = pInst.createTensor([2, 4, 4, 4, 5, 5, 7, 9]);
      const t2 = pInst.createTensor(4);
      const t3 = num.variance(t1);
      expect(t2.equals(t3)).to.equal(true);
    });
  });
});
