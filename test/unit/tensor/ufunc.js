/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Universal Functions', function () {
  let pInst;

  before(function () {
    ten.setBackend('cpu');
  });

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('Calculation', function () {
    describe('add()', function () {
      it('Should add a Tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2]);
          const t2 = pInst.createTensor([3, 4]);
          const t3 = pInst.createTensor([4, 6]);
          const t4 = ten.add(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should add a p5.Vector', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const v = pInst.createVector(4, 5, 6);
          const t2 = pInst.createTensor([5, 7, 9]);
          const t3 = ten.add(t1, v);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should add a Number', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor(1);
          const n = 1;
          const t2 = pInst.createTensor(2);
          const t3 = ten.add(t1, n);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should broadcast addition when maintaining rank', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2]);
          const t2 = pInst.createTensor(1);
          const t3 = pInst.createTensor([2, 3]);
          const t4 = ten.add(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should broadcast addition when increasing rank', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor(1);
          const t2 = pInst.createTensor([1, 2]);
          const t3 = pInst.createTensor([2, 3]);
          const t4 = ten.add(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should work with complex tensors', function () {
        ten.scope(() => {
          const z1 = ten.Tensor.complex(2, 5);
          const z2 = ten.Tensor.complex(1, 3);
          const z3 = ten.Tensor.complex(3, 8);
          const z4 = ten.add(z1, z2);
          expect(z3.equals(z4)).to.equal(true);
        });
      });
    });

    describe('sub()', function () {
      it('Should subtract a Tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([3, 4]);
          const t2 = pInst.createTensor([1, 2]);
          const t3 = pInst.createTensor([2, 2]);
          const t4 = ten.sub(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should subtract a p5.Vector', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([4, 5, 6]);
          const v = pInst.createVector(1, 2);
          const t2 = pInst.createTensor([3, 3, 6]);
          const t3 = ten.sub(t1, v);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should subtract a Number', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor(1);
          const n = 1;
          const t2 = pInst.createTensor(0);
          const t3 = ten.sub(t1, n);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should broadcast subtraction when maintaining rank', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([2, 3]);
          const t2 = pInst.createTensor(1);
          const t3 = pInst.createTensor([1, 2]);
          const t4 = ten.sub(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should broadcast subtraction when increasing rank', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor(1);
          const t2 = pInst.createTensor([2, 3]);
          const t3 = pInst.createTensor([-1, -2]);
          const t4 = ten.sub(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should work with complex tensors', function () {
        ten.scope(() => {
          const z1 = ten.Tensor.complex(2, 5);
          const z2 = ten.Tensor.complex(1, 3);
          const z3 = ten.Tensor.complex(1, 2);
          const z4 = ten.sub(z1, z2);
          expect(z3.equals(z4)).to.equal(true);
        });
      });
    });

    describe('mult()', function () {
      it('Should multiply by a Tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([[2, 2], [2, 2]]);
          const t3 = pInst.createTensor([[2, 4], [6, 8]]);
          const t4 = ten.mult(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should multiply by a p5.Vector', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([3, 4, 5]);
          const v = pInst.createVector(1, 2);
          const t2 = pInst.createTensor([3, 8, 0]);
          const t3 = ten.mult(t1, v);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should multiply by a Number', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor(1);
          const n = 2;
          const t2 = pInst.createTensor(2);
          const t3 = ten.mult(t1, n);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should broadcast multiplication when maintaining rank', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor(2);
          const t3 = pInst.createTensor([[2, 4], [6, 8]]);
          const t4 = ten.mult(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should broadcast multiplication when increasing rank', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor(2);
          const t2 = pInst.createTensor([[1, 2], [3, 4]]);
          const t3 = pInst.createTensor([[2, 4], [6, 8]]);
          const t4 = ten.mult(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should work with complex tensors', function () {
        ten.scope(() => {
          const z1 = ten.Tensor.complex(2, 5);
          const z2 = ten.Tensor.complex(3, -2);
          const z3 = ten.Tensor.complex(16, 11);
          const z4 = ten.mult(z1, z2);
          expect(z3.equals(z4)).to.equal(true);
        });
      });
    });

    describe('div()', function () {
      it('Should divide by a Tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([[2, 2], [2, 2]]);
          const t3 = pInst.createTensor([[0.5, 1], [1.5, 2]]);
          const t4 = ten.div(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should divide by a p5.Vector', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([2, 4, 6]);
          const v = pInst.createVector(2, 2, 2);
          const t2 = pInst.createTensor([1, 2, 3]);
          const t3 = ten.div(t1, v);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should divide by a Number', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([2, 4]);
          const n = 2;
          const t2 = pInst.createTensor([1, 2]);
          const t3 = ten.div(t1, n);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should broadcast division when maintaining rank', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor(2);
          const t3 = pInst.createTensor([[0.5, 1], [1.5, 2]]);
          const t4 = ten.div(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should broadcast division when increasing rank', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor(10);
          const t2 = pInst.createTensor([[1, 2], [4, 5]]);
          const t3 = pInst.createTensor([[10, 5], [2.5, 2]]);
          const t4 = ten.div(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });
    });

    describe('dot()', function () {
      it('Should dot with a Tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 0], [0, 1]]);
          const t2 = pInst.createTensor([1, 2]);
          const t3 = ten.dot(t1, t2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should dot with a p5.Vector', function () {
        ten.scope(() => {
          const a = pInst.createTensor([[2, 0, 0], [0, 2, 0], [0, 0, 2]]);
          const x = pInst.createVector(1, 2, 0);
          const b = pInst.createTensor([2, 4, 0]);
          const c = ten.dot(a, x);
          expect(b.equals(c)).to.equal(true);
        });
      });
    });

    describe('abs()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([-2, 0, 1]);
          const t2 = pInst.createTensor([2, 0, 1]);
          const t3 = ten.abs(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('ceil()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([0, 0.1, 1.5]);
          const t2 = pInst.createTensor([0, 1, 2]);
          const t3 = ten.ceil(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('constrain()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([-2, 0, 1, 5]);
          const t2 = pInst.createTensor([-1, 0, 1, 3]);
          const t3 = ten.constrain(t1, -1, 3);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('exp()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const a = [-2, 0, 1, 5];
          const t1 = pInst.createTensor(a);
          const t2 = pInst.createTensor(a.map((x) => Math.exp(x)));
          const t3 = ten.exp(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('floor()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([0, 0.1, 1.5]);
          const t2 = pInst.createTensor([0, 0, 1]);
          const t3 = ten.floor(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('log()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const a = [1, 2, 3];
          const t1 = pInst.createTensor(a);
          const t2 = pInst.createTensor(a.map((x) => Math.log(x)));
          const t3 = ten.log(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('max()', function () {
      it('Should return a number', function () {
        ten.scope(() => {
          const t = pInst.createTensor([1, 2, 3]);
          expect(ten.max(t)).to.equal(3);
        });
      });
    });

    describe('min()', function () {
      it('Should return a number', function () {
        ten.scope(() => {
          const t = pInst.createTensor([1, 2, 3]);
          expect(ten.min(t)).to.equal(1);
        });
      });
    });

    describe('mod()', function () {
      it('Should accept Number arguments', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([2, 4, 5]);
          const t2 = pInst.createTensor([0, 0, 1]);
          const t3 = ten.mod(t1, 2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should accept Tensor arguments', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([2, 4, 5]);
          const t2 = pInst.createTensor([2, 2, 2]);
          const t3 = pInst.createTensor([0, 0, 1]);
          const t4 = ten.mod(t1, t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });
    });

    describe('pow()', function () {
      it('Should accept Number arguments', function () {
        ten.scope(() => {
          const a = [1, 2, 3];
          const t1 = pInst.createTensor(a);
          const t2 = pInst.createTensor(a.map((x) => x ** 2));
          const t3 = ten.pow(t1, 2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should accept Tensor arguments', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const t2 = pInst.createTensor([1, 2, 3]);
          const t3 = ten.pow(t1, t2);
          const t4 = pInst.createTensor([1, 4, 27]);
          expect(t3.equals(t4)).to.equal(true);
        });
      });
    });

    describe('round()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([2.2, 0.3, -1.4]);
          const t2 = pInst.createTensor([2, 0, -1]);
          const t3 = ten.round(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('sq()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const t2 = pInst.createTensor([1, 4, 9]);
          const t3 = ten.sq(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('sqrt()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 4, 9]);
          const t2 = pInst.createTensor([1, 2, 3]);
          const t3 = ten.sqrt(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });
  });

  describe('Reduction', function () {
    describe('sum()', function () {
      it('Should return a tensor', function () {
        const t1 = pInst.createTensor([1, 2, 3]);
        const t2 = pInst.createTensor(6);
        const t3 = ten.sum(t1);
        expect(t2.equals(t3)).to.equal(true);
      });

      it('Should allow axes to be specified', function () {
        const t1 = pInst.createTensor([[1, 2], [3, 4]]);
        const t2 = pInst.createTensor([3, 7]);
        const t3 = ten.sum(t1, 1);
        expect(t2.equals(t3)).to.equal(true);
      });
    });
  });

  describe('Trigonometry', function () {
    describe('acos()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor(0);
          const t2 = pInst.createTensor(Math.PI / 2);
          const t3 = ten.acos(t1);
          expect(t2.equals(t3)).to.equal(true);

          const t4 = pInst.createTensor(-1);
          const t5 = pInst.createTensor(Math.PI);
          const t6 = t4.acos();
          expect(t5.equals(t6)).to.equal(true);
        });
      });
    });

    describe('asin()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor(1);
          const t2 = pInst.createTensor(Math.PI / 2);
          const t3 = ten.asin(t1);
          expect(t2.equals(t3)).to.equal(true);

          const t4 = pInst.createTensor(-1);
          const t5 = pInst.createTensor(-Math.PI / 2);
          const t6 = ten.asin(t4);
          expect(t5.equals(t6)).to.equal(true);
        });
      });
    });

    describe('atan()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const a = Math.PI + Math.PI / 3;
          const t1 = pInst.createTensor(a);
          const t2 = pInst.createTensor(Math.atan(a));
          const t3 = ten.atan(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('atan2()', function () {
      it('Should accept Number arguments', function () {
        ten.scope(() => {
          const x = 15;
          const y = 90;
          const t1 = pInst.createTensor(y);
          const t2 = pInst.createTensor(Math.atan2(y, x));
          const t3 = ten.atan2(t1, x);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should accept Tensor arguments', function () {
        ten.scope(() => {
          const x = 15;
          const y = 90;
          const t1 = pInst.createTensor(y);
          const t2 = pInst.createTensor(Math.atan2(y, x));
          const t3 = pInst.createTensor(x);
          const t4 = ten.atan2(t1, t3);
          expect(t2.equals(t4)).to.equal(true);
        });
      });
    });

    describe('cos()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor(Math.PI);
          const t2 = pInst.createTensor(-1);
          const t3 = ten.cos(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('sin()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor(Math.PI / 2);
          const t2 = pInst.createTensor(1);
          const t3 = ten.sin(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('tan()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const a = 1;
          const t1 = pInst.createTensor(a);
          const t2 = pInst.createTensor(Math.tan(a));
          const t3 = ten.tan(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });
  });

  describe('Creation Methods', function () {
    describe('complex()', function () {
      it('Should accept two Number arguments', function () {
        ten.scope(() => {
          const real = 2;
          const imag = 5;
          const z = ten.complex(real, imag);
          const a = pInst.createTensor(real);
          const b = pInst.createTensor(imag);
          expect(z.real().equals(a)).to.equal(true);
          expect(z.imag().equals(b)).to.equal(true);
        });
      });

      it('Should accept two Array arguments', function () {
        const real = [1, 0];
        const imag = [0, 0];
        const z = ten.complex(real, imag);
        expect(z.real().equals(real)).to.equal(true);
        expect(z.imag().equals(imag)).to.equal(true);
      });

      it('Should accept two tensor arguments', function () {
        ten.scope(() => {
          const real = pInst.createTensor(2);
          const imag = pInst.createTensor(5);
          const z = ten.complex(real, imag);
          expect(z.real().equals(real)).to.equal(true);
          expect(z.imag().equals(imag)).to.equal(true);
        });
      });

      it('Should reject garbage arguments', function () {
        ten.scope(() => {
          const real = '2';
          const imag = '5';
          expect(() => ten.complex(real, imag)).to.throw(Error);
        });
      });
    });

    describe('copy()', function () {
      it('Should return a copy of the calling tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const t2 = ten.copy(t1);
          expect(t1.equals(t2)).to.equal(true);
        });
      });
    });

    describe('eye()', function () {
      it('Should return an identity matrix', function () {
        ten.scope(() => {
          const eye = [[1, 0], [0, 1]];
          const t = ten.eye(2);
          const x = t.arraySync();
          expect(x).to.eql(eye);
        });
      });

      it('Should allow for rectangular identity matrices', function () {
        ten.scope(() => {
          const eye = [[1, 0, 0], [0, 1, 0]];
          const t = ten.eye(2, 3);
          const x = t.arraySync();
          expect(x).to.eql(eye);
        });
      });
    });

    describe('fill()', function () {
      it('Should return a tensor filled with a number', function () {
        ten.scope(() => {
          const a = [[2, 2], [2, 2]];
          const t = ten.fill([2, 2], 2);
          const x = t.arraySync();
          expect(x).to.eql(a);
        });
      });
    });

    describe('linspace()', function () {
      it('Should return a tensor filled with evenly spaced numbers', function () {
        ten.scope(() => {
          const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          const t = ten.linspace(0, 9, 10);
          const x = t.arraySync();
          expect(x).to.eql(a);
        });
      });
    });

    describe('ones()', function () {
      it('Should return a tensor filled with ones', function () {
        ten.scope(() => {
          const a = [[1, 1], [1, 1]];
          const t = ten.ones([2, 2]);
          const x = t.arraySync();
          expect(x).to.eql(a);
        });
      });
    });

    describe('random()', function () {
      it('Should return a uniformly distributed tensor', function () {
        ten.scope(() => {
          const n = 100000;
          const t = ten.random([n]);
          const x = t.arraySync();
          const mean = x.reduce((a, b) => a + b) / n;
          expect(mean).to.be.closeTo(0.5, 0.01);
        });
      });
    });

    describe('randomGaussian()', function () {
      it('Should return a normally distributed tensor', function () {
        ten.scope(() => {
          const n = 100000;
          const t = ten.Tensor.randomGaussian([n]);
          const x = t.arraySync();
          const mean = x.reduce((a, b) => a + b) / n;
          expect(mean).to.be.closeTo(0, 0.01);
        });
      });

      it('Should accept mean as an argument', function () {
        ten.scope(() => {
          const n = 100000;
          const t = ten.Tensor.randomGaussian([n], 5);
          const x = t.arraySync();
          const mean = x.reduce((a, b) => a + b) / n;
          expect(mean).to.be.closeTo(5, 0.01);
        });
      });

      it('Should accept mean and sd as arguments', function () {
        ten.scope(() => {
          const n = 100000;
          const t = ten.Tensor.randomGaussian([n], 5, 1);
          const x = t.arraySync();
          const mean = x.reduce((a, b) => a + b) / n;
          const sd = Math.sqrt(x.reduce((a, b) => a + (b - mean) ** 2) / n);
          expect(mean).to.be.closeTo(5, 0.01);
          expect(sd).to.be.closeTo(1, 0.01);
        });
      });
    });

    describe('range()', function () {
      it('Should return a tensor filled with evenly spaced numbers', function () {
        ten.scope(() => {
          const a = [0, 1, 2, 3, 4, 5, 6, 7, 8];
          const t = ten.range(0, 9);
          const x = t.arraySync();
          expect(x).to.eql(a);
        });
      });

      it('Should control space between numbers', function () {
        ten.scope(() => {
          const a = [0, 2, 4, 6, 8];
          const t = ten.range(0, 9, 2);
          const x = t.arraySync();
          expect(x).to.eql(a);
        });
      });
    });

    describe('zeros()', function () {
      it('Should return a tensor filled with zeros', function () {
        ten.scope(() => {
          const a = [[0, 0], [0, 0]];
          const t = ten.Tensor.zeros([2, 2]);
          const x = t.arraySync();
          expect(x).to.eql(a);
        });
      });
    });
  });

  describe('Transformations', function () {
    describe('flatten()', function () {
      it('Should return a 1d tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([1, 2, 3, 4]);
          const t3 = ten.flatten(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('pad()', function () {
      it('Should pad with zeros', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2, 3, 4]);
          const t2 = pInst.createTensor([0, 1, 2, 3, 4, 0, 0]);
          const t3 = ten.pad(t1, [[1, 2]]);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should pad with constant values', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2, 3, 4]);
          const t2 = pInst.createTensor([2, 1, 2, 3, 4, 2, 2]);
          const t3 = ten.pad(t1, [[1, 2]], 2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('reshape()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2, 3, 4]);
          const t2 = pInst.createTensor([[1, 2], [3, 4]]);
          const t3 = ten.reshape(t1, [2, 2]);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });
  });

  describe('Slicing and Joining', function () {
    describe('concat()', function () {
      it('Should fail with too few tensors', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2]);
          expect(() => ten.concat([t1])).to.throw(Error);
        });
      });

      it('Should work with 1d tensors', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2]);
          const t2 = pInst.createTensor([3, 4]);
          const t3 = pInst.createTensor([1, 2, 3, 4]);
          const t4 = ten.concat([t1, t2]);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should work with nd tensors', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 2], [10, 20]]);
          const t2 = pInst.createTensor([[3, 4], [30, 40]]);
          const t3 = pInst.createTensor([[1, 2, 3, 4], [10, 20, 30, 40]]);
          const t4 = ten.concat([t1, t2], 1);
          expect(t3.equals(t4)).to.equal(true);
        });
      });
    });

    describe('reverse()', function () {
      it('Should work with 1d tensors', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const t2 = pInst.createTensor([3, 2, 1]);
          const t3 = ten.reverse(t1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should work with nd tensors', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([[2, 1], [4, 3]]);
          const t3 = ten.reverse(t1, 1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('slice()', function () {
      it('Should work with 1d tensors', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2, 3, 4]);
          const t2 = pInst.createTensor([2, 3]);
          const t3 = ten.slice(t1, [1], [2]);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should work with nd tensors', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([[3, 4]]);
          const t3 = ten.slice(t1, [1, 0], [1, 2]);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('split()', function () {
      it('Should return an array of tensors', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 2, 3, 4], [5, 6, 7, 8]]);
          const t2 = pInst.createTensor([[1, 2], [5, 6]]);
          const t3 = pInst.createTensor([[3, 4], [7, 8]]);
          const [a, b] = ten.split(t1, 2, 1);
          expect(t2.equals(a)).to.equal(true);
          expect(t3.equals(b)).to.equal(true);
        });
      });

      it('Should allow axes to be specified', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 2, 3, 4], [5, 6, 7, 8]]);
          const t2 = pInst.createTensor([[1], [5]]);
          const t3 = pInst.createTensor([[2, 3], [6, 7]]);
          const t4 = pInst.createTensor([[4], [8]]);
          const [a, b, c] = ten.split(t1, [1, 2, 1], 1);
          expect(t2.equals(a)).to.equal(true);
          expect(t3.equals(b)).to.equal(true);
          expect(t4.equals(c)).to.equal(true);
        });
      });
    });

    describe('stack()', function () {
      it('Should return a tensor', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2]);
          const t2 = pInst.createTensor([3, 4]);
          const t3 = pInst.createTensor([5, 6]);
          const t4 = pInst.createTensor([[1, 2], [3, 4], [5, 6]]);
          const t5 = ten.stack([t1, t2, t3]);
          expect(t4.equals(t5)).to.equal(true);
        });
      });

      it('Should allow axes to be specified', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([1, 2]);
          const t2 = pInst.createTensor([3, 4]);
          const t3 = pInst.createTensor([5, 6]);
          const t4 = pInst.createTensor([[1, 3, 5], [2, 4, 6]]);
          const t5 = ten.stack([t1, t2, t3], 1);
          expect(t4.equals(t5)).to.equal(true);
        });
      });
    });

    describe('unstack()', function () {
      it('Should return an array of tensors', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([1, 2]);
          const t3 = pInst.createTensor([3, 4]);
          const a1 = [t2, t3];
          const a2 = ten.unstack(t1);
          expect(a1[0].equals(a2[0])).to.equal(true);
          expect(a1[1].equals(a2[1])).to.equal(true);
        });
      });

      it('Should allow axes to be specified', function () {
        ten.scope(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([1, 3]);
          const t3 = pInst.createTensor([2, 4]);
          const a1 = [t2, t3];
          const a2 = ten.unstack(t1, 1);
          expect(a1[0].equals(a2[0])).to.equal(true);
          expect(a1[1].equals(a2[1])).to.equal(true);
        });
      });
    });

    describe('sort()', function () {
      it('Should return a sorted tensor', function () {
        const t1 = pInst.createTensor([1, 2, 3]);
        const t2 = ten.sort(t1);
        const t3 = pInst.createTensor([3, 2, 1]);
        expect(t2.equals(t3)).to.equal(true);
      });
    });
  });

  describe('Spectral', function () {
    describe('fft()', function () {
      it('Should compute an FFT of a complex tensor', function () {
        const x = ten.complex([1, 0], [0, 0]);
        const X = ten.fft(x);
        const Y = ten.complex([1, 1], [0, 0]);
        expect(X.equals(Y)).to.equal(true);
      });
    });
  });
});
