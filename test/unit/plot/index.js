/* eslint-disable func-names */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
describe('plot', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () {});
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('createPlot()', function () {
    it('Should be a function', function () {
      expect(pInst.createPlot).to.be.an.instanceOf(Function);
    });

    it('Should return an object', function () {
      const data = { x: [1, 2, 3], y: [4, 5, 6] };
      const plot = pInst.createPlot(data);
      expect(plot).to.be.an.instanceOf(Object);
    });
  });

  describe('Plot', function () {
    it('Should reference its data', function () {
      const data = { x: [1, 2, 3], y: [4, 5, 6] };
      const plot = pInst.createPlot(data);
      expect(plot.props.dataset.raw.data).to.eq(data);
    });
  });
});
