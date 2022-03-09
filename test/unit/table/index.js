/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('p5.Table', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
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
      expect(t.sd('a')).to.eq(3);
      expect(t.sd('b')).to.eq(3);
      expect(t.sd('c')).to.eq(3);
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
      expect(t.sd().getRow(0).arr).to.eql([3, 3, 3]);
    });
  });

  describe('concat()', function () {
    it('Should concatenate two tables vertically', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      const t2 = new p5.Table();
      t2.columns = ['a', 'b', 'c'];
      row = t2.addRow();
      row.setNum('a', 4);
      row.setNum('b', 5);
      row.setNum('c', 6);
      const t3 = t1.concat(t2);
      expect(t3.get(1, 'a')).to.eq(4);
      expect(t3.get(1, 'b')).to.eq(5);
      expect(t3.get(1, 'c')).to.eq(6);
    });

    it('Should concatenate two tables with overlapping columns', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      const t2 = new p5.Table();
      t2.columns = ['c', 'd', 'e'];
      row = t2.addRow();
      row.setNum('c', 4);
      row.setNum('d', 5);
      row.setNum('e', 6);
      const t3 = t1.concat(t2);
      expect(t3.get(0, 'a')).to.eq(1);
      expect(t3.get(0, 'b')).to.eq(2);
      expect(t3.get(0, 'c')).to.eq(3);
      expect(t3.get(0, 'd')).to.eq(undefined);
      expect(t3.get(0, 'e')).to.eq(undefined);
      expect(t3.get(1, 'a')).to.eq(undefined);
      expect(t3.get(1, 'b')).to.eq(undefined);
      expect(t3.get(1, 'c')).to.eq(4);
      expect(t3.get(1, 'd')).to.eq(5);
      expect(t3.get(1, 'e')).to.eq(6);
    });

    it('Should concatenate two tables with disjoint columns', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      const t2 = new p5.Table();
      t2.columns = ['d', 'e'];
      row = t2.addRow();
      row.setNum('d', 4);
      row.setNum('e', 5);
      const t3 = t1.concat(t2);
      expect(t3.get(0, 'a')).to.eq(1);
      expect(t3.get(0, 'b')).to.eq(2);
      expect(t3.get(0, 'c')).to.eq(3);
      expect(t3.get(0, 'd')).to.eq(undefined);
      expect(t3.get(0, 'e')).to.eq(undefined);
      expect(t3.get(1, 'a')).to.eq(undefined);
      expect(t3.get(1, 'b')).to.eq(undefined);
      expect(t3.get(1, 'c')).to.eq(undefined);
      expect(t3.get(1, 'd')).to.eq(4);
      expect(t3.get(1, 'e')).to.eq(5);
    });

    it('Should concatenate two tables horizontally', function () {
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
      const t2 = new p5.Table();
      t2.columns = ['d', 'e'];
      row = t2.addRow();
      row.setNum('d', 7);
      row.setNum('e', 8);
      row = t2.addRow();
      row.setNum('d', 9);
      row.setNum('e', 10);
      const t3 = t1.concat(t2, 1);
      expect(t3.get(0, 'a')).to.eq(1);
      expect(t3.get(0, 'b')).to.eq(2);
      expect(t3.get(0, 'c')).to.eq(3);
      expect(t3.get(0, 'd')).to.eq(7);
      expect(t3.get(0, 'e')).to.eq(8);
      expect(t3.get(1, 'a')).to.eq(4);
      expect(t3.get(1, 'b')).to.eq(5);
      expect(t3.get(1, 'c')).to.eq(6);
      expect(t3.get(1, 'd')).to.eq(9);
      expect(t3.get(1, 'e')).to.eq(10);
    });

    it('Should concatenate two tables with different numbers of rows', function () {
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
      const t2 = new p5.Table();
      t2.columns = ['d', 'e'];
      row = t2.addRow();
      row.setNum('d', 7);
      row.setNum('e', 8);
      const t3 = t1.concat(t2, 1);
      expect(t3.get(0, 'a')).to.eq(1);
      expect(t3.get(0, 'b')).to.eq(2);
      expect(t3.get(0, 'c')).to.eq(3);
      expect(t3.get(0, 'd')).to.eq(7);
      expect(t3.get(0, 'e')).to.eq(8);
      expect(t3.get(1, 'a')).to.eq(4);
      expect(t3.get(1, 'b')).to.eq(5);
      expect(t3.get(1, 'c')).to.eq(6);
      expect(t3.get(1, 'd')).to.eq(undefined);
      expect(t3.get(1, 'e')).to.eq(undefined);
    });

    it('Should concatenate two tables with overlapping columns (bad idea)', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      const t2 = new p5.Table();
      t2.columns = ['c', 'd', 'e'];
      row = t2.addRow();
      row.setNum('c', 4);
      row.setNum('d', 5);
      row.setNum('e', 6);
      const t3 = t1.concat(t2, 1);
      expect(t3.columns).to.eql(['a', 'b', 'c', 'c', 'd', 'e']);
    });

    it('Should reject garbage arguments', function () {
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
      const t2 = new p5.Table();
      t2.columns = ['d', 'e'];
      row = t2.addRow();
      row.setNum('d', 7);
      row.setNum('e', 8);
      row = t2.addRow();
      row.setNum('d', 9);
      row.setNum('e', 10);
      expect(() => t1.concat(t2, 2)).to.throw(Error);
    });
  });

  describe('merge()', function () {
    it('Should require matching keys', function () {
      const left = new p5.Table();
      left.columns = ['key', 'lval'];
      let row = left.addRow();
      row.set('key', 'foo');
      row.set('lval', 1);
      const right = new p5.Table();
      right.columns = ['cay', 'rval'];
      row = right.addRow();
      row.set('cay', 'foo');
      row.set('rval', 3);
      expect(() => left.merge(right, 'key')).to.throw(Error);
    });

    it('Should merge given identical keys', function () {
      const left = new p5.Table();
      left.columns = ['key', 'lval'];
      let row = left.addRow();
      row.set('key', 'foo');
      row.set('lval', 1);
      row = left.addRow();
      row.set('key', 'foo');
      row.set('lval', 2);
      const right = new p5.Table();
      right.columns = ['key', 'rval'];
      row = right.addRow();
      row.set('key', 'foo');
      row.set('rval', 3);
      row = right.addRow();
      row.set('key', 'foo');
      row.set('rval', 4);
      const merged = left.merge(right, 'key');
      expect(merged.get(0, 'key')).to.eq('foo');
      expect(merged.get(0, 'lval')).to.eq(1);
      expect(merged.get(0, 'rval')).to.eq(3);
      expect(merged.get(1, 'key')).to.eq('foo');
      expect(merged.get(1, 'lval')).to.eq(1);
      expect(merged.get(1, 'rval')).to.eq(4);
      expect(merged.get(2, 'key')).to.eq('foo');
      expect(merged.get(2, 'lval')).to.eq(2);
      expect(merged.get(2, 'rval')).to.eq(3);
      expect(merged.get(3, 'key')).to.eq('foo');
      expect(merged.get(3, 'lval')).to.eq(2);
      expect(merged.get(3, 'rval')).to.eq(4);
    });

    it('Should merge given different keys', function () {
      const left = new p5.Table();
      left.columns = ['key', 'lval'];
      let row = left.addRow();
      row.set('key', 'foo');
      row.set('lval', 1);
      row = left.addRow();
      row.set('key', 'bar');
      row.set('lval', 2);
      const right = new p5.Table();
      right.columns = ['key', 'rval'];
      row = right.addRow();
      row.set('key', 'foo');
      row.set('rval', 3);
      row = right.addRow();
      row.set('key', 'bar');
      row.set('rval', 4);
      const merged = left.merge(right, 'key');
      expect(merged.get(0, 'key')).to.eq('foo');
      expect(merged.get(0, 'lval')).to.eq(1);
      expect(merged.get(0, 'rval')).to.eq(3);
      expect(merged.get(1, 'key')).to.eq('bar');
      expect(merged.get(1, 'lval')).to.eq(2);
      expect(merged.get(1, 'rval')).to.eq(4);
    });
  });

  describe('map()', function () {
    it('Should apply a function to each element', function () {
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
      const t2 = t1.map((x) => x ** 2);
      expect(t2.get(0, 'a')).to.eq(1);
      expect(t2.get(0, 'b')).to.eq(4);
      expect(t2.get(0, 'c')).to.eq(9);
      expect(t2.get(1, 'a')).to.eq(16);
      expect(t2.get(1, 'b')).to.eq(25);
      expect(t2.get(1, 'c')).to.eq(36);
    });
  });
});
