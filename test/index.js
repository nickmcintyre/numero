/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('hello, número', function () {
  let pInst;

  before(function () {
    num.setBackend('cpu');
  });

  beforeEach(function () {
    pInst = new p5(function () {});
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('the math is mathing', function () {
    it('sure is', function () {
      const c = num.scope(() => {
        const a = num.tf.tensor1d([0, 1, 2, 3]);
        const b = num.tf.scalar(2);
        return a.mul(b).arraySync();
      });
      expect(c).to.eql([0, 2, 4, 6]);
    });
  });
});
