import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '@zionstate_node/zion-util';
// import { system } from '../../Machines/System.js';
import { GenerativeArtMachine } from '../../generative-artwork/built/src/GenerativeArtMachine.js';
import { Collection } from '../built/src/GenerativeArtMachine/Collection.js';

const testRunner = new Mocha({ slow: 1000 });
testRunner.suite.emit('pre-require', global, 'nofile', testRunner);
var suiteRun = testRunner.run();
process.on('exit', code => {
  process.exit(suiteRun.stats.failures > 0);
});
let log = zionUtil.debuglog('log');

const genArtwork = new GenerativeArtMachine();

const NAME = 'Collezione';
const SYMBOL = 'CLZ';
const SUPPLY = 250;
const BASEURI = 'http://some.mighty.path';
const DESCRIPTION = 'description of my beautiful collection.';
const APP_RESOURCES = '/Users/WAW/Documents/Projects/__EXTERNAL_APP_RESOURCES';
const PATH = APP_RESOURCES + '/generative-art/Squares';
const OUTPUTPATH = APP_RESOURCES + '/generative-art/Squares/output';
const TYPE = 'Element';
const WIDTH = 1000;
const HEIGHT = 1000;

let newCollection = new Collection(
  NAME,
  SYMBOL,
  SUPPLY,
  BASEURI,
  DESCRIPTION,
  PATH,
  TYPE,
  OUTPUTPATH,
  WIDTH,
  HEIGHT
);

log(newCollection.possibiliDna);
// log(newCollection.editionsReport.percentageReport);
log(newCollection.gruppiDnaPuri);
// log(newCollection.gruppiDnaImpuri);
