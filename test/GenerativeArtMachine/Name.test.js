import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Name } from '../../Machines/GenerativeArtMachine/Name.js';

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

let name, description;
name = 'prova name';
description = 'prova descrizione';
let newName = new Name(name, description);

describe(`NAME Class`, () => {
  describe(`STATIC PROPERTIES`, () => {
    describe(`Method methodName`, () => {
      it(`task description`, () => {});
    });
  });
  describe(`STATIC METHODS`, () => {
    describe(`Method methodName`, () => {
      it(`task description`, () => {});
    });
  });
  describe(`CONSTRUCTOR`, () => {
    it(`Dovrebbe creare un oggetto con name: '${name}'.'`, () => {
      expect(newName.name).to.be.equal(name);
    });
    it(`Dovrebbe creare un oggetto con descrizione: '${description}'.`, () => {
      expect(newName.description).to.be.equal(description);
    });
  });
  describe(`INSTANCE PROPERTIES`, () => {
    describe(`Method methodName`, () => {
      it(`task description`, () => {});
    });
  });
  describe(`INSTANCE METHODS`, () => {
    describe(`Method methodName`, () => {
      it(`task description`, () => {});
    });
  });
});
