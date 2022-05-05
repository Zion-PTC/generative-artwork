import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Terminal } from '../../Machines/Terminal.js';

const testRunner = new Mocha({ slow: 1000 });
testRunner.suite.emit('pre-require', global, 'nofile', testRunner);
var suiteRun = testRunner.run();
process.on('exit', (code) => {
  process.exit(suiteRun.stats.failures > 0);
});
let log = zionUtil.debuglog('log');

const TERMINALNAME = 'newTerminal';
let newTerminal = new Terminal(TERMINALNAME);

export let TerminalTest = describe('Terminal Class.js', () => {
  it('Test riguardanti la classe Terminal', () => {
    describe('Terminal method: makeQuestion', () => {
      let DOMANDA = 'Come ti chiami?: ';
      it('it should make a question.', async () => {
        const answer = await newTerminal.makeQuestion(DOMANDA);
        expect(newTerminal.answer).to.be.equal('f');
      }).timeout(10000);
    });
    describe('Terminal method: sendMessage', () => {
      it('it should send a message.', async () => {
        newTerminal.sendMessage('Messaggio\n');
      });
    });
    describe('Terminal method: listenForAnswer()', () => {
      it('dovrebbe aspettare un input da parte dello user e chiudere la connessione', async () => {
        await newTerminal.listenForAnswer();
        expect(newTerminal.line).to.be.equal('f');
        newTerminal.close();
      }).timeout(10000);
    });
  });
});
