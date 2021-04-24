/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('DataFrame', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('DataFrame', function () {
    it('Should have a dfd.DataFrame under the hood', function () {
      const df = pInst.createDataFrame([[1, 2, 3], [4, 5, 6]]);
      expect(df.dataframe).to.be.an.instanceof(num.dfd.DataFrame);
    });
  });

  describe('createDataFrame()', function () {
    it('Should require an argument', function () {
      expect(pInst.createDataFrame).to.throw(Error);
    });

    it('Should accept JSON arguments', function () {
      const json_data = [
        { A: 0.4612, B: 4.28283, C: -1.509, D: -1.1352 },
        { A: 0.5112, B: -0.22863, C: -3.39059, D: 1.1632 },
        { A: 0.6911, B: -0.82863, C: -1.5059, D: 2.1352 },
        { A: 0.4692, B: -1.28863, C: 4.5059, D: 4.1632 }
      ];
      const df = pInst.createDataFrame(json_data);
      expect(df).to.be.an.instanceof(num.DataFrame);
    });

    it('Should accept Tensor arguments', function () {
      const t = pInst.createTensor([[12, 34, 2.2, 2], [30, 30, 2.1, 7]]);
      const df = pInst.createDataFrame(t);
      expect(df).to.be.an.instanceof(num.DataFrame);
    });

    it('Should accept tf.Tensor arguments', function () {
      const t = num.tf.tensor([[12, 34, 2.2, 2], [30, 30, 2.1, 7]]);
      const df = pInst.createDataFrame(t);
      expect(df).to.be.an.instanceof(num.DataFrame);
    });

    it('Should reject garbage arguments', function () {
      expect(() => pInst.createDataFrame("I'm only happy when it rains")).to.throw(Error);
    });
  });
});
