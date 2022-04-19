import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Element } from './Element.js';

export class Dna {
  static #dnas = [];
  #dna;
  static get dnas() {
    return Dna.#dnas;
  }
  get stringDna() {
    let servedArray = [];
    this.dna.forEach((element) => {
      servedArray.push(element.description);
    });
    return `Questa edizione ha le seguenti caratteristiche: ${servedArray.join(
      ', '
    )}`;
  }
  get dna() {
    return this.#dna;
  }
  set dna(dna) {
    if (!zionUtil.checkObjectConstructor(dna, Array)) {
      throw new Error(
        `È stato passato un oggetto che non è di tipo Array`
      );
    }
    return (this.#dna = dna);
  }
  get dnaIds() {
    let servedArray = [];
    this.#dna.forEach((el) => {
      servedArray.push(el.id);
    });
    return servedArray;
  }
  constructor(dna = []) {
    this.dna = dna;
    Dna.#dnas.push(this);
    this.id = Dna.#dnas.length;
  }
  #aggiungiIdAdArray(element) {
    console.log('element');
    servedArray.push(element.id);
    return servedArray;
  }
  haElemento() {}
}
