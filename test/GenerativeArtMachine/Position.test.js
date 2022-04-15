import { expect } from 'chai';
import Mocha from 'mocha';
import { Position } from '../../Machines/GenerativeArtMachine/Position.js';
import { zionUtil } from '/Users/WAW/Documents/Projects/telegram-bots/Classes/_Node Standard Modules/zionUtil.js';

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

let x, y, newPosition;
x = 10;
y = 18;
newPosition = new Position(x, y);

describe(`POSITION Class`, () => {
  describe(`Method Constructor`, () => {
    it(`Riceve una posizione x: ${x}, e y: ${y}`, () => {
      expect(newPosition.x).to.be.equal(x);
      expect(newPosition.y).to.be.equal(y);
    });
    describe(`STATIC PROPERTIES`, () => {
      it(`La classe dovrebbe contenere un array con un elemento`, () => {
        expect(Position.positions.length).to.be.equal(1);
      });
      it(`L'elemento contenuto nella classe deve avere una proprietà x: ${x}`, () => {
        expect(Position.positions[0].x).to.be.equal(x);
      });
      it(`L'elemento contenuto nella classe deve avere una proprietà x: ${y}`, () => {
        expect(Position.positions[0].y).to.be.equal(y);
      });
    });
  });
  describe(`GETTERS`, () => {
    it(`dovrebbe ritornare il valore di x: ${x}`, () => {
      expect(newPosition.x).to.be.equal(x);
    });
    it(`dovrebbe ritornare il valore di x: ${y}`, () => {
      expect(newPosition.y).to.be.equal(y);
    });
  });
});
