/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Grouping', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('groupby()', function () {
    it('Should return an object with grouped rows', function () {
      const t1 = new p5.Table();
      t1.columns = ['a', 'b', 'c'];
      let row = t1.addRow();
      row.setNum('a', 1);
      row.setNum('b', 2);
      row.setNum('c', 3);
      row = t1.addRow();
      row.setNum('a', 1);
      row.setNum('b', 5);
      row.setNum('c', 6);
      row = t1.addRow();
      row.setNum('a', 7);
      row.setNum('b', 8);
      row.setNum('c', 3);
      const t2 = t1.groupby('a');
      expect(t2.groups).to.have.keys(1, 7);
    });

    it('Should calculate the count per group', function () {
      const t1 = new p5.Table();
      t1.columns = ['Animal', 'Max Speed'];
      let row = t1.addRow();
      row.setString('Animal', 'Falcon');
      row.setNum('Max Speed', 380);
      row = t1.addRow();
      row.setString('Animal', 'Falcon');
      row.setNum('Max Speed', 370);
      row = t1.addRow();
      row.setString('Animal', 'Parrot');
      row.setNum('Max Speed', 24);
      row = t1.addRow();
      row.setString('Animal', 'Parrot');
      row.setNum('Max Speed', 26);
      const t2 = t1.groupby('Animal').count();
      expect(t2.columns).to.eql(['Max Speed', 'Animal']);
      expect(t2.get(0, 'Animal')).to.eql('Falcon');
      expect(t2.get(0, 'Max Speed')).to.eql(2);
      expect(t2.get(1, 'Animal')).to.eql('Parrot');
      expect(t2.get(1, 'Max Speed')).to.eql(2);
    });

    it('Should calculate the mean per group', function () {
      const t1 = new p5.Table();
      t1.columns = ['Animal', 'Max Speed'];
      let row = t1.addRow();
      row.setString('Animal', 'Falcon');
      row.setNum('Max Speed', 380);
      row = t1.addRow();
      row.setString('Animal', 'Falcon');
      row.setNum('Max Speed', 370);
      row = t1.addRow();
      row.setString('Animal', 'Parrot');
      row.setNum('Max Speed', 24);
      row = t1.addRow();
      row.setString('Animal', 'Parrot');
      row.setNum('Max Speed', 26);
      const t2 = t1.groupby('Animal').mean();
      expect(t2.columns).to.eql(['Max Speed', 'Animal']);
      expect(t2.get(0, 'Animal')).to.eql('Falcon');
      expect(t2.get(0, 'Max Speed')).to.eql(375);
      expect(t2.get(1, 'Animal')).to.eql('Parrot');
      expect(t2.get(1, 'Max Speed')).to.eql(25);
    });

    it('Should calculate the median per group', function () {
      const t1 = new p5.Table();
      t1.columns = ['Animal', 'Max Speed'];
      let row = t1.addRow();
      row.setString('Animal', 'Falcon');
      row.setNum('Max Speed', 380);
      row = t1.addRow();
      row.setString('Animal', 'Falcon');
      row.setNum('Max Speed', 370);
      row = t1.addRow();
      row.setString('Animal', 'Parrot');
      row.setNum('Max Speed', 24);
      row = t1.addRow();
      row.setString('Animal', 'Parrot');
      row.setNum('Max Speed', 26);
      const t2 = t1.groupby('Animal').median();
      expect(t2.columns).to.eql(['Max Speed', 'Animal']);
      expect(t2.get(0, 'Animal')).to.eql('Falcon');
      expect(t2.get(0, 'Max Speed')).to.eql(375);
      expect(t2.get(1, 'Animal')).to.eql('Parrot');
      expect(t2.get(1, 'Max Speed')).to.eql(25);
    });

    it('Should calculate the max per group', function () {
      const t1 = new p5.Table();
      t1.columns = ['Animal', 'Max Speed'];
      let row = t1.addRow();
      row.setString('Animal', 'Falcon');
      row.setNum('Max Speed', 380);
      row = t1.addRow();
      row.setString('Animal', 'Falcon');
      row.setNum('Max Speed', 370);
      row = t1.addRow();
      row.setString('Animal', 'Parrot');
      row.setNum('Max Speed', 24);
      row = t1.addRow();
      row.setString('Animal', 'Parrot');
      row.setNum('Max Speed', 26);
      const t2 = t1.groupby('Animal').max();
      expect(t2.columns).to.eql(['Max Speed', 'Animal']);
      expect(t2.get(0, 'Animal')).to.eql('Falcon');
      expect(t2.get(0, 'Max Speed')).to.eql(380);
      expect(t2.get(1, 'Animal')).to.eql('Parrot');
      expect(t2.get(1, 'Max Speed')).to.eql(26);
    });

    it('Should calculate the min per group', function () {
      const t1 = new p5.Table();
      t1.columns = ['Animal', 'Max Speed'];
      let row = t1.addRow();
      row.setString('Animal', 'Falcon');
      row.setNum('Max Speed', 380);
      row = t1.addRow();
      row.setString('Animal', 'Falcon');
      row.setNum('Max Speed', 370);
      row = t1.addRow();
      row.setString('Animal', 'Parrot');
      row.setNum('Max Speed', 24);
      row = t1.addRow();
      row.setString('Animal', 'Parrot');
      row.setNum('Max Speed', 26);
      const t2 = t1.groupby('Animal').min();
      expect(t2.columns).to.eql(['Max Speed', 'Animal']);
      expect(t2.get(0, 'Animal')).to.eql('Falcon');
      expect(t2.get(0, 'Max Speed')).to.eql(370);
      expect(t2.get(1, 'Animal')).to.eql('Parrot');
      expect(t2.get(1, 'Max Speed')).to.eql(24);
    });

    it('Should calculate the sd per group', function () {
      const t1 = new p5.Table();
      t1.columns = ['Animal', 'Max Speed'];
      let row = t1.addRow();
      row.setString('Animal', 'Falcon');
      row.setNum('Max Speed', 380);
      row = t1.addRow();
      row.setString('Animal', 'Falcon');
      row.setNum('Max Speed', 370);
      row = t1.addRow();
      row.setString('Animal', 'Parrot');
      row.setNum('Max Speed', 24);
      row = t1.addRow();
      row.setString('Animal', 'Parrot');
      row.setNum('Max Speed', 26);
      const t2 = t1.groupby('Animal').sd();
      expect(t2.columns).to.eql(['Max Speed', 'Animal']);
      expect(t2.get(0, 'Animal')).to.eql('Falcon');
      expect(t2.get(0, 'Max Speed')).to.be.closeTo(7.07, 0.01);
      expect(t2.get(1, 'Animal')).to.eql('Parrot');
      expect(t2.get(1, 'Max Speed')).to.be.closeTo(1.41, 0.01);
    });
  });
});
