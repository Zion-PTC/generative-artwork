import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Size } from '../../Machines/GenerativeArtMachine/Size.js';

const testRunner = new Mocha({ slow: 1000 });
testRunner.suite.emit(
  'pre-require',
  global,
  'nofile',
  testRunner
);
var suiteRun = testRunner.run();
process.on('exit', (code) => {
  process.exit(suiteRun.stats.failures > 0);
});
let log = zionUtil.debuglog('log');

let width,
  height,
  width2,
  height2,
  expectedRatio,
  expectedRatio2;
width = 400;
height = 500;
width2 = 1000;
height2 = 1000;
expectedRatio = '4/5';
expectedRatio2 = '1';
let newSize = new Size(width, height);
let newSize2 = new Size(width2, height2);

describe(`SIZE Class`, () => {
  // describe(`STATIC PROPERTIES`, () => {
  // });
  // describe(`STATIC METHODS`, () => {
  //   it(`task description`, () => {});
  // });
  describe(`STATIC GETTERS`, () => {
    describe(`get sizes`, () => {
      it(`Dovrebbe tornare un array`, () => {
        expect(Array.isArray(Size.sizes)).to.be.true;
      });
      it(`L'array dovrebbe essere lungo 2`, () => {
        expect(Size.sizes.length).to.be.equal(2);
      });
      it(`La width della seconda Size creata, dovrebbe essere: ${width2}`, () => {
        expect(Size.sizes[1].width).to.be.equal(width2);
      });
      it(`La height della seconda Size creata, dovrebbe essere: ${height2}`, () => {
        expect(Size.sizes[1].height).to.be.equal(height2);
      });
      it(`La ratio della seconda Size creata, dovrebbe essere: ${expectedRatio2}`, () => {
        expect(Size.sizes[1].ratio).to.be.equal(
          expectedRatio2
        );
      });
    });
  });
  // describe(`STATIC SETTERS`, () => {
  //   it(`task description`, () => {});
  // });
  describe(`CONSTRUCTOR`, () => {
    it(`Accetta due paramentri, width: ${width} e height: ${height}, costruisce un oggeto Size`, () => {
      expect(newSize.width).to.be.equal(width);
      expect(newSize.height).to.be.equal(height);
    });
    it(`Con width: ${newSize.width} e height: ${newSize.height} la ratio attesa dovrebbe essere: ${expectedRatio2}`, () => {
      expect(newSize2.ratio).to.be.equal(expectedRatio2);
    });
    it(`Con width: ${newSize.width2} e height: ${newSize.height2} la ratio attesa dovrebbe essere: ${expectedRatio}`, () => {
      expect(newSize.ratio).to.be.equal(expectedRatio);
    });
  });
  // describe(`INSTANCE PROPERTIES`, () => {
  //   it(`task description`, () => {});
  // });
  // describe(`INSTANCE METHODS`, () => {
  //   it(`task description`, () => {});
  // });
});
