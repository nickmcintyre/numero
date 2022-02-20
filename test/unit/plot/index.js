/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Plotting', function () {
  let pInst;

  beforeEach(function () {
    pInst = new p5(function () { });
  });

  afterEach(function () {
    pInst.remove();
  });

  describe('figure()', function () {
    it('Should exist', function () {
      expect(num.figure).to.be.an.instanceof(Function);
      expect(pInst.figure).to.be.an.instanceof(Function);
    });

    it('Should return a description object', function () {
      const obj = pInst.figure();
      const props = ['ox', 'oy', 'width', 'height', 'bigPad', 'littlePad'];
      props.forEach(p => {
        expect(obj).to.have.property(p);
      });
    });
  });
    
  describe('axes()', function () {
    it('Should exist', function () {
      expect(num.axes).to.be.an.instanceof(Function);
      expect(pInst.axes).to.be.an.instanceof(Function);
    });
  });

  describe('basePlot()', function () {
    it('Should exist', function () {
      expect(num.basePlot).to.be.an.instanceof(Function);
      expect(pInst.basePlot).to.be.an.instanceof(Function);
    });

    it('Should return a description object', function () {
      const obj = pInst.basePlot();
      const props = ['xmin', 'xmax', 'ymin', 'ymax', 'pad', 'width', 'height'];
      props.forEach(p => {
        expect(obj).to.have.property(p);
      });
    });
  });

  describe('plot()', function () {
    it('Should exist', function () {
      expect(num.plot).to.be.an.instanceof(Function);
      expect(pInst.plot).to.be.an.instanceof(Function);
    });

    it('Should require Array arguments', function () {
      let x = [1, 2, 3];
      let y = 1;
      expect(() => pInst.plot(x, y)).to.throw(Error);
      x = 1;
      y = [1, 2, 3];
      expect(() => pInst.plot(x, y)).to.throw(Error);
    });

    it('Should require Arrays to have the same length', function () {
      const x = [1, 2, 3];
      const y = [4, 5];
      expect(() => pInst.plot(x, y)).to.throw(Error);
    });
  });

  describe('scatter()', function () {
    it('Should exist', function () {
      expect(num.scatter).to.be.an.instanceof(Function);
      expect(pInst.scatter).to.be.an.instanceof(Function);
    });

    it('Should require Array arguments', function () {
      let x = [1, 2, 3];
      let y = 1;
      expect(() => pInst.scatter(x, y)).to.throw(Error);
      x = 1;
      y = [1, 2, 3];
      expect(() => pInst.scatter(x, y)).to.throw(Error);
    });

    it('Should require Arrays to have the same length', function () {
      const x = [1, 2, 3];
      const y = [4, 5];
      expect(() => pInst.plot(x, y)).to.throw(Error);
    });
  });
});
