/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Utilities', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('isNull()', function () {
    it('Should return a table of booleans', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.setNum('a', undefined);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t1.addRow();
      row.setNum('a', 4);
      row.setNum('b', undefined);
      row.setNum('c', 6);
      const t2 = t1.isNull();
      expect(t2.get(0, 'a')).to.be.true;
      expect(t2.get(0, 'b')).to.be.false;
      expect(t2.get(0, 'c')).to.be.false;
      expect(t2.get(1, 'a')).to.be.false;
      expect(t2.get(1, 'b')).to.be.true;
      expect(t2.get(1, 'c')).to.be.false;
    });
  });

  describe('notNull()', function () {
    it('Should return a table of booleans', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.setNum('a', undefined);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t1.addRow();
      row.setNum('a', 4);
      row.setNum('b', undefined);
      row.setNum('c', 6);
      const t2 = t1.notNull();
      expect(t2.get(0, 'a')).to.be.false;
      expect(t2.get(0, 'b')).to.be.true;
      expect(t2.get(0, 'c')).to.be.true;
      expect(t2.get(1, 'a')).to.be.true;
      expect(t2.get(1, 'b')).to.be.false;
      expect(t2.get(1, 'c')).to.be.true;
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

  describe('isin()', function () {
    it('Should return a table of booleans', function () {
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
      const t2 = t1.isin([1, 5]);
      expect(t2.get(0, 'a')).to.be.true;
      expect(t2.get(0, 'b')).to.be.false;
      expect(t2.get(0, 'c')).to.be.false;
      expect(t2.get(1, 'a')).to.be.false;
      expect(t2.get(1, 'b')).to.be.true;
      expect(t2.get(1, 'c')).to.be.false;
    });
  });

  describe('any()', function () {
    it('Should return a boolean for a single column', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.set('a', true);
      row.set('b', false);
      row.set('c', true);
      row = t1.addRow();
      row.set('a', false);
      row.set('b', false);
      row.set('c', true);
      row = t1.addRow();
      row.set('a', false);
      row.set('b', false);
      row.set('c', true);
      expect(t1.any('a')).to.be.true;
      expect(t1.any('b')).to.be.false;
      expect(t1.any('c')).to.be.true;
    });

    it('Should return booleans for all columns', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.set('a', true);
      row.set('b', false);
      row.set('c', true);
      row = t1.addRow();
      row.set('a', false);
      row.set('b', false);
      row.set('c', true);
      row = t1.addRow();
      row.set('a', false);
      row.set('b', false);
      row.set('c', true);
      const t2 = t1.any();
      expect(t2.getColumn('a')).to.eql([true]);
      expect(t2.getColumn('b')).to.eql([false]);
      expect(t2.getColumn('c')).to.eql([true]);
    });
  });

  describe('all()', function () {
    it('Should return a boolean for a single column', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.set('a', true);
      row.set('b', false);
      row.set('c', true);
      row = t1.addRow();
      row.set('a', false);
      row.set('b', false);
      row.set('c', true);
      row = t1.addRow();
      row.set('a', false);
      row.set('b', false);
      row.set('c', true);
      expect(t1.all('a')).to.be.false;
      expect(t1.all('b')).to.be.false;
      expect(t1.all('c')).to.be.true;
    });

    it('Should return booleans for all columns', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.set('a', true);
      row.set('b', false);
      row.set('c', true);
      row = t1.addRow();
      row.set('a', false);
      row.set('b', false);
      row.set('c', true);
      row = t1.addRow();
      row.set('a', false);
      row.set('b', false);
      row.set('c', true);
      const t2 = t1.all();
      expect(t2.getColumn('a')).to.eql([false]);
      expect(t2.getColumn('b')).to.eql([false]);
      expect(t2.getColumn('c')).to.eql([true]);
    });
  });

  describe('createTable()', function () {
    it('Should create a p5.Table from an object', function () {
      const t = pInst.createTable({
        x: [1, 2, 3],
        y: [4, 5, 6],
      });
      expect(t.get(0, 'x')).to.eq(1);
      expect(t.get(1, 'x')).to.eq(2);
      expect(t.get(2, 'x')).to.eq(3);
      expect(t.get(0, 'y')).to.eq(4);
      expect(t.get(1, 'y')).to.eq(5);
      expect(t.get(2, 'y')).to.eq(6);
    });

    it('Should create a p5.Table from JSON', function () {
      const t = pInst.createTable({
        x: {
          0: 1,
          1: 2,
          2: 3,
        },
        y: {
          0: 4,
          1: 5,
          2: 6,
        },
      });
      expect(t.get(0, 'x')).to.eq(1);
      expect(t.get(1, 'x')).to.eq(2);
      expect(t.get(2, 'x')).to.eq(3);
      expect(t.get(0, 'y')).to.eq(4);
      expect(t.get(1, 'y')).to.eq(5);
      expect(t.get(2, 'y')).to.eq(6);
    });
  });
});
