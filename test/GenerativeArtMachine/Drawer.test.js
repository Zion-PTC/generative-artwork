import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/Utils.js';
import { Drawer } from '../../Machines/GenerativeArtMachine/Drawer.js';

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

describe(`DRAWER CLASS`, () => {
  describe(`DRAWER CONSTRUCTOR`, () => {
    describe(`method description`, () => {
      it(`task description`, () => {});
    });
  }),
    describe(`METHODS`, () => {
      describe(`Method drawElement`, () => {
        it(`dovrebbe disegnare un elemento nel canvas`, () => {
          //
        });
      });
      describe(`Method randomBackground()`, () => {
        it(`dovrebbe generare un elemento canvas con un background generato a caso`, () => {
          //
        });
      });
      describe(`Method signImage`, () => {
        it(`dovrebbe generare una scritta che appare sul canvas`, () => {
          //
        });
      });
      describe(`Method loadLayerImage()`, () => {
        it(`dovrebbe risolvere con un oggetto contente il layer impresso e l'immagine caricata in forma di promessa.`, () => {
          //
        });
      });
      describe(`Method loadElements()`, () => {
        it(`dovrebbe ritornare un array con le promesse delle immagini caricate.`, () => {});
      });
    });
});
