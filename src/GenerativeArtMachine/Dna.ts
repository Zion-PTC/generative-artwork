import { zionUtil } from '@zionstate_node/zion-util';
import { Element, IElement } from './Element.js';

export interface IDna {
  name: string;
  get stringDna(): string;
  get dna(): IElement[];
  set dna(dna: IElement[]);
  get elementsIds(): (string | number)[];
  haElemento(elemento: IElement): boolean;
}

export class Dna implements IDna {
  static #dnas: Dna[] = [];
  static get dnas() {
    return Dna.#dnas;
  }
  name: string;
  id: number;
  get stringDna() {
    let servedArray: string[] = [];
    this.dna.forEach(element => {
      servedArray.push(element.description);
    });
    return `Questa edizione ha le seguenti caratteristiche: ${servedArray.join(
      ', '
    )}`;
  }
  #dna: IElement[];
  get dna(): IElement[] {
    return this.#dna;
  }
  set dna(_dna) {
    if (!zionUtil.checkObjectConstructor(_dna, Array)) {
      throw new Error(`È stato passato un oggetto che non è di tipo Array`);
    }
    _dna.forEach(element => this.#dna.push(element));
  }
  get elementsIds(): (string | number)[] {
    let servedArray: (string | number)[] = [];
    this.#dna.forEach(el => {
      servedArray.push(el.id);
    });
    return servedArray;
  }
  constructor(dna: IElement[] = [], name: string) {
    this.name = name;
    this.#dna = dna;
    Dna.#dnas.push(this);
    this.id = Dna.#dnas.length;
  }
  #aggiungiIdAdArray(element: IElement) {
    let servedArray = [];
    // console.log('element');
    servedArray.push(element.id);
    return servedArray;
  }
  haElemento(elemento: IElement): boolean {
    if (zionUtil.checkObjectConstructor(elemento, Element))
      return this.#dna.some(element => element.id === elemento.id);
    else
      throw new Error(
        `L'argomento inviato non è di tipo corretto, prova ad inviare un Elemento!`
      );
  }
}
