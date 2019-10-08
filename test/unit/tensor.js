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

    it('Should accept tfc.Tensor arguments', function () {
      const t0 = pInst.tfc.tensor([1, 2]);
      const t1 = pInst.createTensor(t0);
      expect(t1).to.be.an.instanceof(pInst.Tensor);
    })

    it('Should reject garbage arguments', function () {
      expect(() => pInst.createTensor("I'm only happy when it rains")).to.throw(Error);
    });
  });

  describe('Utilities', function () {
    describe('toString()', function () {
      it('Should return a string representation of the tensor', function () {
        const t = pInst.createTensor(1);
        const string = 'Tensor\n    1';
        expect(t.toString()).to.equal(string);
      });
    });

    describe('equals()', function () {
      it('Should compare a Tensor', function () {
        const t1 = pInst.createTensor([1, 0]);
        const t2 = pInst.createTensor([1, 0]);
        const t3 = pInst.createTensor([2, 0]);
        expect(t1.equals(t2)).to.equal(true);
        expect(t1.equals(t3)).to.equal(false);
      });

      it('Should compare a p5.Vector', function () {
        const t = pInst.createTensor([1, 0]);
        const v1 = pInst.createVector(1, 0);
        const v2 = pInst.createVector(2, 0);
        const dim = 2;
        expect(t.equals(v1, dim)).to.equal(true);
        expect(t.equals(v2, dim)).to.equal(false);
      });

      it('Should compare a Number', function () {
        const t = pInst.createTensor(1);
        expect(t.equals(1)).to.equal(true);
        expect(t.equals(2)).to.equal(false);
      });

      it('Should compare complex tensors', function () {
        const t1 = pInst.Tensor.complex(2, 5);
        const t2 = pInst.Tensor.complex(2, 5);
        const t3 = pInst.Tensor.complex(3, 5);
        expect(t1.equals(t2)).to.equal(true);
        expect(t1.equals(t3)).to.equal(false);
      });

      it('Should require consistent tensors', function () {
        const a = pInst.createTensor([3, 5]);
        const b = pInst.createTensor([[3, 5], [3, 5]]);
        const z = pInst.Tensor.complex(3, 5);
        expect(() => a.equals(z)).to.throw(Error);
        expect(() => a.equals(b)).to.throw(Error);
      });

      it('Should reject garbage arguments', function () {
        const t = pInst.createTensor(1);
        expect(() => t.equals('garbage')).to.throw(Error);
      });
    });

    describe('imag()', function () {
      it('Should return a tensor', function () {
        const t = pInst.Tensor.complex(2, 5);
        const b = pInst.createTensor(5);
        expect(b.equals(t.imag())).to.equal(true);
      });

      it('Should fail if not complex', function () {
        const t = pInst.createTensor(1);
        expect(() => t.imag()).to.throw(Error);
      });
    });

    describe('real()', function () {
      it('Should return a tensor', function () {
        const t = pInst.Tensor.complex(2, 5);
        const a = pInst.createTensor(2);
        expect(a.equals(t.real())).to.equal(true);
      });

      it('Should fail if not complex', function () {
        const t = pInst.createTensor(1);
        expect(() => t.real()).to.throw(Error);
      });
    });

    describe
  });

  describe('Calculation', function () {
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

      it('Should work with complex tensors', function () {
        const z1 = pInst.Tensor.complex(2, 5);
        const z2 = pInst.Tensor.complex(1, 3);
        const z3 = pInst.Tensor.complex(3, 8);
        z1.add(z2);
        expect(z1.equals(z3)).to.equal(true);
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

      it('Should work with complex tensors', function () {
        const z1 = pInst.Tensor.complex(2, 5);
        const z2 = pInst.Tensor.complex(1, 3);
        const z3 = pInst.Tensor.complex(1, 2);
        z1.sub(z2);
        expect(z1.equals(z3)).to.equal(true);
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

      it('Should work with complex tensors', function () {
        const z1 = pInst.Tensor.complex(2, 5);
        const z2 = pInst.Tensor.complex(3, -2);
        const z3 = pInst.Tensor.complex(16, 11);
        z1.mult(z2);
        expect(z1.equals(z3)).to.equal(true);
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

    describe('abs()', function () {
      it('Should return a tensor', function () {
        const t1 = pInst.createTensor([-2, 0, 1]);
        const t2 = pInst.createTensor([2, 0, 1]);
        const t3 = t1.abs();
        expect(t2.equals(t3)).to.equal(true);
      });
    });

    describe('ceil()', function () {
      it('Should return a tensor', function () {
        const t1 = pInst.createTensor([0, 0.1, 1.5]);
        const t2 = pInst.createTensor([0, 1, 2]);
        const t3 = t1.ceil();
        expect(t2.equals(t3)).to.equal(true);
      });
    });

    describe('constrain()', function () {
      it('Should return a tensor', function () {
        const t1 = pInst.createTensor([-2, 0, 1, 5]);
        const t2 = pInst.createTensor([-1, 0, 1, 3]);
        const t3 = t1.constrain(-1, 3);
        expect(t2.equals(t3)).to.equal(true);
      });
    });

    describe('exp()', function () {
      it('Should return a tensor', function () {
        const a = [-2, 0, 1, 5];
        const t1 = pInst.createTensor(a);
        const t2 = pInst.createTensor(a.map((x) => Math.exp(x)));
        const t3 = t1.exp();
        expect(t2.equals(t3)).to.equal(true);
      });
    });

    describe('floor()', function () {
      it('Should return a tensor', function () {
        const t1 = pInst.createTensor([0, 0.1, 1.5]);
        const t2 = pInst.createTensor([0, 0, 1]);
        const t3 = t1.floor();
        expect(t2.equals(t3)).to.equal(true);
      });
    });

    describe('log()', function () {
      it('Should return a tensor', function () {
        const a = [1, 2, 3];
        const t1 = pInst.createTensor(a);
        const t2 = pInst.createTensor(a.map((x) => Math.log(x)));
        const t3 = t1.log();
        expect(t2.equals(t3)).to.equal(true);
      });
    });

    describe('max()', function () {
      it('Should return a number', function () {
        const t = pInst.createTensor([1, 2, 3]);
        expect(t.max()).to.equal(3);
      });
    });

    describe('min()', function () {
      it('Should return a number', function () {
        const t = pInst.createTensor([1, 2, 3]);
        expect(t.min()).to.equal(1);
      });
    });

    describe('pow()', function () {
      it('Should accept Number arguments', function () {
        const a = [1, 2, 3];
        const t1 = pInst.createTensor(a);
        const t2 = pInst.createTensor(a.map((x) => x ** 2));
        const t3 = t1.pow(2);
        expect(t2.equals(t3)).to.equal(true);
      });

      it('Should accept Tensor arguments', function () {
        const t1 = pInst.createTensor([1, 2, 3]);
        const t2 = pInst.createTensor([1, 2, 3]);
        const t3 = t1.pow(t2);
        const t4 = pInst.createTensor([1, 4, 27]);
        expect(t3.equals(t4)).to.equal(true);
      });
    });

    describe('round()', function () {
      it('Should return a tensor', function () {
        const t1 = pInst.createTensor([2.2, 0.3, -1.4]);
        const t2 = pInst.createTensor([2, 0, -1]);
        const t3 = t1.round();
        expect(t2.equals(t3)).to.equal(true);
      });
    });

    describe('sq()', function () {
      it('Should return a tensor', function () {
        const t1 = pInst.createTensor([1, 2, 3]);
        const t2 = pInst.createTensor([1, 4, 9]);
        const t3 = t1.sq();
        expect(t2.equals(t3)).to.equal(true);
      });
    });

    describe('sqrt()', function () {
      it('Should return a tensor', function () {
        const t1 = pInst.createTensor([1, 4, 9]);
        const t2 = pInst.createTensor([1, 2, 3]);
        const t3 = t1.sqrt();
        expect(t2.equals(t3)).to.equal(true);
      });
    });
  });

  describe('Trigonometry', function () {
    describe('acos()', function () {
      it('Should return a tensor', function () {
        const t1 = pInst.createTensor(0);
        const t2 = pInst.createTensor(Math.PI / 2);
        const t3 = t1.acos();
        expect(t2.equals(t3)).to.equal(true);

        const t4 = pInst.createTensor(-1);
        const t5 = pInst.createTensor(Math.PI);
        const t6 = t4.acos();
        expect(t5.equals(t6)).to.equal(true);
      });
    });

    describe('asin()', function () {
      it('Should return a tensor', function () {
        const t1 = pInst.createTensor(1);
        const t2 = pInst.createTensor(Math.PI / 2);
        const t3 = t1.asin();
        expect(t2.equals(t3)).to.equal(true);

        const t4 = pInst.createTensor(-1);
        const t5 = pInst.createTensor(-Math.PI / 2);
        const t6 = t4.asin();
        expect(t5.equals(t6)).to.equal(true);
      });
    });

    describe('atan()', function () {
      it('Should return a tensor', function () {
        const a = Math.PI + Math.PI / 3;
        const t1 = pInst.createTensor(a);
        const t2 = pInst.createTensor(Math.atan(a));
        const t3 = t1.atan();
        expect(t2.equals(t3)).to.equal(true);
      });
    });

    describe('atan2()', function () {
      it('Should accept Number arguments', function () {
        const x = 15;
        const y = 90;
        const t1 = pInst.createTensor(y);
        const t2 = pInst.createTensor(Math.atan2(y, x));
        const t3 = t1.atan2(x);
        expect(t2.equals(t3)).to.equal(true);
      });

      it('Should accept Tensor arguments', function () {
        const x = 15;
        const y = 90;
        const t1 = pInst.createTensor(y);
        const t2 = pInst.createTensor(Math.atan2(y, x));
        const t3 = pInst.createTensor(x);
        const t4 = t1.atan2(t3);
        expect(t2.equals(t4)).to.equal(true);
      });
    });

    describe('cos()', function () {
      it('Should return a tensor', function () {
        const t1 = pInst.createTensor(Math.PI);
        const t2 = pInst.createTensor(-1);
        const t3 = t1.cos();
        expect(t2.equals(t3)).to.equal(true);
      });
    });

    describe('sin()', function () {
      it('Should return a tensor', function () {
        const t1 = pInst.createTensor(Math.PI / 2);
        const t2 = pInst.createTensor(1);
        const t3 = t1.sin();
        expect(t2.equals(t3)).to.equal(true);
      });
    });

    describe('tan()', function () {
      it('Should return a tensor', function () {
        const a = 1;
        const t1 = pInst.createTensor(a);
        const t2 = pInst.createTensor(Math.tan(a));
        const t3 = t1.tan();
        expect(t2.equals(t3)).to.equal(true);
      });
    });
  });

  describe('Creation Methods', function () {
    describe('complex()', function () {
      it('Should accept two Number arguments', function () {
        const real = 2;
        const imag = 5;
        const z = pInst.Tensor.complex(real, imag);
        const a = pInst.createTensor(real);
        const b = pInst.createTensor(imag);
        expect(z.real().equals(a)).to.equal(true);
        expect(z.imag().equals(b)).to.equal(true);
      });

      it('Should accept two tensor arguments', function () {
        const real = pInst.createTensor(2);
        const imag = pInst.createTensor(5);
        const z = pInst.Tensor.complex(real, imag);
        expect(z.real().equals(real)).to.equal(true);
        expect(z.imag().equals(imag)).to.equal(true);
      });

      it('Should reject garbage arguments', function () {
        const real = '2';
        const imag = '5';
        expect(() => pInst.Tensor.complex(real, imag)).to.throw(Error);
      });
    });

    describe('copy()', function () {
      it('Should return a copy of the calling tensor', function () {
        const t1 = pInst.createTensor([1, 2, 3]);
        const t2 = t1.copy();
        expect(t1.equals(t2)).to.equal(true);
      });
    });

    describe('eye()', function () {
      it('Should return an identity matrix', function () {
        const eye = [[1, 0], [0, 1]];
        const t = pInst.Tensor.eye(2);
        const x = t.tensor.arraySync();
        expect(x).to.eql(eye);
      });

      it('Should allow for rectangular identity matrices', function () {
        const eye = [[1, 0, 0], [0, 1, 0]];
        const t = pInst.Tensor.eye(2, 3);
        const x = t.tensor.arraySync();
        expect(x).to.eql(eye);
      });
    });

    describe('fill()', function () {
      it('Should return a tensor filled with a number', function () {
        const a = [[2, 2], [2, 2]];
        const t = pInst.Tensor.fill([2, 2], 2);
        const x = t.tensor.arraySync();
        expect(x).to.eql(a);
      });
    });

    describe('linspace()', function () {
      it('Should return a tensor filled with evenly spaced numbers', function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const t = pInst.Tensor.linspace(0, 9, 10);
        const x = t.tensor.arraySync();
        expect(x).to.eql(a);
      });
    });

    describe('ones()', function () {
      it('Should return a tensor filled with ones', function () {
        const a = [[1, 1], [1, 1]];
        const t = pInst.Tensor.ones([2, 2]);
        const x = t.tensor.arraySync();
        expect(x).to.eql(a);
      });
    });

    describe('random()', function () {
      it('Should return a uniformly distributed tensor', function () {
        const n = 100000;
        const t = pInst.Tensor.random([n]);
        const x = t.tensor.arraySync();
        const mean = x.reduce((a, b) => a + b) / n;
        expect(mean).to.be.closeTo(0.5, 0.01);
      });
    });

    describe('randomGaussian()', function () {
      it('Should return a normally distributed tensor', function () {
        const n = 100000;
        const t = pInst.Tensor.randomGaussian([n]);
        const x = t.tensor.arraySync();
        const mean = x.reduce((a, b) => a + b) / n;
        expect(mean).to.be.closeTo(0, 0.01);
      });

      it('Should accept mean as an argument', function () {
        const n = 100000;
        const t = pInst.Tensor.randomGaussian([n], 5);
        const x = t.tensor.arraySync();
        const mean = x.reduce((a, b) => a + b) / n;
        expect(mean).to.be.closeTo(5, 0.01);
      });

      it('Should accept mean and sd as arguments', function () {
        const n = 100000;
        const t = pInst.Tensor.randomGaussian([n], 5, 1);
        const x = t.tensor.arraySync();
        const mean = x.reduce((a, b) => a + b) / n;
        const sd = Math.sqrt(x.reduce((a, b) => a + (b - mean) ** 2) / (n - 1));
        expect(mean).to.be.closeTo(5, 0.01);
        expect(sd).to.be.closeTo(1, 0.01);
      });
    });

    describe('range()', function () {
      it('Should return a tensor filled with evenly spaced numbers', function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const t = pInst.Tensor.range(0, 9);
        const x = t.tensor.arraySync();
        expect(x).to.eql(a);
      });

      it('Should control space between numbers', function () {
        const a = [0, 2, 4, 6, 8];
        const t = pInst.Tensor.range(0, 9, 2);
        const x = t.tensor.arraySync();
        expect(x).to.eql(a);
      });
    });

    describe('zeros()', function () {
      it('Should return a tensor filled with zeros', function () {
        const a = [[0, 0], [0, 0]];
        const t = pInst.Tensor.zeros([2, 2]);
        const x = t.tensor.arraySync();
        expect(x).to.eql(a);
      });
    });
  });
});
