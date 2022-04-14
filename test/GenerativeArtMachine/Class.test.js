import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/Node Standard Modules/zionUtil.js';
import { Class } from '../../Machines/GenerativeArtMachine/Class.js';

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

const ID = 'id';
const NAME = 'name';
const PATH = 'path';
const LEVEL = 'level';
const CHILDREN = [
  new Class('una', 'nuova', 'classe'),
  new Class('altra', 'nuova', 'classe'),
];
const TYPE = 'type';
const WIDTH = 1000;
const HEIGHT = 1000;
const COLLECTION = 'collection';

let newClass = new Class(
  ID,
  NAME,
  PATH,
  LEVEL,
  CHILDREN,
  TYPE,
  WIDTH,
  HEIGHT,
  COLLECTION
);

describe(`CLASS CLASS`, () => {
  describe(`CONSTRUCTOR`, () => {
    it(`dovrebbe creare una nuova classe`, () => {
      expect(newClass).to.be.not.null;
    });
    it(`dovrebbe aver creato una classe con id: ${ID}`, () => {
      expect(newClass.id).to.be.equal(ID);
    });
    it(`dovrebbe aver creato una classe con name: ${NAME}`, () => {
      expect(newClass.name).to.be.equal(NAME);
    });
    it(`dovrebbe aver creato una classe con path: ${PATH}`, () => {
      expect(newClass.path).to.be.equal(PATH);
    });
    it(`dovrebbe aver creato una classe con level: ${LEVEL}`, () => {
      expect(newClass.level).to.be.equal(LEVEL);
    });
    it(`dovrebbe aver creato una classe con children: ${CHILDREN.length}`, () => {
      expect(newClass.children.length).to.be.equal(2);
    });
    it(`dovrebbe aver creato una classe con type: ${TYPE}`, () => {
      expect(newClass.type).to.be.equal(TYPE);
    });
  });
});
