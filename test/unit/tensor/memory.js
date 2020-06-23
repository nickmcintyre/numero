/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Memory', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('memory()', function () {
    it('Should return information about memory usage', function () {
      const expected = [
        'unreliable',
        'reasons',
        'numTensors',
        'numDataBuffers',
        'numBytes',
      ];
      const keys = Object.keys(num.memory());
      expect(keys).to.eql(expected);
    });

    it('Should return the number of tensors in memory', function () {
      const start = num.memory().numTensors;
      const a = pInst.createTensor([1, 2, 3]);
      const end = num.memory().numTensors;
      expect(start).to.eq(end - 1);
    });
  });

  describe('tidy()', function () {
    it('Should clean up memory', function () {
      const start = num.tfc.memory().numTensors;
      num.tidy(() => {
        const t = num.tfc.tensor([1, 2, 3]);
      });
      const end = num.tfc.memory().numTensors;
      expect(start).to.equal(end);
    });

    it('Should return tensors', function () {
      const t = num.tidy(() => {
        return pInst.createTensor([1, 2, 3]);
      });
      expect(t).to.be.an.instanceof(num.Tensor);
    });
  });

  describe('startScope() and endScope()', function () {
    it('Should dispose of intermediate tensors', function () {
      const start = num.memory().numTensors;
      num.startScope();
      const a = pInst.createTensor([1, 2, 3]);
      num.endScope();
      const end = num.memory().numTensors;
      expect(start).to.eq(end);
    });
  });

  describe('keep()', function () {
    it('Should keep a tensor in memory', function () {
      const start = num.memory().numTensors;
      num.startScope();
      const a = pInst.createTensor([1, 2, 3]);
      num.keep(a);
      num.endScope();
      const end = num.memory().numTensors;
      expect(start).to.eq(end - 1);
    });

    it('Should keep multiple tensors in memory', function () {
      const start = num.memory().numTensors;
      num.startScope();
      const a = pInst.createTensor([1, 2, 3]);
      const b = pInst.createTensor([4, 5, 6]);
      num.keep([a, b]);
      num.endScope();
      const end = num.memory().numTensors;
      expect(start).to.eq(end - 2);
    });
  });

  describe('dispose()', function () {
    it('Should dispose of a tensor from memory', function () {
      const start = num.memory().numTensors;
      const a = pInst.createTensor([1, 2, 3]);
      num.dispose(a);
      const end = num.memory().numTensors;
      expect(start).to.eq(end);
    });

    it('Should dispose of multiple tensors from memory', function () {
      const start = num.memory().numTensors;
      const a = pInst.createTensor([1, 2, 3]);
      const b = pInst.createTensor([4, 5, 6]);
      num.dispose([a, b]);
      const end = num.memory().numTensors;
      expect(start).to.eq(end);
    });
  });
});
