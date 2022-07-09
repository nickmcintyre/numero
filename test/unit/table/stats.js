/* eslint-disable new-cap */
/* eslint-disable no-undef */
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

  describe('count()', function () {
    it('Should calculate the count of a column', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      expect(t.count('a')).to.eq(3);
      expect(t.count('b')).to.eq(3);
      expect(t.count('c')).to.eq(3);
    });

    it('Should should not count undefined', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', undefined);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      expect(t.count('a')).to.eq(3);
      expect(t.count('b')).to.eq(2);
      expect(t.count('c')).to.eq(3);
    });

    it('Should should calculate the count of all columns', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', undefined);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      expect(t.count().getRow(0).arr).to.eql([3, 2, 3]);
    });
  });

  describe('mean()', function () {
    it('Should calculate the mean of a column', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      expect(t.mean('a')).to.eq(4);
      expect(t.mean('b')).to.eq(5);
      expect(t.mean('c')).to.eq(6);
    });

    it('Should calculate the mean of all columns', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      expect(t.mean().getRow(0).arr).to.eql([4, 5, 6]);
    });
  });

  describe('median()', function () {
    it('Should calculate the median of a column', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      expect(t.median('a')).to.eq(4);
      expect(t.median('b')).to.eq(5);
      expect(t.median('c')).to.eq(6);
    });

    it('Should calculate the median of all columns', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      expect(t.median().getRow(0).arr).to.eql([4, 5, 6]);
    });
  });

  describe('max()', function () {
    it('Should calculate the maximum of a column', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      expect(t.max('a')).to.eq(7);
      expect(t.max('b')).to.eq(8);
      expect(t.max('c')).to.eq(9);
    });

    it('Should calculate the maximum of all columns', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      expect(t.max().getRow(0).arr).to.eql([7, 8, 9]);
    });
  });

  describe('min()', function () {
    it('Should calculate the minimum of a column', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      expect(t.min('a')).to.eq(1);
      expect(t.min('b')).to.eq(2);
      expect(t.min('c')).to.eq(3);
    });

    it('Should calculate the minimum of all columns', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      expect(t.min().getRow(0).arr).to.eql([1, 2, 3]);
    });
  });

  describe('sd()', function () {
    it('Should calculate the standard deviation of a column', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      expect(t.sd('a')).to.be.closeTo(2.449, 0.001);
      expect(t.sd('b')).to.be.closeTo(2.449, 0.001);
      expect(t.sd('c')).to.be.closeTo(2.449, 0.001);
    });

    it('Should calculate the standard deviation of all columns', function () {
      const t = new p5.Table();
      t.columns = ['a', 'b', 'c'];
      let row = t.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      t.sd().getRow(0).arr.forEach((sd) => {
        expect(sd).to.be.closeTo(2.449, 0.001);
      });
    });
  });

  describe('describe()', function () {
    it('Should return a table with row labels', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t1.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t1.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      const t2 = t1.describe();
      expect(t2.getColumn('stat')).to.eql(['count', 'mean', 'sd', 'min', '25%', '50%', '75%', 'max']);
    });

    it('Should return a table with numeric columns', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t1.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t1.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      const t2 = t1.describe();
      expect(t2.columns).to.eql(['stat', 'a', 'b', 'c']);
    });

    it('Should compute summary statistics for each numeric column', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t1.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t1.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 9);
      const t2 = t1.describe();
      let col = t2.getColumn('a');
      let values = [3, 4, 2.449, 1, 2.5, 4, 5.5, 7];
      for (let i = 0; i < values.length; i += 1) {
        expect(col[i]).to.be.closeTo(values[i], 0.001);
      }
      col = t2.getColumn('b');
      values = [3, 5, 2.449, 2, 3.5, 5, 6.5, 8];
      for (let i = 0; i < values.length; i += 1) {
        expect(col[i]).to.be.closeTo(values[i], 0.001);
      }
      col = t2.getColumn('c');
      values = [3, 6, 2.449, 3, 4.5, 6, 7.5, 9];
      for (let i = 0; i < values.length; i += 1) {
        expect(col[i]).to.be.closeTo(values[i], 0.001);
      }
    });
  });
});
