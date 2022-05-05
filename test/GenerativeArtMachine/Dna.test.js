import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Dna } from '../../Machines/GenerativeArtMachine/Dna.js';
import { Element } from '../../Machines/GenerativeArtMachine/Element.js';

const testRunner = new Mocha({ slow: 1000 });
testRunner.suite.emit('pre-require', global, 'nofile', testRunner);
var suiteRun = testRunner.run();
process.on('exit', (code) => {
  process.exit(suiteRun.stats.failures > 0);
});
let log = zionUtil.debuglog('log');

let newDna1 = new Dna();
let newDna2 = new Dna();
let newDna3 = new Dna();

export let DnaTest = describe(`CLASSNAME Class`, () => {
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
        // const NAME = 'name1';
        const el1 = new Element(
          'name1',
          'path1',
          'type1',
          1000,
          1000,
          '.png',
          1000
        );
        const el2 = new Element(
          'name2',
          'path2',
          'type2',
          1000,
          1000,
          '.png',
          1000
        );
        let elements = [el1, el2];
        newDna1.dna = elements;
        expect(newDna1.dna[0].name).to.be.equal('name1');
      });
    });
    describe(`Setter property 'dna'`, () => {
      it(`dovrebbe lanciare un errore perché l'oggeto passato non è di tipo Dna`, () => {
        const ARGOMENTOSBAGLIATO = 'ciao';
        const ERRORMESSAGE =
          'È stato passato un oggetto che non è di tipo Array';
        expect(() => (newDna1.dna = ARGOMENTOSBAGLIATO)).to.throw(ERRORMESSAGE);
      });
      it(`dovrebbe aggiugere un elemento alla lista del dna1`, () => {
        expect(newDna1.dna.length).to.be.equal(2);
        newDna1.dna = [new Element(), new Element()];
        expect(newDna1.dna.length).to.be.equal(4);
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
    describe(`Method haElemento`, () => {
      it(`dovrebbe dire che il dna possiede l'elemento richiesto`, () => {
        const elementoNuovo = new Element(
          'bruno',
          'this/path',
          'supercool',
          1000,
          1000,
          100
        );
        elementoNuovo.description = 'Mascella svelta';
        newDna1.dna = [elementoNuovo];
        const res = newDna1.haElemento(elementoNuovo);
        expect(res).to.be.true;
      });
      it(`dovrebbe ritornare false`, () => {
        const elementoCheNonCe = new Element();
        const res = newDna1.haElemento(elementoCheNonCe);
        expect(res).to.be.false;
      });
      it(`dovrebbe lanciare un errore perchè l'argomento mandato non è della classe Elemento`, () => {
        const ARGOMENTOSBAGLIATO = 'sono sbagliato';
        const ERRORMESSAGE = `L'argomento inviato non è di tipo corretto, prova ad inviare un Elemento!`;
        expect(() => newDna1.haElemento(ARGOMENTOSBAGLIATO)).to.throw(
          ERRORMESSAGE
        );
      });
      it(`task description`, () => {
        newDna1.dna[2].description = 'Ascelle pezzate';
        newDna1.dna[3].description = "Naso d'amianto";
        log(newDna1.stringDna);
        log(newDna1.dna[2]);
      });
    });
  });
});
