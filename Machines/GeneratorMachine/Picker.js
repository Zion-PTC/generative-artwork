import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Media } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil/Media.js';

export class Picker {
  /**
   *
   * @param {number[]} listaDiNumeri lista di numeri fra i
   * quali estrarre.
   * @returns {number} ritorna un numero a caso.
   */
  static scegliACasoNumeroFraNumeri(listaDiNumeri = []) {
    let condizione = zionUtil.checkArrayElementsConstructor(
      listaDiNumeri,
      Number
    );
    if (condizione) {
      throw new Error(
        `La lista contiene elementi che non sono numeri`
      );
    }
    const elementoRandom =
      Picker.scegliACasoNumeroFraElementi(listaDiNumeri);
    return elementoRandom;
  }
  static scegliACasoNumeroFraElementi(
    listaDiElementi = []
  ) {
    const elementoRandom =
      listaDiElementi[
        Math.floor(Math.random() * listaDiElementi.length)
      ];
    return elementoRandom;
  }
  /**
   *
   * @param {number[]} risultati array contenente dei
   * valori.
   * @param {number} numero numero per il quale bisogna
   * calcolare la percentuale di volte che è presente nei
   * risultati.
   * @returns {number} ritornare un valore percentuale
   * espresso in decimali
   */
  static calcolaPercentuale(risultati = [], numero) {
    let volteEstratto = [];
    risultati.forEach((risultato) => {
      if (risultato === numero) {
        volteEstratto.push(risultato);
      }
    });
    let nRisultati = risultati.length;
    let nVolteEstratto = volteEstratto.length;
    let percentuale = nVolteEstratto / nRisultati;
    return percentuale;
  }
  /**
   *
   * @param {number[]} elementi
   * @param {number[]} estrazioni
   * @returns {number[][]}
   */
  static quanteVolteEstratti(numeri = [], estrazione) {
    let risultati = [];
    numeri.forEach((elemento) => {
      risultati.push([
        elemento,
        Picker.calcolaPercentuale(estrazione, elemento),
      ]);
    });
    return risultati;
  }
  /**
   *
   * @param {number[]} valori array contenete i valori da
   * analizzare
   * @param {number} numeroEstrazioni array contenente i
   * valori estratti\
   * @returns {number[][]} array contenente una tuple key
   * value(percentuale) per ogni valore contenuto nelle
   * estrazioni.
   */
  static estraiERitornaPercentuali(
    valori,
    numeroEstrazioni
  ) {
    let estrazioni = Picker.estraiConCallbacknVolte(
      valori,
      numeroEstrazioni,
      Picker.scegliACasoNumeroFraNumeri
    );
    let risultati = Picker.quanteVolteEstratti(
      valori,
      estrazioni
    );
    return risultati;
  }
  /**
   *
   * @param {*[][][]} array un array di array di tuple
   * @returns {object}
   */
  static creaObjWithKeysEMedie(
    array = [
      [[], []],
      [[], []],
    ]
  ) {
    let obj = {};
    array[0].forEach((el) => {
      obj[el[0]] = { risultati: [], media: null };
    });
    while (array.length > 0) {
      let currentResults = array.shift();
      currentResults.forEach((currentResult) => {
        obj[currentResult[0]].risultati.push(
          currentResult[1]
        );
      });
    }
    const calcolaMediaPerOgniKey = function (obj = {}) {
      for (let key in obj) {
        let media = new Media(obj[key].risultati).valore;
        obj[key].media = media;
        delete obj[key].risultati;
      }
      return obj;
    };
    obj = calcolaMediaPerOgniKey(obj);
    return obj;
  }
  /**
   *
   * @param {number[]} numeriFraIQualiEstrarre array con i
   * valori da estrarre.
   * @param {number} volte numero di volte che viene
   * chiamata la callback
   * @param {function} callback callback function
   * @returns {number[]}
   */
  static estraiConCallbacknVolte(
    numeriFraIQualiEstrarre,
    volte,
    callback
  ) {
    let risultati = [];
    while (volte) {
      risultati.push(callback(numeriFraIQualiEstrarre));
      volte--;
    }
    return risultati;
  }
  /**
   *
   * @param {number} volte numero di volte che viene
   * chiamata la callback
   * @param {number[]} valori array contenente i valori da
   * estrarre.
   * @param {number} numeroEstrazioni numero di volte che
   * verrà effettuata l'estrazione.
   * @param {function} callback funzione di estrazione.
   * @returns {number[][][]} array di array di tuple
   */
  static chiamaNVolteCallback(
    volte,
    valori,
    numeroEstrazioni,
    callback
  ) {
    let array = [];
    while (volte) {
      array.push(callback(valori, numeroEstrazioni));
      volte--;
    }
    return array;
  }
}
