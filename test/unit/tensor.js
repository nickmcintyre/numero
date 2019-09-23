/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Tensor', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
  });

  afterEach(function () {
    pInst.tfc.disposeVariables();
    pInst.remove();
  });

  describe('createTensor()', function () {
    it('Should require an argument', function () {
      expect(pInst.createTensor).to.throw(Error);
    });

    it('Should accept Number arguments', function () {
      const t = pInst.createTensor(1);
      expect(t).to.be.an.instanceof(pInst.Tensor);
    });

    it('Should accept Array arguments', function () {
      const t = pInst.createTensor([0, 1]);
      expect(t).to.be.an.instanceof(pInst.Tensor);
    });

    it('Should accept p5.Vector arguments', function () {
      const v = pInst.createVector(1, 2);
      const dim = 2;
      const t = pInst.createTensor(v, dim);
      expect(t).to.be.an.instanceof(pInst.Tensor);
    });

    it('Should verify p5.Vector dimensions', function () {
      const v = pInst.createVector(1, 2);
      expect(() => pInst.createTensor(v, 1)).to.throw(Error);
      expect(() => pInst.createTensor(v, 4)).to.throw(Error);
    });

    it('Should reject garbage arguments', function () {
      expect(() => pInst.createTensor("I'm only happy when it rains")).to.throw(Error);
    });
  });

  describe('equals()', function () {
    it('Should compare a Tensor', function () {
      const t1 = pInst.createTensor([1, 0]);
      const t2 = pInst.createTensor([1, 0]);
      expect(t1.equals(t2)).to.equal(true);
    });

    it('Should compare a p5.Vector', function () {
      const t = pInst.createTensor([1, 0]);
      const v = pInst.createVector(1, 0);
      const dim = 2;
      expect(t.equals(v, dim)).to.equal(true);
    });

    it('Should compare a Number', function () {
      const t = pInst.createTensor(1);
      expect(t.equals(1)).to.equal(true);
    });

    it('Should reject garbage arguments', function () {
      const t = pInst.createTensor(1);
      expect(() => t.equals('garbage')).to.throw(Error);
    });

    it('Should return true when logically equal', function () {
      const t1 = pInst.createTensor([0, 1]);
      const t2 = pInst.createTensor([0, 1]);
      expect(t1.equals(t2)).to.equal(true);
    });

    it('Should return false when not logically equal', function () {
      const t1 = pInst.createTensor([0, 1]);
      const t2 = pInst.createTensor([1, 0]);
      const t3 = pInst.createTensor([[0, 1], [0, 1]]);
      expect(t1.equals(t2)).to.equal(false);
      expect(t1.equals(t3)).to.equal(false);
    });
  });

  describe('add()', function () {
    it('Should add a Tensor', function () {
      const t1 = pInst.createTensor([1, 2]);
      const t2 = pInst.createTensor([3, 4]);
      const t3 = pInst.createTensor([4, 6]);
      t1.add(t2);
      expect(t1.equals(t3)).to.equal(true);
    });

    it('Should add a p5.Vector', function () {
      const t1 = pInst.createTensor([1, 2]);
      const v = pInst.createVector(3, 4);
      const t2 = pInst.createTensor([4, 6]);
      const dim = 2;
      t1.add(v, dim);
      expect(t1.equals(t2)).to.equal(true);
    });

    it('Should add a Number', function () {
      const t1 = pInst.createTensor(1);
      const n = 1;
      const t2 = pInst.createTensor(2);
      t1.add(n);
      expect(t1.equals(t2)).to.equal(true);
    });

    it('Should broadcast addition when maintaining rank', function () {
      const t1 = pInst.createTensor([1, 2]);
      const t2 = pInst.createTensor(1);
      const t3 = pInst.createTensor([2, 3]);
      t1.add(t2);
      expect(t1.equals(t3)).to.equal(true);
    });

    it('Should broadcast addition when increasing rank', function () {
      const t1 = pInst.createTensor(1);
      const t2 = pInst.createTensor([1, 2]);
      const t3 = pInst.createTensor([2, 3]);
      t1.add(t2);
      expect(t1.equals(t3)).to.equal(true);
    });
  });

  describe('sub()', function () {
    it('Should subtract a Tensor', function () {
      const t1 = pInst.createTensor([3, 4]);
      const t2 = pInst.createTensor([1, 2]);
      const t3 = pInst.createTensor([2, 2]);
      t1.sub(t2);
      expect(t1.equals(t3)).to.equal(true);
    });

    it('Should subtract a p5.Vector', function () {
      const t1 = pInst.createTensor([3, 4]);
      const v = pInst.createVector(1, 2);
      const t2 = pInst.createTensor([2, 2]);
      const dim = 2;
      t1.sub(v, dim);
      expect(t1.equals(t2)).to.equal(true);
    });

    it('Should subtract a Number', function () {
      const t1 = pInst.createTensor(1);
      const n = 1;
      const t2 = pInst.createTensor(0);
      t1.sub(n);
      expect(t1.equals(t2)).to.equal(true);
    });

    it('Should broadcast subtraction when maintaining rank', function () {
      const t1 = pInst.createTensor([2, 3]);
      const t2 = pInst.createTensor(1);
      const t3 = pInst.createTensor([1, 2]);
      t1.sub(t2);
      expect(t1.equals(t3)).to.equal(true);
    });

    it('Should broadcast subtraction when increasing rank', function () {
      const t1 = pInst.createTensor(1);
      const t2 = pInst.createTensor([2, 3]);
      const t3 = pInst.createTensor([-1, -2]);
      t1.sub(t2);
      expect(t1.equals(t3)).to.equal(true);
    });
  });

  describe('mult()', function () {
    it('Should multiply by a Tensor', function () {
      const t1 = pInst.createTensor([[1, 2], [3, 4]]);
      const t2 = pInst.createTensor([[2, 2], [2, 2]]);
      const t3 = pInst.createTensor([[2, 4], [6, 8]]);
      t1.mult(t2);
      expect(t1.equals(t3)).to.equal(true);
    });

    it('Should multiply by a p5.Vector', function () {
      const t1 = pInst.createTensor([3, 4]);
      const v = pInst.createVector(1, 2);
      const t2 = pInst.createTensor([3, 8]);
      const dim = 2;
      t1.mult(v, dim);
      expect(t1.equals(t2)).to.equal(true);
    });

    it('Should multiply by a Number', function () {
      const t1 = pInst.createTensor(1);
      const n = 2;
      const t2 = pInst.createTensor(2);
      t1.mult(n);
      expect(t1.equals(t2)).to.equal(true);
    });

    it('Should broadcast multiplication when maintaining rank', function () {
      const t1 = pInst.createTensor([[1, 2], [3, 4]]);
      const t2 = pInst.createTensor(2);
      const t3 = pInst.createTensor([[2, 4], [6, 8]]);
      t1.mult(t2);
      expect(t1.equals(t3)).to.equal(true);
    });

    it('Should broadcast multiplication when increasing rank', function () {
      const t1 = pInst.createTensor(2);
      const t2 = pInst.createTensor([[1, 2], [3, 4]]);
      const t3 = pInst.createTensor([[2, 4], [6, 8]]);
      t1.mult(t2);
      expect(t1.equals(t3)).to.equal(true);
    });
  });

  describe('div()', function () {
    it('Should divide by a Tensor', function () {
      const t1 = pInst.createTensor([[1, 2], [3, 4]]);
      const t2 = pInst.createTensor([[2, 2], [2, 2]]);
      const t3 = pInst.createTensor([[0.5, 1], [1.5, 2]]);
      t1.div(t2);
      expect(t1.equals(t3)).to.equal(true);
    });

    it('Should divide by a p5.Vector', function () {
      const t1 = pInst.createTensor([2, 4]);
      const v = pInst.createVector(2, 2);
      const t2 = pInst.createTensor([1, 2]);
      const dim = 2;
      t1.div(v, dim);
      expect(t1.equals(t2)).to.equal(true);
    });

    it('Should divide by a Number', function () {
      const t1 = pInst.createTensor([2, 4]);
      const n = 2;
      const t2 = pInst.createTensor([1, 2]);
      t1.div(n);
      expect(t1.equals(t2)).to.equal(true);
    });

    it('Should broadcast division when maintaining rank', function () {
      const t1 = pInst.createTensor([[1, 2], [3, 4]]);
      const t2 = pInst.createTensor(2);
      const t3 = pInst.createTensor([[0.5, 1], [1.5, 2]]);
      t1.div(t2);
      expect(t1.equals(t3)).to.equal(true);
    });

    it('Should broadcast division when increasing rank', function () {
      const t1 = pInst.createTensor(10);
      const t2 = pInst.createTensor([[1, 2], [4, 5]]);
      const t3 = pInst.createTensor([[10, 5], [2.5, 2]]);
      t1.div(t2);
      expect(t1.equals(t3)).to.equal(true);
    });
  });

  describe('dot()', function () {
    it('Should dot with a Tensor', function () {
      const t1 = pInst.createTensor([[1, 0], [0, 1]]);
      const t2 = pInst.createTensor([1, 2]);
      t1.dot(t2);
      expect(t1.equals(t2)).to.equal(true);
    });

    it('Should dot with a p5.Vector', function () {
      const a = pInst.createTensor([[2, 0], [0, 2]]);
      const x = pInst.createVector(1, 2);
      const b = pInst.createTensor([2, 4]);
      const dim = 2;
      a.dot(x, dim);
      expect(a.equals(b)).to.equal(true);
    });
  });
});
