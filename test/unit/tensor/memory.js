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
    it('Cleans up memory', function () {
      const start = num.tfc.memory().numTensors;
      num.tidy(() => {
        const t = num.tfc.tensor([1, 2, 3]);
      });
      const end = num.tfc.memory().numTensors;
      expect(start).to.equal(end);
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
});
