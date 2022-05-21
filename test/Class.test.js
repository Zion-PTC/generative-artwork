import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '@zionstate_node/zion-util';
import { Class } from '../built/index.js';

const testRunner = new Mocha({ slow: 1000 });
testRunner.suite.emit('pre-require', global, 'nofile', testRunner);
var suiteRun = testRunner.run();
process.on('exit', code => {
  process.exit(suiteRun.stats.failures > 0);
});
let log = zionUtil.debuglog('log');

const ID = 'id';
const NAME = 'name';
const PATH = 'path';
const LEVEL = 'level';
const CHILDREN = [
  new Class('una', 'nuova', 0, 0, 0),
  new Class('altra', 'nuova', 0, 0, 0),
];
log('ciao');
const TYPE = 'type';
const WIDTH = 1000;
const HEIGHT = 1000;
const COLLECTION = 'collection';

let newClass = new Class(NAME, PATH, TYPE, WIDTH, HEIGHT);

export const ClassTest = describe(`CLASS CLASS`, () => {
  describe(`CONSTRUCTOR`, () => {
    it(`dovrebbe creare una nuova classe`, () => {
      expect(newClass).to.be.not.null;
    });
    it(`dovrebbe aver creato una classe con id: ${ID}`, () => {
      expect(newClass.id).to.be.equal(3);
    });
    it(`dovrebbe aver creato una classe con name: ${NAME}`, () => {
      expect(newClass.name).to.be.equal(NAME);
    });
    it(`dovrebbe aver creato una classe con path: ${PATH}`, () => {
      expect(newClass.path).to.be.equal(PATH);
    });
    it(`dovrebbe aver creato una classe con type: ${TYPE}`, () => {
      expect(newClass.type).to.be.equal(TYPE);
    });
  });
});
