/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Memory', function () {
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

  describe('memory()', function () {
    it('Should return information about memory usage', function () {
      const expected = [
        'unreliable',
        'reasons',
        'numTensors',
        'numDataBuffers',
        'numBytes',
      ];
      const keys = Object.keys(ten.memory());
      expect(keys).to.eql(expected);
    });

    it('Should return the number of tensors in memory', function () {
      const start = ten.memory().numTensors;
      const a = pInst.createTensor([1, 2, 3]);
      const end = ten.memory().numTensors;
      expect(start).to.eq(end - 1);
    });
  });

  describe('tidy()', function () {
    it('Should clean up memory', function () {
      const start = ten.memory().numTensors;
      ten.scope(() => {
        const t = pInst.createTensor([1, 2, 3]);
      });
      const end = ten.memory().numTensors;
      expect(start).to.equal(end);
    });

    it('Should return tensors', function () {
      const t = ten.scope(() => pInst.createTensor([1, 2, 3]));
      expect(t).to.be.an.instanceof(ten.Tensor);
    });
  });

  describe('startScope() and endScope()', function () {
    it('Should dispose of intermediate tensors', function () {
      const start = ten.memory().numTensors;
      ten.startScope();
      const a = pInst.createTensor([1, 2, 3]);
      ten.endScope();
      const end = ten.memory().numTensors;
      expect(start).to.eq(end);
    });
  });

  describe('keep()', function () {
    it('Should keep a tensor in memory', function () {
      const start = ten.memory().numTensors;
      ten.startScope();
      const a = pInst.createTensor([1, 2, 3]);
      ten.keep(a);
      ten.endScope();
      const end = ten.memory().numTensors;
      expect(start).to.eq(end - 1);
    });

    it('Should keep multiple tensors in memory', function () {
      const start = ten.memory().numTensors;
      ten.startScope();
      const a = pInst.createTensor([1, 2, 3]);
      const b = pInst.createTensor([4, 5, 6]);
      ten.keep([a, b]);
      ten.endScope();
      const end = ten.memory().numTensors;
      expect(start).to.eq(end - 2);
    });
  });

  describe('dispose()', function () {
    it('Should dispose of a tensor from memory', function () {
      const start = ten.memory().numTensors;
      const a = pInst.createTensor([1, 2, 3]);
      ten.dispose(a);
      const end = ten.memory().numTensors;
      expect(start).to.eq(end);
    });

    it('Should dispose of multiple tensors from memory', function () {
      const start = ten.memory().numTensors;
      const a = pInst.createTensor([1, 2, 3]);
      const b = pInst.createTensor([4, 5, 6]);
      ten.dispose([a, b]);
      const end = ten.memory().numTensors;
      expect(start).to.eq(end);
    });
  });
});
