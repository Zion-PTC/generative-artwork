import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { system } from '../../Machines/System.js';
import { GenerativeArtMachine } from '../../Machines/GenerativeArtMachine.js';

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

export let GenerativeArtMachineTest =
  describe('GenerativeArtMachine', async () => {
    // CREAZIONE MACHINE E COLLEZIONE
    let NAME = 'Gotek GenArt Machine';
    let DESCRIPTION = 'This is my first GenArt Machine';
    let URL = 'https://gotek.znft.tech';
    let PATH =
      '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/GenerativeArtMachine/Machines/';
    let gotekMachine = new GenerativeArtMachine(
      NAME,
      DESCRIPTION,
      URL,
      PATH
    );
    describe('Costruttore della classe GenerativeArtMachine', async () => {
      it(`dovrebbe creare un oggetto con nome: ${NAME}`, () => {
        expect(gotekMachine.name).to.be.equal(NAME);
      });
      it(`dovrebbe creare un oggetto con descrizione: ${DESCRIPTION}`, () => {
        expect(gotekMachine.description).to.be.equal(
          DESCRIPTION
        );
      });
      it(`dovrebbe creare un oggetto con url: ${URL}`, () => {
        expect(gotekMachine.url).to.be.equal(URL);
      });
      it(`dovrebbe creare un oggetto con path: ${PATH}${NAME}`, () => {
        expect(gotekMachine.path).to.be.equal(
          `${PATH}${NAME}`
        );
      });
      // let propaganda = gotekMachine.createNewCollection(
      //   'Propaganga',
      //   ['basic']
      // );
      // log(gotekMachine.collections[0]);
    });
    describe(
      'GenerativeArtMachine method: ' + 'machineExists()',
      () => {
        it('dovrebbe ritornare che la macchina non è ancora stata salvata.', async () => {
          expect(
            await GenerativeArtMachine.machineExists(NAME)
          ).to.be.false;
        });
      }
    );
    describe(
      'GenerativeArtMachine method: ' +
        'createMachineDirectoryAndJson()',
      () => {
        it(
          'dovrebbe aver creato un file Json con i ' +
            'dati della macchina.',
          async () => {
            await gotekMachine.createMachineDirectoryAndJson();
            log(gotekMachine.path);
            expect(
              system
                .arrayOfFoldersInDirectory(PATH)
                .includes(NAME)
            ).to.be.equal(true);
            await gotekMachine.deleteMachineDirectoryAndJson();
          }
        );
      }
    );
  });
