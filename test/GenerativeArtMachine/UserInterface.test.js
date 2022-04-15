import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { UserInterface } from '../../Machines/GenerativeArtMachine/UserInterface.js';

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

let userInterface = new UserInterface('prova');

export let UserInterfaceTest =
  describe('USER INTERFACE', () => {
    describe('UserInterface methods: sendMessage', () => {
      it('dovrebbe mandare un messaggio nella console', () => {
        // log(userInterface);
        userInterface.sendMessage('ciao\n');
      });
    });
    describe('UserInterface methods:', () => {
      it('dovrebbe inviare una domanda ed attendere una risposta', async () => {
        await userInterface.makeQuestion('Ricevi?\n');
      });
    });
    describe('User Interface methods: listenForAnser', () => {
      it('task description', async () => {
        await userInterface.listenForAnswer();
        userInterface.terminal.close();
      });
    });
  });
