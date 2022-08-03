/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Core', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('toTable()', function () {
    it('Should work with objects', function () {
      const data = pInst.toTable([
        { a: 1, b: 10 },
        { a: 3, b: 12 },
        { a: 2, b: 10 },
      ]);
      expect(data).to.be.an.instanceOf(p5.Table);
    });
  });

  describe('toTidy()', function () {
    it('Should work with p5.Tables', function () {
      const data = [
        { a: 1, b: 10 },
        { a: 3, b: 12 },
        { a: 2, b: 10 },
      ];
      const table = pInst.toTable(data);
      expect(pInst.toTidy(table)).to.eql(data);
    });
  });

  describe('Conversion', function () {
    it('Should work with objects', function () {
      const data = [
        { a: 1, b: 10 },
        { a: 3, b: 12 },
        { a: 2, b: 10 },
      ];
      const results = pInst.tidy(
        data,
        pInst.mutate({ ab: (d) => d.a * d.b }),
        pInst.arrange(pInst.desc('ab')),
      );
      expect(results).to.eql(
        [
          { a: 3, b: 12, ab: 36 },
          { a: 2, b: 10, ab: 20 },
          { a: 1, b: 10, ab: 10 },
        ]
      );
    });

    it('Should work with p5.Tables', function () {
      const data = new p5.Table();
      data.columns = ['a', 'b'];
      let row = data.addRow();
      row.set('a', 1);
      row.set('b', 10);
      row = data.addRow();
      row.set('a', 3);
      row.set('b', 12);
      row = data.addRow();
      row.set('a', 2);
      row.set('b', 10);
      const results = pInst.tidy(
        data,
        pInst.mutate({ ab: (d) => d.a * d.b }),
        pInst.arrange(pInst.desc('ab')),
      );
      expect(results.get(0, 'ab')).to.eql(36);
      expect(results.get(1, 'ab')).to.eql(20);
      expect(results.get(2, 'ab')).to.eql(10);
    });
  });
});
