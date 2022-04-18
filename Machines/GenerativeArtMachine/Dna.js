import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Element } from './Element.js';

export class Dna {
  static #dnas = [];
  #dna = [];
  static get dnas() {
    return this.#dnas;
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
    if (!zionUtil.checkObjectConstructor(dna, Element)) {
      throw new Error(
        `È stato passato un oggetto che non è di tipo Element`
      );
    }
    this.#dna.push(dna);
    return this;
  }
  constructor() {
    Dna.#dnas.push(this);
    this.id = Dna.#dnas.length;
  }
}
