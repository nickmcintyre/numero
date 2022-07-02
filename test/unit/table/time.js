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

  describe('get and set', function () {
    it('Should create valid dates', function () {
      const t = new p5.Table();
      t.columns = ['date'];
      t.addRow();
      t.setDateTime(0, 0, '2013-02-25');
      const d = t.getDateTime(0, 0);
      expect(d.isValid()).to.be.true;
    });

    it('Should allow custom parse formats', function () {
      const t = new p5.Table();
      t.columns = ['date'];
      t.addRow();
      t.setDateTime(0, 0, '2013 二月 25日', 'YYYY MMMM Do', 'zh-cn');
      t.addRow();
      t.setDateTime(1, 0, '2013-02-25');
      const d1 = t.getDateTime(0, 0);
      const d2 = t.getDateTime(1, 0);
      expect(d1.valueOf()).to.eql(d2.valueOf());
    });
  });

  describe('parseDates()', function () {
    it('Should create valid dates', function () {
      const t = new p5.Table();
      t.columns = ['date'];
      t.addRow();
      t.setString(0, 0, '2013-02-05');
      t.addRow();
      t.setString(0, 0, '2020-02-29');
      t.parseDates('date');
      const d1 = t.get(0, 0);
      expect(d1.isValid()).to.be.true;
      const d2 = t.get(1, 0);
      expect(d2.isValid()).to.be.true;
    });
  });
});
