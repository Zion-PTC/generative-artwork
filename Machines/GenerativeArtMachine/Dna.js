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
  set dna(_dna = []) {
    if (!zionUtil.checkObjectConstructor(_dna, Array)) {
      throw new Error(
        `È stato passato un oggetto che non è di tipo Array`
      );
    }
    _dna.forEach((element) => this.#dna.push(element));
    return this;
  }
  get dnaIds() {
    let servedArray = [];
    this.#dna.forEach((el) => {
      servedArray.push(el.id);
    });
    return servedArray;
  }
  constructor(dna = []) {
    this.#dna = dna;
    Dna.#dnas.push(this);
    this.id = Dna.#dnas.length;
  }
  #aggiungiIdAdArray(element) {
    console.log('element');
    servedArray.push(element.id);
    return servedArray;
  }
  haElemento(elemento) {
    if (zionUtil.checkObjectConstructor(elemento, Element))
      return this.#dna.some(
        (element) => element.id === elemento.id
      );
    else
      throw new Error(
        `L'argomento inviato non è di tipo corretto, prova ad inviare un Elemento!`
      );
  }
}
