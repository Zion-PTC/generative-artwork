import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Dna } from '../../Machines/GenerativeArtMachine/Dna.js';
import { Element } from '../../Machines/GenerativeArtMachine/Element.js';

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

let newDna1 = new Dna();
let newDna2 = new Dna();
let newDna3 = new Dna();

describe(`CLASSNAME Class`, () => {
  describe(`CONSTRUCTOR`, () => {
    it(`task description`, () => {});
  });
  describe(`STATIC PROPERTIES`, () => {
    describe(`Property property 'dnas`, () => {
      it(`dovrebbe tornare una lista con 3 elementi`, () => {
        expect(Dna.dnas.length).to.be.equal(3);
      });
    });
  });
  describe(`GETTERS & SETTERS`, () => {
    describe(`Getter property dna`, () => {
      it(`dovrebbe tornare il Dna`, () => {
        const NAME = 'name1';
        newDna1.dna = new Element(
          NAME,
          'path1',
          'type1',
          1000,
          1000,
          '.jpg',
          1000
        );
        expect(newDna1.dna[0].name).to.be.equal(NAME);
      });
    });
    describe(`Setter property 'dna`, () => {
      it(`dovrebbe lanciare un errore perché l'oggeto passato non è di tipo Dna`, () => {
        const ARGOMENTOSBAGLIATO = 'ciao';
        const ERRORMESSAGE =
          'È stato passato un oggetto che non è di tipo Element';
        expect(
          () => (newDna1.dna = ARGOMENTOSBAGLIATO)
        ).to.throw(ERRORMESSAGE);
      });
      it(`dovrebbe aggiugere un elemento alla lista del dna1`, () => {
        newDna1.dna = new Element();
        expect(newDna1.dna.length).to.be.equal(2);
      });
    });
    describe(`Getter property string`, () => {
      it(`dovrebbe tornare una descrizione lunga del dna, che comprende un breve elenco di tutti gli elementi che lo compongono.`, () => {
        const DESCRIZIONE = 'Occhi azzurri';
        const DESCRIZIONE2 = 'Capelli verdi';
        newDna1.dna[0].description = DESCRIZIONE;
        newDna1.dna[1].description = DESCRIZIONE2;
        log(newDna1.stringDna);
      });
    });
  });
  describe(`INSTANCE PROPERTIES`, () => {
    describe(`Property property name`, () => {
      it(`task description`, () => {});
    });
  });
  describe(`STATIC METHODS}`, () => {
    describe(`Method methodName`, () => {
      it(`task description`, () => {});
    });
  });
  describe(`INSTANCE METHODS}`, () => {
    describe(`Method methodName`, () => {
      it(`task description`, () => {});
    });
  });
});
