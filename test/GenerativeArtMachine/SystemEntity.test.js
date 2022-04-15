import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { SystemEntity } from '../../Machines/GenerativeArtMachine/SystemEntity.js';

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
let id,
  name,
  path,
  level,
  children,
  type,
  width,
  height,
  collection;

id = 'new entity';
name = 'entity';
path = 'User/';
level = '';
children = [];
type = '';
width = 1000;
height = 1000;
collection = 'yeah';

let newSystemEntity = new SystemEntity(
  id,
  name,
  path,
  level,
  children,
  type,
  width,
  height,
  collection
);

describe(`SYSTEM ENTITY Class`, () => {
  describe(`STATIC PROPERTIES`, () => {
    describe(`Property systemEntities`, () => {
      it(`Dovrebbe tornare un array`, () => {
        expect(Array.isArray(SystemEntity.systemEntities))
          .to.be.true;
      });
      it(`dovrebbe contenere 1 elemento`, () => {
        expect(
          SystemEntity.systemEntities.length
        ).to.be.equal(1);
      });
      it(`la proprietà nome dell'elemento contenuto nell'array dovrebbe essere '${name}'`, () => {
        expect(
          SystemEntity.systemEntities[0].name
        ).to.be.equal(name);
      });
    });
  });
  describe(`STATIC METHODS`, () => {
    it(`task description`, () => {});
  });
  describe(`CONSTRUCTOR`, () => {
    it(`Dovrebbe creare`, () => {});
  });
  describe(`INSTANCE PROPERTIES`, () => {
    it(`task description`, () => {});
  });
  describe(`INSTANCE METHODS`, () => {
    it(`task description`, () => {});
  });
});
