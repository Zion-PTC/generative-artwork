import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/Utils.js';
import { Collection } from '../../Machines/GenerativeArtMachine/Collection.js';

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

const _ID = 'id';
const NAME = 'Collezione';
const _NAME = 'name';
const PATH =
  '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/input';
const _PATH = 'path';
const BASEURI = './some/mighty/path';
const _BASEURI = 'baseUri';
const FOLDERSTRUCTURE = '';
const _FOLDERSTRUCTURE = 'folderStructure';

let newCollection = new Collection(NAME, PATH, BASEURI);

export let CollectionTest =
  describe('COLLECTION CLASS', () => {
    describe('Collection constructor', () => {
      it(`L'oggetto dovrebbe avere una proprieta: ${_ID}, con valore: 1`, () => {
        expect(newCollection[_ID]).to.be.equal(1);
      });
      it(`L'oggetto dovrebbe avere una proprietà: '${_NAME}' con valore: ${NAME}`, () => {
        expect(newCollection[_NAME]).to.be.equal(NAME);
      });
      it(`dovrebbe avere una proprietà: ${_PATH}, con valore ${PATH}`, () => {
        expect(newCollection[_PATH]).to.be.equal(PATH);
      });
      it(`dovrebbe avere un paramentro ${_BASEURI}, con valore ${BASEURI}`, () => {
        expect(newCollection[_BASEURI]).to.be.equal(
          BASEURI
        );
      });
      it(`dovrebbe avere una proprietà ${_FOLDERSTRUCTURE}, con valore: ${FOLDERSTRUCTURE}`, () => {
        log(newCollection[_FOLDERSTRUCTURE]);
        // expect(newCollection[_FOLDERSTRUCTURE]).to.be.equal();
      });
    });
  });
