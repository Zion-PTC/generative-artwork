import { expect } from 'chai';
import Mocha from 'mocha';
import { Estrazione } from '../../Machines/GeneratorMachine/Estrazione.js';
import { Picker } from '../../Machines/GeneratorMachine/Picker.js';
import { zionUtil } from '/Users/WAW/Documents/Projects/telegram-bots/Classes/_Node Standard Modules/zionUtil.js';

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

class Elemento {
  constructor(valore, peso) {
    this.valore = valore;
    this.peso = peso;
  }
}
let elementoA = new Elemento(1, 1);
let elementoB = new Elemento(2, 1);
let elementoC = new Elemento(3, 1);

let elementi = [elementoA, elementoB, elementoC];
let valoriDegliElementi = elementi.map(
  (elemento) => elemento.valore
);

describe(`STATIC METHODS`, () => {
  describe(`Method scegliACasoNumeroFraNumeri()`, () => {
    let numeri = [1, 2, 3, 4, 5];
    it(`Data una lista di numeri: ${JSON.stringify(
      numeri
    )} e ritorna un numero estratto a caso.`, () => {
      let numeroRandom1 =
        Picker.scegliACasoNumeroFraNumeri(numeri);
      let numeroRandom2 =
        Picker.scegliACasoNumeroFraNumeri(numeri);
      expect(numeroRandom1).not.to.be.null;
      expect(numeroRandom2).not.to.be.null;
      expect(numeri.includes(numeroRandom1)).to.be.true;
      expect(numeri.includes(numeroRandom2)).to.be.true;
    });
  });
  describe(`Method scegliACasoETogliElementoDaArray()`, () => {
    it.only(`dovrebbe scegliere un indice a caso e dovrebbe eliminare l'elemento scelto dall'array inviato`, () => {
      const ARRAYPROVA = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let newEstrazione = new Picker.Estrazione(ARRAYPROVA);
      let result =
        Picker.scegliACasoETogliElementoDaArray(
          newEstrazione
        );
      let result2 =
        Picker.scegliACasoETogliElementoDaArray(result);
      let result3 =
        Picker.scegliACasoETogliElementoDaArray(result2);
      expect(result3.arrayOriginale.length).to.be.equal(10);
      let result4 =
        Picker.scegliACasoETogliElementoDaArray(result3);
      expect(result4.elementiRimanenti.length).to.be.equal(
        6
      );
      let result5 =
        Picker.scegliACasoETogliElementoDaArray(result4);
      let result6 =
        Picker.scegliACasoETogliElementoDaArray(result5);
      let result7 =
        Picker.scegliACasoETogliElementoDaArray(result6);
      let result8 =
        Picker.scegliACasoETogliElementoDaArray(result7);
      let result9 =
        Picker.scegliACasoETogliElementoDaArray(result8);
      let result10 =
        Picker.scegliACasoETogliElementoDaArray(result9);
      expect(result10.elementiEstratti.length).to.be.equal(
        10
      );
      expect(result10.arrayOriginale.length).to.be.equal(
        10
      );
      expect(result10.elementiRimanenti.length).to.be.equal(
        0
      );
      expect(result10.elementoEstratto).to.be.not.null;
    });
  });
  describe(`Method calcolaPercentuale()`, () => {
    let risultati1 = [1, 2];
    let numero1 = 1;
    let risultati2 = [1, 2, 2, 2];
    it(
      `dovrebbe tornare la percentuale di volte che il numero: ${numero1},` +
        `\n\tè incluso nei primi risultati: [${risultati1}], e nei secondi risultati: [${risultati2}], ovvero rispettivamente 0.5 e 0.25`,
      () => {
        let percentuale1 = Picker.calcolaPercentuale(
          risultati1,
          numero1
        );
        let percentuale2 = Picker.calcolaPercentuale(
          risultati2,
          numero1
        );
        expect(percentuale1).to.be.equal(0.5);
        expect(percentuale2).to.be.equal(0.25);
      }
    );
  });
  describe(`Method quanteVolteEstratti()`, () => {
    let numeri,
      estrazione1,
      estrazione2,
      estrazione3,
      risultato1Atteso,
      risultato2Atteso,
      risultato3Atteso;
    numeri = [1, 2, 3, 4];
    estrazione1 = [1, 1, 2, 2, 3, 3, 4, 4];
    estrazione2 = [1, 1, 1, 1, 1, 1, 2, 3];
    estrazione3 = [1, 1, 1, 1, 1, 1, 1, 1];
    risultato1Atteso =
      '[[1,0.25],[2,0.25],[3,0.25],[4,0.25]]';
    risultato2Atteso =
      '[[1,0.75],[2,0.125],[3,0.125],[4,0]]';
    risultato3Atteso = '[[1,1],[2,0],[3,0],[4,0]]';
    it(`Riceve due argomenti:`, () => {
      //
    });
    it(`•numeri: [${numeri}],`, () => {});
    it(`•estrazione:[${estrazione1}]`, () => {});
    it(`e ritorna un array con il numero e la percentuale corrispondente,`, () => {});
    it(`risultato: ${risultato1Atteso}`, () => {
      let risultati1 = Picker.quanteVolteEstratti(
        numeri,
        estrazione1
      );
      expect(JSON.stringify(risultati1)).to.be.equal(
        risultato1Atteso
      );
      let risultati2 = Picker.quanteVolteEstratti(
        numeri,
        estrazione2
      );
      let risultati3 = Picker.quanteVolteEstratti(
        numeri,
        estrazione3
      );
      expect(JSON.stringify(risultati2)).to.be.equal(
        risultato2Atteso
      );
      expect(JSON.stringify(risultati3)).to.be.equal(
        risultato3Atteso
      );
    });
  });
  describe(`Method estraiERitornaPercentuali()`, () => {
    let valori, numeroEstrazioni, rispostaAttesa;
    valori = [1, 2, 3, 4, 5];
    numeroEstrazioni = 140000;
    rispostaAttesa =
      '[[1,0.20167857142857143],[2,0.19999285714285714],[3,0.19974285714285714],[4,0.1989642857142857],[5,0.19962142857142856]]';
    it(
      `Riceve un array con dei valori: [${valori}],` +
        `\n\ted un numero di estrazioni: ${numeroEstrazioni.toLocaleString()}.` +
        `\n\tRitorna un array di tuple[key,value]:` +
        `\n\t${rispostaAttesa}`,
      () => {
        //
        let risultati = Picker.estraiERitornaPercentuali(
          valori,
          numeroEstrazioni
        );
        expect(Array.isArray(risultati)).to.be.true;
        expect(Array.isArray(risultati[0])).to.be.true;
        expect(risultati[0][0]).to.be.equal(valori[0]);
      }
    );
    it(`Dovrebbe lanciare un errore perché il contenuto dell'array non sono numeri.`, () => {
      let ARGOMENTOSBAGLIATO1 = ['1', 'b', 'occa', 12];
      const ERRORMESSAGE =
        'La lista contiene elementi che non sono numeri';
      expect(() =>
        Picker.scegliACasoNumeroFraNumeri(
          ARGOMENTOSBAGLIATO1
        )
      ).to.throw(ERRORMESSAGE);
    });
  });
  describe(`Method creaObjWithKeysEMedie()`, () => {
    let tuple1,
      tuple2,
      tuple3,
      tuple4,
      tuple5,
      tuple6,
      arrayDiTuple1,
      arrayDiTuple2,
      arrayDiArrayDiTuple,
      risultatoAtteso;
    tuple1 = [1, 0.5];
    tuple2 = [2, 0.5];
    tuple3 = [3, 0.5];
    tuple4 = [1, 0.2];
    tuple5 = [2, 0.2];
    tuple6 = [3, 0.2];
    arrayDiTuple1 = [tuple1, tuple2, tuple3];
    arrayDiTuple2 = [tuple4, tuple5, tuple6];
    arrayDiArrayDiTuple = [arrayDiTuple1, arrayDiTuple2];
    risultatoAtteso =
      '{"1":{"media":0.35},"2":{"media":0.35},"3":{"media":0.35}}';
    it(`Riceve un array di array di tuple: ${JSON.stringify(
      arrayDiArrayDiTuple
    )}, e ritorna un oggetto con key value della tuple`, () => {
      //
      let obj = Picker.creaObjWithKeysEMedie(
        arrayDiArrayDiTuple
      );
      expect(JSON.stringify(obj)).to.be.equal(
        risultatoAtteso
      );
    });
  });
  describe(`Method estraiConCalbacknVolte()`, () => {
    let numeriFraIQualiEstrarre, volte, callback;
    numeriFraIQualiEstrarre = [1, 2, 3];
    volte = 10;
    callback = Picker.scegliACasoNumeroFraNumeri;
    it(
      `Riceve un array con i valore da estrarre: ${JSON.stringify(
        numeriFraIQualiEstrarre
      )}, e ritorna un array contenente i numeri estratti con il metodo: ${
        callback.name
      }(),` + `\n\tchiamato ${volte} volte.`,
      () => {
        //

        let risultati = Picker.estraiConCallbacknVolte(
          numeriFraIQualiEstrarre,
          volte,
          callback
        );
        expect(Array.isArray(risultati)).to.be.true;
        expect(risultati.length).to.be.equal(volte);
      }
    );
  });
  describe(`Method chiamaNVolteCallback`, () => {
    let volte, valori, numeroEstrazioni, callback;
    volte = 30;
    valori = valoriDegliElementi;
    numeroEstrazioni = 3000;
    callback = Picker.estraiERitornaPercentuali;
    it(
      `Riceve il numero di volte: ${volte.toLocaleString()}, che deve essere chiamata la callback: ${
        callback.name
      }(),` +
        `\n\tdati gli elementi pesati:${JSON.stringify(
          elementi
        )} i cui valori ${JSON.stringify(
          valori
        )}, vengono estratti ${volte.toString()} volte`,
      () => {
        //
        let array = Picker.chiamaNVolteCallback(
          volte,
          valori,
          numeroEstrazioni,
          callback
        );
        expect(array.length).to.be.equal(volte);
      }
    );
  });
});
