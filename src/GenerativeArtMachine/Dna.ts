import { Image } from '@zionrepack/canvas';
import { zionUtil } from '@zionstate_node/zion-util';
import { Element, IElement } from './Element.js';

export interface IDna {
  name: string;
  get stringDna(): string;
  get combination(): IElement[];
  set combination(combination: IElement[]);
  get elementsIds(): (string | number)[];
  get layeredImages(): Promise<(Image | undefined)[]>;
  haElemento(elemento: IElement): boolean;
}

export class Dna implements IDna {
  // STATICS
  static #dnas: Dna[] = [];
  static get dnas() {
    return Dna.#dnas;
  }
  // PROPERTIES
  #combination: IElement[];
  get combination(): IElement[] {
    return this.#combination;
  }
  set combination(combination: IElement[]) {
    if (!zionUtil.checkObjectConstructor(combination, Array)) {
      throw new Error(`È stato passato un oggetto che non è di tipo Array`);
    }
    combination.forEach(element => this.#combination.push(element));
  }
  // GETTERS
  get stringDna() {
    let servedArray: string[] = [];
    this.combination.forEach(element => {
      servedArray.push(element.description);
    });
    return `Questa edizione ha le seguenti caratteristiche: ${servedArray.join(
      ', '
    )}`;
  }
  get elementsIds(): (string | number)[] {
    let servedArray: (string | number)[] = [];
    this.#combination.forEach(el => {
      servedArray.push(el.id);
    });
    return servedArray;
  }
  get layeredImages(): Promise<(Image | undefined)[]> {
    return new Promise(async (res, rej) => {
      let map = this.combination.map(
        element => element.loadedImage?.canvasLoadImage
      );
      let result = await Promise.all(map);
      res(result);
    });
  }
  name: string;
  id: number;
  constructor(combination: IElement[] = [], name: string) {
    this.name = name; // TODO creare un nomde identificativo magari usando UUID
    this.#combination = combination;
    Dna.#dnas.push(this);
    this.id = Dna.#dnas.length;
  }
  haElemento(elemento: IElement): boolean {
    if (zionUtil.checkObjectConstructor(elemento, Element))
      return this.#combination.some(element => element.id === elemento.id);
    else
      throw new Error(
        `L'argomento inviato non è di tipo corretto, prova ad inviare un Elemento!`
      );
  }
}
