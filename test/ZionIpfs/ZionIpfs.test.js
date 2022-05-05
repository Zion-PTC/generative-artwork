import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { ZionIpfs } from '../../Machines/ZionIpfs.js';

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

let newZionIpfs = new ZionIpfs();

describe(`ZIONIPFS Class`, () => {
  describe(`CONSTRUCTOR`, () => {
    it(`task description`, async () => {
      // log(newZionIpfs.ipfs);
      let res = await newZionIpfs.getCID();
      // let ipfs = await newZionIpfs.ipfs;
      // let res2 = await ipfs.dag.put({ hello: 'world' });
      log(res);
      // log(res2);
    }).timeout(8000);
  });
  describe(`STATIC PROPERTIES`, () => {
    describe(`Property property name`, () => {
      it(`task description`, () => {});
    });
  });
  describe(`STATIC METHODS}`, () => {
    describe(`Method methodName`, () => {
      it(`task description`, () => {});
    });
  });
  describe(`INSTANCE PROPERTIES`, () => {
    describe(`Property property name`, () => {
      it(`task description`, () => {});
    });
  });
  describe(`INSTANCE METHODS}`, () => {
    describe(`Method methodName`, () => {
      it(`task description`, () => {});
    });
  });
});
