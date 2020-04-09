/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Tensor', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('createTensor()', function () {
    it('Should require an argument', function () {
      expect(pInst.createTensor).to.throw(Error);
    });

    it('Should accept Number arguments', function () {
      num.tidy(() => {
        const t = pInst.createTensor(1);
        expect(t).to.be.an.instanceof(num.Tensor);
      });
    });

    it('Should accept Array arguments', function () {
      num.tidy(() => {
        const t = pInst.createTensor([0, 1]);
        expect(t).to.be.an.instanceof(num.Tensor);
      });
    });

    it('Should accept p5.Vector arguments', function () {
      num.tidy(() => {
        const v = pInst.createVector(1, 2);
        const t = pInst.createTensor(v);
        expect(t).to.be.an.instanceof(num.Tensor);
      });
    });

    it('Should accept tfc.Tensor arguments', function () {
      num.tidy(() => {
        const t0 = num.tfc.tensor([1, 2]);
        const t1 = pInst.createTensor(t0);
        expect(t1).to.be.an.instanceof(num.Tensor);
      });
    })

    it('Should reject garbage arguments', function () {
      num.tidy(() => {
        expect(() => pInst.createTensor("I'm only happy when it rains")).to.throw(Error);
      });
    });
  });

  describe('Utilities', function () {
    describe('toString()', function () {
      it('Should return a string representation of the tensor', function () {
        num.tidy(() => {
          const t = pInst.createTensor(1);
          const string = 'Tensor\n    1';
          expect(t.toString()).to.equal(string);
        });
      });
    });

    describe('array()', function () {
      it('Should return a promise', function (done) {
        num.tidy(() => {
          const a = [[1, 2], [3, 4]];
          const t = pInst.createTensor(a);
          const vals = t.array();
          vals.then(function (result) {
            expect(result).to.eql(a);
            done();
          }, done);
        });
      });
    });

    describe('arraySync()', function () {
      it('Should return an array', function () {
        num.tidy(() => {
          const a = [[1, 2], [3, 4]];
          const t = pInst.createTensor(a);
          expect(t.arraySync()).to.eql(a);
        });
      });
    });

    describe('toVector()', function () {
      it('Should work with rank 1 tensors', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const a1 = pInst.createVector(1, 2, 3);
          const a2 = t1.toVector();
          expect(a2).to.be.an.instanceof(p5.Vector);
          expect(a1.equals(a2)).to.equal(true);
        });
      });

      it('Should throw an error for rank 2 and above', function () {
        num.tidy(() => {
          const t = pInst.createTensor([[1, 2], [3, 4]]);
          expect(() => t.toVector()).to.throw(Error);
        });
      });
    });

    describe('dispose()', function () {
      it('Should dispose of tensors from memory', function () {
        num.tidy(() => {
          const t = pInst.createTensor(1);
          t.dispose();
          expect(t.tensor.isDisposed).to.equal(true);
        });
      });
    });

    describe('equals()', function () {
      it('Should compare a Tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 0]);
          const t2 = pInst.createTensor([1, 0]);
          const t3 = pInst.createTensor([2, 0]);
          expect(t1.equals(t2)).to.equal(true);
          expect(t1.equals(t3)).to.equal(false);
        });
      });

      it('Should compare a p5.Vector', function () {
        num.tidy(() => {
          const t = pInst.createTensor([1, 0, 0]);
          const v1 = pInst.createVector(1, 0);
          const v2 = pInst.createVector(2, 0);
          expect(t.equals(v1)).to.equal(true);
          expect(t.equals(v2)).to.equal(false);
        });
      });

      it('Should compare a Number', function () {
        num.tidy(() => {
          const t = pInst.createTensor(1);
          expect(t.equals(1)).to.equal(true);
          expect(t.equals(2)).to.equal(false);
        });
      });

      it('Should compare complex tensors', function () {
        num.tidy(() => {
          const t1 = num.Tensor.complex(2, 5);
          const t2 = num.Tensor.complex(2, 5);
          const t3 = num.Tensor.complex(3, 5);
          expect(t1.equals(t2)).to.equal(true);
          expect(t1.equals(t3)).to.equal(false);
        });
      });

      it('Should require consistent tensors', function () {
        num.tidy(() => {
          const a = pInst.createTensor([3, 5]);
          const b = pInst.createTensor([[3, 5], [3, 5]]);
          const z = num.Tensor.complex(3, 5);
          expect(() => a.equals(z)).to.throw(Error);
          expect(() => a.equals(b)).to.throw(Error);
        });
      });

      it('Should reject garbage arguments', function () {
        num.tidy(() => {
          const t = pInst.createTensor(1);
          expect(() => t.equals('garbage')).to.throw(Error);
        });
      });
    });

    describe('imag()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t = num.Tensor.complex(2, 5);
          const b = pInst.createTensor(5);
          expect(b.equals(t.imag())).to.equal(true);
        });
      });

      it('Should fail if not complex', function () {
        num.tidy(() => {
          const t = pInst.createTensor(1);
          expect(() => t.imag()).to.throw(Error);
        });
      });
    });

    describe('real()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t = num.Tensor.complex(2, 5);
          const a = pInst.createTensor(2);
          expect(a.equals(t.real())).to.equal(true);
        });
      });

      it('Should fail if not complex', function () {
        num.tidy(() => {
          const t = pInst.createTensor(1);
          expect(() => t.real()).to.throw(Error);
        });
      });
    });
  });

  describe('Calculation', function () {
    describe('add()', function () {
      it('Should add a Tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2]);
          const t2 = pInst.createTensor([3, 4]);
          const t3 = pInst.createTensor([4, 6]);
          const t4 = t1.add(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should add a p5.Vector', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const v = pInst.createVector(4, 5, 6);
          const t2 = pInst.createTensor([5, 7, 9]);
          const t3 = t1.add(v);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should add a Number', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(1);
          const n = 1;
          const t2 = pInst.createTensor(2);
          const t3 = t1.add(n);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should broadcast addition when maintaining rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2]);
          const t2 = pInst.createTensor(1);
          const t3 = pInst.createTensor([2, 3]);
          const t4 = t1.add(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should broadcast addition when increasing rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(1);
          const t2 = pInst.createTensor([1, 2]);
          const t3 = pInst.createTensor([2, 3]);
          const t4 = t1.add(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should work with complex tensors', function () {
        num.tidy(() => {
          const z1 = num.Tensor.complex(2, 5);
          const z2 = num.Tensor.complex(1, 3);
          const z3 = num.Tensor.complex(3, 8);
          const z4 = z1.add(z2);
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
          const t4 = t1.sub(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should subtract a p5.Vector', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([4, 5, 6]);
          const v = pInst.createVector(1, 2);
          const t2 = pInst.createTensor([3, 3, 6]);
          const t3 = t1.sub(v);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should subtract a Number', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(1);
          const n = 1;
          const t2 = pInst.createTensor(0);
          const t3 = t1.sub(n);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should broadcast subtraction when maintaining rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([2, 3]);
          const t2 = pInst.createTensor(1);
          const t3 = pInst.createTensor([1, 2]);
          const t4 = t1.sub(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should broadcast subtraction when increasing rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(1);
          const t2 = pInst.createTensor([2, 3]);
          const t3 = pInst.createTensor([-1, -2]);
          const t4 = t1.sub(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should work with complex tensors', function () {
        num.tidy(() => {
          const z1 = num.Tensor.complex(2, 5);
          const z2 = num.Tensor.complex(1, 3);
          const z3 = num.Tensor.complex(1, 2);
          const z4 = z1.sub(z2);
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
          const t4 = t1.mult(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should multiply by a p5.Vector', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([3, 4, 5]);
          const v = pInst.createVector(1, 2);
          const t2 = pInst.createTensor([3, 8, 0]);
          const t3 = t1.mult(v);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should multiply by a Number', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(1);
          const n = 2;
          const t2 = pInst.createTensor(2);
          const t3 = t1.mult(n);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should broadcast multiplication when maintaining rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor(2);
          const t3 = pInst.createTensor([[2, 4], [6, 8]]);
          const t4 = t1.mult(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should broadcast multiplication when increasing rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(2);
          const t2 = pInst.createTensor([[1, 2], [3, 4]]);
          const t3 = pInst.createTensor([[2, 4], [6, 8]]);
          const t4 = t1.mult(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should work with complex tensors', function () {
        num.tidy(() => {
          const z1 = num.Tensor.complex(2, 5);
          const z2 = num.Tensor.complex(3, -2);
          const z3 = num.Tensor.complex(16, 11);
          const z4 = z1.mult(z2);
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
          const t4 = t1.div(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should divide by a p5.Vector', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([2, 4, 6]);
          const v = pInst.createVector(2, 2, 2);
          const t2 = pInst.createTensor([1, 2, 3]);
          const t3 = t1.div(v);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should divide by a Number', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([2, 4]);
          const n = 2;
          const t2 = pInst.createTensor([1, 2]);
          const t3 = t1.div(n);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should broadcast division when maintaining rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor(2);
          const t3 = pInst.createTensor([[0.5, 1], [1.5, 2]]);
          const t4 = t1.div(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should broadcast division when increasing rank', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(10);
          const t2 = pInst.createTensor([[1, 2], [4, 5]]);
          const t3 = pInst.createTensor([[10, 5], [2.5, 2]]);
          const t4 = t1.div(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });
    });

    describe('dot()', function () {
      it('Should dot with a Tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 0], [0, 1]]);
          const t2 = pInst.createTensor([1, 2]);
          const t3 = t1.dot(t2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should dot with a p5.Vector', function () {
        num.tidy(() => {
          const a = pInst.createTensor([[2, 0, 0], [0, 2, 0], [0, 0, 2]]);
          const x = pInst.createVector(1, 2, 0);
          const b = pInst.createTensor([2, 4, 0]);
          const c = a.dot(x);
          expect(b.equals(c)).to.equal(true);
        });
      });
    });

    describe('abs()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([-2, 0, 1]);
          const t2 = pInst.createTensor([2, 0, 1]);
          const t3 = t1.abs();
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('ceil()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([0, 0.1, 1.5]);
          const t2 = pInst.createTensor([0, 1, 2]);
          const t3 = t1.ceil();
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('constrain()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([-2, 0, 1, 5]);
          const t2 = pInst.createTensor([-1, 0, 1, 3]);
          const t3 = t1.constrain(-1, 3);
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
          const t3 = t1.exp();
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('floor()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([0, 0.1, 1.5]);
          const t2 = pInst.createTensor([0, 0, 1]);
          const t3 = t1.floor();
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
          const t3 = t1.log();
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('max()', function () {
      it('Should return a number', function () {
        num.tidy(() => {
          const t = pInst.createTensor([1, 2, 3]);
          expect(t.max()).to.equal(3);
        });
      });
    });

    describe('min()', function () {
      it('Should return a number', function () {
        num.tidy(() => {
          const t = pInst.createTensor([1, 2, 3]);
          expect(t.min()).to.equal(1);
        });
      });
    });

    describe('mod()', function () {
      it('Should accept Number arguments', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([2, 4, 5]);
          const t2 = pInst.createTensor([0, 0, 1]);
          const t3 = t1.mod(2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should accept Tensor arguments', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([2, 4, 5]);
          const t2 = pInst.createTensor([2, 2, 2]);
          const t3 = pInst.createTensor([0, 0, 1]);
          const t4 = t1.mod(t2);
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
          const t3 = t1.pow(2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should accept Tensor arguments', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const t2 = pInst.createTensor([1, 2, 3]);
          const t3 = t1.pow(t2);
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
          const t3 = t1.round();
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('sq()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const t2 = pInst.createTensor([1, 4, 9]);
          const t3 = t1.sq();
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('sqrt()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 4, 9]);
          const t2 = pInst.createTensor([1, 2, 3]);
          const t3 = t1.sqrt();
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
        const t3 = t1.sum();
        expect(t2.equals(t3)).to.equal(true);
      });

      it('Should allow axes to be specified', function () {
        const t1 = pInst.createTensor([[1, 2], [3, 4]]);
        const t2 = pInst.createTensor([3, 7]);
        const t3 = t1.sum(1);
        expect(t2.equals(t3)).to.equal(true);
      });
    });
  });

  describe('Trigonometry', function () {
    describe('acos()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
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
    });

    describe('asin()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
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
    });

    describe('atan()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const a = Math.PI + Math.PI / 3;
          const t1 = pInst.createTensor(a);
          const t2 = pInst.createTensor(Math.atan(a));
          const t3 = t1.atan();
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('atan2()', function () {
      it('Should accept Number arguments', function () {
        num.tidy(() => {
          const x = 15;
          const y = 90;
          const t1 = pInst.createTensor(y);
          const t2 = pInst.createTensor(Math.atan2(y, x));
          const t3 = t1.atan2(x);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should accept Tensor arguments', function () {
        num.tidy(() => {
          const x = 15;
          const y = 90;
          const t1 = pInst.createTensor(y);
          const t2 = pInst.createTensor(Math.atan2(y, x));
          const t3 = pInst.createTensor(x);
          const t4 = t1.atan2(t3);
          expect(t2.equals(t4)).to.equal(true);
        });
      });
    });

    describe('cos()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(Math.PI);
          const t2 = pInst.createTensor(-1);
          const t3 = t1.cos();
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('sin()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor(Math.PI / 2);
          const t2 = pInst.createTensor(1);
          const t3 = t1.sin();
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('tan()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const a = 1;
          const t1 = pInst.createTensor(a);
          const t2 = pInst.createTensor(Math.tan(a));
          const t3 = t1.tan();
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });
  });

  describe('Creation Methods', function () {
    describe('complex()', function () {
      it('Should accept two Number arguments', function () {
        num.tidy(() => {
          const real = 2;
          const imag = 5;
          const z = num.Tensor.complex(real, imag);
          const a = pInst.createTensor(real);
          const b = pInst.createTensor(imag);
          expect(z.real().equals(a)).to.equal(true);
          expect(z.imag().equals(b)).to.equal(true);
        });
      });

      it('Should accept two tensor arguments', function () {
        num.tidy(() => {
          const real = pInst.createTensor(2);
          const imag = pInst.createTensor(5);
          const z = num.Tensor.complex(real, imag);
          expect(z.real().equals(real)).to.equal(true);
          expect(z.imag().equals(imag)).to.equal(true);
        });
      });

      it('Should reject garbage arguments', function () {
        num.tidy(() => {
          const real = '2';
          const imag = '5';
          expect(() => num.Tensor.complex(real, imag)).to.throw(Error);
        });
      });
    });

    describe('copy()', function () {
      it('Should return a copy of the calling tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const t2 = t1.copy();
          expect(t1.equals(t2)).to.equal(true);
        });
      });
    });

    describe('eye()', function () {
      it('Should return an identity matrix', function () {
        num.tidy(() => {
          const eye = [[1, 0], [0, 1]];
          const t = num.Tensor.eye(2);
          const x = t.arraySync();
          expect(x).to.eql(eye);
        });
      });

      it('Should allow for rectangular identity matrices', function () {
        num.tidy(() => {
          const eye = [[1, 0, 0], [0, 1, 0]];
          const t = num.Tensor.eye(2, 3);
          const x = t.arraySync();
          expect(x).to.eql(eye);
        });
      });
    });

    describe('fill()', function () {
      it('Should return a tensor filled with a number', function () {
        num.tidy(() => {
          const a = [[2, 2], [2, 2]];
          const t = num.Tensor.fill([2, 2], 2);
          const x = t.arraySync();
          expect(x).to.eql(a);
        });
      });
    });

    describe('linspace()', function () {
      it('Should return a tensor filled with evenly spaced numbers', function () {
        num.tidy(() => {
          const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          const t = num.Tensor.linspace(0, 9, 10);
          const x = t.arraySync();
          expect(x).to.eql(a);
        });
      });
    });

    describe('ones()', function () {
      it('Should return a tensor filled with ones', function () {
        num.tidy(() => {
          const a = [[1, 1], [1, 1]];
          const t = num.Tensor.ones([2, 2]);
          const x = t.arraySync();
          expect(x).to.eql(a);
        });
      });
    });

    describe('random()', function () {
      it('Should return a uniformly distributed tensor', function () {
        num.tidy(() => {
          const n = 100000;
          const t = num.Tensor.random([n]);
          const x = t.arraySync();
          const mean = x.reduce((a, b) => a + b) / n;
          expect(mean).to.be.closeTo(0.5, 0.01);
        });
      });
    });

    describe('randomGaussian()', function () {
      it('Should return a normally distributed tensor', function () {
        num.tidy(() => {
          const n = 100000;
          const t = num.Tensor.randomGaussian([n]);
          const x = t.arraySync();
          const mean = x.reduce((a, b) => a + b) / n;
          expect(mean).to.be.closeTo(0, 0.01);
        });
      });

      it('Should accept mean as an argument', function () {
        num.tidy(() => {
          const n = 100000;
          const t = num.Tensor.randomGaussian([n], 5);
          const x = t.arraySync();
          const mean = x.reduce((a, b) => a + b) / n;
          expect(mean).to.be.closeTo(5, 0.01);
        });
      });

      it('Should accept mean and sd as arguments', function () {
        num.tidy(() => {
          const n = 100000;
          const t = num.Tensor.randomGaussian([n], 5, 1);
          const x = t.arraySync();
          const mean = x.reduce((a, b) => a + b) / n;
          const sd = Math.sqrt(x.reduce((a, b) => a + (b - mean) ** 2) / (n - 1));
          expect(mean).to.be.closeTo(5, 0.01);
          expect(sd).to.be.closeTo(1, 0.01);
        });
      });
    });

    describe('range()', function () {
      it('Should return a tensor filled with evenly spaced numbers', function () {
        num.tidy(() => {
          const a = [0, 1, 2, 3, 4, 5, 6, 7, 8];
          const t = num.Tensor.range(0, 9);
          const x = t.arraySync();
          expect(x).to.eql(a);
        });
      });

      it('Should control space between numbers', function () {
        num.tidy(() => {
          const a = [0, 2, 4, 6, 8];
          const t = num.Tensor.range(0, 9, 2);
          const x = t.arraySync();
          expect(x).to.eql(a);
        });
      });
    });

    describe('zeros()', function () {
      it('Should return a tensor filled with zeros', function () {
        num.tidy(() => {
          const a = [[0, 0], [0, 0]];
          const t = num.Tensor.zeros([2, 2]);
          const x = t.arraySync();
          expect(x).to.eql(a);
        });
      });
    });
  });

  describe('Transformations', function () {
    describe('flatten()', function () {
      it('Should return a 1d tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([1, 2, 3, 4]);
          const t3 = t1.flatten();
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('pad()', function () {
      it('Should pad with zeros', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3, 4]);
          const t2 = pInst.createTensor([0, 1, 2, 3, 4, 0, 0]);
          const t3 = t1.pad([[1, 2]]);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should pad with constant values', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3, 4]);
          const t2 = pInst.createTensor([2, 1, 2, 3, 4, 2, 2]);
          const t3 = t1.pad([[1, 2]], 2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('reshape()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3, 4]);
          const t2 = pInst.createTensor([[1, 2], [3, 4]]);
          const t3 = t1.reshape([2, 2]);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });
  });

  describe('Slicing and Joining', function () {
    describe('concat()', function () {
      it('Should work with 1d tensors', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2]);
          const t2 = pInst.createTensor([3, 4]);
          const t3 = pInst.createTensor([1, 2, 3, 4]);
          const t4 = t1.concat(t2);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should work with nd tensors', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [10, 20]]);
          const t2 = pInst.createTensor([[3, 4], [30, 40]]);
          const t3 = pInst.createTensor([[1, 2, 3, 4], [10, 20, 30, 40]]);
          const t4 = t1.concat(t2, 1);
          expect(t3.equals(t4)).to.equal(true);
        });
      });

      it('Should work with an array of tensors', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [10, 20]]);
          const t2 = pInst.createTensor([[3, 4], [30, 40]]);
          const t3 = pInst.createTensor([[5, 6], [50, 60]]);
          const t4 = pInst.createTensor([[1, 2, 3, 4, 5, 6], [10, 20, 30, 40, 50, 60]]);
          const t5 = t1.concat([t2, t3], 1);
          expect(t4.equals(t5)).to.equal(true);
        });
      });
    });

    describe('reverse()', function () {
      it('Should work with 1d tensors', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3]);
          const t2 = pInst.createTensor([3, 2, 1]);
          const t3 = t1.reverse();
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should work with nd tensors', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([[2, 1], [4, 3]]);
          const t3 = t1.reverse(1);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('slice()', function () {
      it('Should work with 1d tensors', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2, 3, 4]);
          const t2 = pInst.createTensor([2, 3]);
          const t3 = t1.slice([1], [2]);
          expect(t2.equals(t3)).to.equal(true);
        });
      });

      it('Should work with nd tensors', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([[3, 4]]);
          const t3 = t1.slice([1, 0], [1, 2]);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('split()', function () {
      it('Should return an array of tensors', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2, 3, 4], [5, 6, 7, 8]]);
          const t2 = pInst.createTensor([[1, 2], [5, 6]]);
          const t3 = pInst.createTensor([[3, 4], [7, 8]]);
          const [a, b] = t1.split(2, 1);
          expect(t2.equals(a)).to.equal(true);
          expect(t3.equals(b)).to.equal(true);
        });
      });

      it('Should allow axes to be specified', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2, 3, 4], [5, 6, 7, 8]]);
          const t2 = pInst.createTensor([[1], [5]]);
          const t3 = pInst.createTensor([[2, 3], [6, 7]]);
          const t4 = pInst.createTensor([[4], [8]]);
          const [a, b, c] = t1.split([1, 2, 1], 1);
          expect(t2.equals(a)).to.equal(true);
          expect(t3.equals(b)).to.equal(true);
          expect(t4.equals(c)).to.equal(true);
        });
      });
    });

    describe('stack()', function () {
      it('Should return a tensor', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2]);
          const t2 = pInst.createTensor([3, 4]);
          const t3 = pInst.createTensor([5, 6]);
          const t4 = pInst.createTensor([[1, 2], [3, 4], [5, 6]]);
          const t5 = num.Tensor.stack([t1, t2, t3]);
          expect(t4.equals(t5)).to.equal(true);
        });
      });

      it('Should allow axes to be specified', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([1, 2]);
          const t2 = pInst.createTensor([3, 4]);
          const t3 = pInst.createTensor([5, 6]);
          const t4 = pInst.createTensor([[1, 3, 5], [2, 4, 6]]);
          const t5 = num.Tensor.stack([t1, t2, t3], 1);
          expect(t4.equals(t5)).to.equal(true);
        });
      });
    });

    describe('unstack()', function () {
      it('Should return an array of tensors', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([1, 2]);
          const t3 = pInst.createTensor([3, 4]);
          const a1 = [t2, t3];
          const a2 = t1.unstack();
          expect(a1[0].equals(a2[0])).to.equal(true);
          expect(a1[1].equals(a2[1])).to.equal(true);
        });
      });

      it('Should allow axes to be specified', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4]]);
          const t2 = pInst.createTensor([1, 3]);
          const t3 = pInst.createTensor([2, 4]);
          const a1 = [t2, t3];
          const a2 = t1.unstack(1);
          expect(a1[0].equals(a2[0])).to.equal(true);
          expect(a1[1].equals(a2[1])).to.equal(true);
        });
      });
    });
  });

  describe('Elementary Row Operations', function () {
    describe('addRows()', function () {
      it('Should throw an error for rank 3 and above', function () {
        num.tidy(() => {
          const t = pInst.createTensor([[[1, 2]], [[3, 4]], [[5, 6]]]);
          expect(() => t.addRows(1, 2)).to.throw(Error);
        });
      });

      it('Should properly add row 1 to row 2', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4], [5, 6]]);
          const t2 = pInst.createTensor([[1, 2], [3, 4], [8, 10]]);
          const t3 = t1.addRows(1, 2);
          expect(t3.equals(t2)).to.equal(true);
        });
      });

      it('Should properly add row 2 to row 0', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4], [5, 6]]);
          const t2 = pInst.createTensor([[6, 8], [3, 4], [5, 6]]);
          const t3 = t1.addRows(2, 0);
          expect(t3.equals(t2)).to.equal(true);
        });
      });

      it('Should properly add scalar multiples of two rows', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4], [5, 6]]);
          const t2 = pInst.createTensor([[1, 2], [5, 8], [5, 6]]);
          const t3 = t1.addRows(0, 1, 2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('subRows()', function () {
      it('Should throw an error for rank 3 and above', function () {
        num.tidy(() => {
          const t = pInst.createTensor([[[1, 2]], [[3, 4]], [[5, 6]]]);
          expect(() => t.subRows(1, 2)).to.throw(Error);
        });
      });

      it('Should properly subtract row 1 from row 2', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4], [5, 6]]);
          const t2 = pInst.createTensor([[1, 2], [3, 4], [2, 2]]);
          const t3 = t1.subRows(1, 2);
          expect(t3.equals(t2)).to.equal(true);
        });
      });

      it('Should properly subtract row 2 from row 0', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4], [5, 6]]);
          const t2 = pInst.createTensor([[-4, -4], [3, 4], [5, 6]]);
          const t3 = t1.subRows(2, 0);
          expect(t3.equals(t2)).to.equal(true);
        });
      });

      it('Should properly subtract scalar multiples of two rows', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4], [5, 6]]);
          const t2 = pInst.createTensor([[-5, -6], [3, 4], [5, 6]]);
          const t3 = t1.subRows(1, 0, 2);
          expect(t2.equals(t3)).to.equal(true);
        });
      });
    });

    describe('swapRows()', function () {
      it('Should throw an error for rank 3 and above', function () {
        num.tidy(() => {
          const t = pInst.createTensor([[[1, 2]], [[3, 4]], [[5, 6]]]);
          expect(() => t.swapRows(1, 2)).to.throw(Error);
        });
      });

      it('Should properly swap row 1 and row 2', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4], [5, 6]]);
          const t2 = pInst.createTensor([[1, 2], [5, 6], [3, 4]]);
          const t3 = t1.swapRows(1, 2);
          expect(t3.equals(t2)).to.equal(true);
        });
      });

      it('Should properly swap row 2 and row 0', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4], [5, 6]]);
          const t2 = pInst.createTensor([[5, 6], [3, 4], [1, 2]]);
          const t3 = t1.swapRows(2, 0);
          expect(t3.equals(t2)).to.equal(true);
        });
      });
    });

    describe('mulRow()', function () {
      it('Should throw an error for rank 3 and above', function () {
        num.tidy(() => {
          const t = pInst.createTensor([[[1, 2]], [[3, 4]], [[5, 6]]]);
          expect(() => t.mulRow(1, 3)).to.throw(Error);
        });
      });

      it('Should properly multiply row 1 by 3', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4], [5, 6]]);
          const t2 = pInst.createTensor([[1, 2], [9, 12], [5, 6]]);
          const t3 = t1.mulRow(1, 3);
          expect(t3.equals(t2)).to.equal(true);
        });
      });

      it('Should properly multiply row 2 by 6', function () {
        num.tidy(() => {
          const t1 = pInst.createTensor([[1, 2], [3, 4], [5, 6]]);
          const t2 = pInst.createTensor([[1, 2], [3, 4], [30, 36]]);
          const t3 = t1.mulRow(2, 6);
          expect(t3.equals(t2)).to.equal(true);
        });
      });
    });
  });
});
