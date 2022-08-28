/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Time', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('toDatetime()', function () {
    it('Should create valid dates', function () {
      const t = pInst.toDateTime('2013-02-25');
      expect(t.isValid()).to.be.true;
    });

    it('Should allow custom parse formats', function () {
      const t1 = pInst.toDateTime('2013 二月 25日', 'YYYY MMMM Do', 'zh-cn');
      const t2 = pInst.toDateTime('2013-02-25');
      expect(t1.valueOf()).to.eql(t2.valueOf());
    });
  });
});
