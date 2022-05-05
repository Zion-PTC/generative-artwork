import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '/Users/WAW/Documents/Projects/telegram-bots/Classes/_Node Standard Modules/zionUtil.js';

import * as IPFS from 'ipfs';

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

describe(`IPFS`, () => {
  describe(`Method CLASS log`, () => {
    it(`IPFS`, () => {
      log(IPFS);
    });
  });
  describe(`IPFS.CID`, () => {
    it(`IPFS.CID`, () => {
      let CID = IPFS.CID;
      log(CID);
    });
  });
  describe(`IPFS.PeerId`, () => {
    it(`IPFS.PeerId`, () => {
      log(IPFS.PeerId);
    });
  });
  describe(`IPFS.create`, () => {
    it(`IPFS.create`, () => {
      log(IPFS.create);
    });
  });
  describe(`IPFS.crypto`, () => {
    it(`IPFS.crypto`, () => {
      log(IPFS.crypto);
    });
  });
  describe(`IPFS.globSource`, () => {
    it(`IPFS.globSource`, () => {
      log(IPFS.globSource);
    });
  });
  describe(`IPFS.isIPFS`, () => {
    it(`IPFS.isIPFS`, () => {
      log(IPFS.isIPFS);
    });
  });
  describe(`IPFS.multiaddr`, () => {
    it(`IPFS.multiaddr`, () => {
      log(IPFS.multiaddr);
    });
  });
  describe(`IPFS.path`, () => {
    it(`IPFS.path`, () => {
      log(IPFS.path);
    });
  });
  describe(`Method IPFS.urlSource`, () => {
    it(`IPFS.urlSource`, () => {
      log(IPFS.urlSource);
    });
  });
});
