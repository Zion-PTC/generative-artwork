import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';

export interface ISize {
  get width(): number;
  get height(): number;
  set width(width: number);
  set height(height: number);
  get ratio(): number;
  get stringRatio(): string;
}

// le dimensiondi dovrebbero essere proprietà di:
// • classe
// • layer
// • edizione
// • elemento: le dimensioni reali dell'immagine di riferimento
export class Size implements ISize {
  static #sizes: ISize[] = [];
  #width: number;
  #height: number;
  #ratio: number;
  constructor(width: number = 0, height: number = 0) {
    this.#width = width;
    this.#height = height;
    // this.#ratio = zionUtil.convertDecimalToFracionString(
    //   this.#width / this.#height
    // );
    Size.#sizes.push(this);
  }
  static get sizes() {
    return this.#sizes;
  }
  get width() {
    return this.#width;
  }
  get height() {
    return this.#height;
  }
  set width(width) {
    this.#width = width;
  }
  set height(height) {
    this.#height = height;
  }
  get ratio() {
    return this.#ratio;
  }
  get stringRatio(): string {
    return "I proomise I'll return";
  }
}

export function mitroviovunque() {
  console.log('mi trovi ovunque');
}
