/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Universal Functions', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    num.tfc.disposeVariables();
    pInst.remove();
  });

  describe('Calculation', function () {
    describe('add()', function () {
      it('Should add a Tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2]);
          const t2 = pInst.createTensor([3, 4]);
          const t3 = pInst.createTensor([4, 6]);
          const t4 = num.add(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should add a p5.Vector', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const v = pInst.createVector(4, 5, 6);
          const t2 = pInst.createTensor([5, 7, 9]);
          const t3 = num.add(t1, v);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should add a Number', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(1);
          const n = 1;
          const t2 = pInst.createTensor(2);
          const t3 = num.add(t1, n);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should broadcast addition when maintaining rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2]);
          const t2 = pInst.createTensor(1);
          const t3 = pInst.createTensor([2, 3]);
          const t4 = num.add(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should broadcast addition when increasing rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(1);
          const t2 = pInst.createTensor([1, 2]);
          const t3 = pInst.createTensor([2, 3]);
          const t4 = num.add(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should work with complex tensors', function () {
        num.tidy(() => {
          const z1 = num.Tensor.complex(2, 5);
          const z2 = num.Tensor.complex(1, 3);
          const z3 = num.Tensor.complex(3, 8);
          const z4 = num.add(z1, z2);
          expect(z3.equals(z4)).to.equal(true);
        });
      });
    });

    describe('sub()', function () {
      it('Should subtract a Tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([3, 4]);
          const t2 = pInst.createTensor([1, 2]);
          const t3 = pInst.createTensor([2, 2]);
          const t4 = num.sub(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should subtract a p5.Vector', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([4, 5, 6]);
          const v = pInst.createVector(1, 2);
          const t2 = pInst.createTensor([3, 3, 6]);
          const t3 = num.sub(t1, v);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should subtract a Number', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(1);
          const n = 1;
          const t2 = pInst.createTensor(0);
          const t3 = num.sub(t1, n);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should broadcast subtraction when maintaining rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([2, 3]);
          const t2 = pInst.createTensor(1);
          const t3 = pInst.createTensor([1, 2]);
          const t4 = num.sub(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should broadcast subtraction when increasing rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(1);
          const t2 = pInst.createTensor([2, 3]);
          const t3 = pInst.createTensor([-1, -2]);
          const t4 = num.sub(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should work with complex tensors', function () {
        num.tidy(() => {
          const z1 = num.Tensor.complex(2, 5);
          const z2 = num.Tensor.complex(1, 3);
          const z3 = num.Tensor.complex(1, 2);
          const z4 = num.sub(z1, z2);
          expect(z3.equals(z4)).to.equal(true);
        });
      });
    });

    describe('mult()', function () {
      it('Should multiply by a Tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([[2, 2], [2, 2]]);
          const t3 = pInst.createTensor([[2, 4], [6, 8]]);
          const t4 = num.mult(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should multiply by a p5.Vector', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([3, 4, 5]);
          const v = pInst.createVector(1, 2);
          const t2 = pInst.createTensor([3, 8, 0]);
          const t3 = num.mult(t1, v);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should multiply by a Number', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(1);
          const n = 2;
          const t2 = pInst.createTensor(2);
          const t3 = num.mult(t1, n);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should broadcast multiplication when maintaining rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor(2);
          const t3 = pInst.createTensor([[2, 4], [6, 8]]);
          const t4 = num.mult(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should broadcast multiplication when increasing rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(2);
          const t2 = pInst.createTensor([[1, 2], [3, 4]]);
          const t3 = pInst.createTensor([[2, 4], [6, 8]]);
          const t4 = num.mult(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should work with complex tensors', function () {
        num.tidy(() => {
          const z1 = num.Tensor.complex(2, 5);
          const z2 = num.Tensor.complex(3, -2);
          const z3 = num.Tensor.complex(16, 11);
          const z4 = num.mult(z1, z2);
          expect(z3.equals(z4)).to.equal(true);
        });
      });
    });

    describe('div()', function () {
      it('Should divide by a Tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([[2, 2], [2, 2]]);
          const t3 = pInst.createTensor([[0.5, 1], [1.5, 2]]);
          const t4 = num.div(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should divide by a p5.Vector', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([2, 4, 6]);
          const v = pInst.createVector(2, 2, 2);
          const t2 = pInst.createTensor([1, 2, 3]);
          const t3 = num.div(t1, v);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should divide by a Number', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([2, 4]);
          const n = 2;
          const t2 = pInst.createTensor([1, 2]);
          const t3 = num.div(t1, n);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should broadcast division when maintaining rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor(2);
          const t3 = pInst.createTensor([[0.5, 1], [1.5, 2]]);
          const t4 = num.div(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should broadcast division when increasing rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(10);
          const t2 = pInst.createTensor([[1, 2], [4, 5]]);
          const t3 = pInst.createTensor([[10, 5], [2.5, 2]]);
          const t4 = num.div(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });
    });

    describe('dot()', function () {
      it('Should dot with a Tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 0], [0, 1]]);
          const t2 = pInst.createTensor([1, 2]);
          const t3 = num.dot(t1, t2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should dot with a p5.Vector', function () {
        num.tidy(() => {
          const a = pInst.createTensor([[2, 0, 0], [0, 2, 0], [0, 0, 2]]);
          const x = pInst.createVector(1, 2, 0);
          const b = pInst.createTensor([2, 4, 0]);
          const c = num.dot(a, x);
          expect(b.equals(c)).to.equal(true);
        });
      });
    });

    describe('abs()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([-2, 0, 1]);
          const t2 = pInst.createTensor([2, 0, 1]);
          const t3 = num.abs(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('ceil()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([0, 0.1, 1.5]);
          const t2 = pInst.createTensor([0, 1, 2]);
          const t3 = num.ceil(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('constrain()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([-2, 0, 1, 5]);
          const t2 = pInst.createTensor([-1, 0, 1, 3]);
          const t3 = num.constrain(t1, -1, 3);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('exp()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const a = [-2, 0, 1, 5];
          const t1 = pInst.createTensor(a);
          const t2 = pInst.createTensor(a.map((x) => Math.exp(x)));
          const t3 = num.exp(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('floor()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([0, 0.1, 1.5]);
          const t2 = pInst.createTensor([0, 0, 1]);
          const t3 = num.floor(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('log()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const a = [1, 2, 3];
          const t1 = pInst.createTensor(a);
          const t2 = pInst.createTensor(a.map((x) => Math.log(x)));
          const t3 = num.log(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('max()', function () {
      it('Should return a number', function () {
        num.tidy(() => {
          const t = pInst.createTensor([1, 2, 3]);
          expect(num.max(t)).to.equal(3);
        });
      });
    });

    describe('min()', function () {
      it('Should return a number', function () {
        num.tidy(() => {
          const t = pInst.createTensor([1, 2, 3]);
          expect(num.min(t)).to.equal(1);
        });
      });
    });

    describe('mod()', function () {
      it('Should accept Number arguments', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([2, 4, 5]);
          const t2 = pInst.createTensor([0, 0, 1]);
          const t3 = num.mod(t1, 2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should accept Tensor arguments', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([2, 4, 5]);
          const t2 = pInst.createTensor([2, 2, 2]);
          const t3 = pInst.createTensor([0, 0, 1]);
          const t4 = num.mod(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });
    });

    describe('pow()', function () {
      it('Should accept Number arguments', function () {
        num.tidy(() => {
          const a = [1, 2, 3];
          const t1 = pInst.createTensor(a);
          const t2 = pInst.createTensor(a.map((x) => x ** 2));
          const t3 = num.pow(t1, 2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should accept Tensor arguments', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const t2 = pInst.createTensor([1, 2, 3]);
          const t3 = num.pow(t1, t2);
          const t4 = pInst.createTensor([1, 4, 27]);
          expect(t3.equals(t4)).to.equal(true);
        });
      });
    });

    describe('round()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([2.2, 0.3, -1.4]);
          const t2 = pInst.createTensor([2, 0, -1]);
          const t3 = num.round(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('sq()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const t2 = pInst.createTensor([1, 4, 9]);
          const t3 = num.sq(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('sqrt()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 4, 9]);
          const t2 = pInst.createTensor([1, 2, 3]);
          const t3 = num.sqrt(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });
  });
});
