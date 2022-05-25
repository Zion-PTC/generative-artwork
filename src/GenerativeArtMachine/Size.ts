import { zionUtil } from '@zionstate_node/zion-util';

export interface ISize {
  get width(): number;
  get height(): number;
  set width(width: number);
  set height(height: number);
  get ratio(): string;
  get stringRatio(): string;
}

// le dimensiondi dovrebbero essere proprietà di:
// • classe
// • layer
// • edizione
// • elemento: le dimensioni reali dell'immagine di riferimento
export class Size implements ISize {
  static #sizes: Size[] = [];
  static get sizes() {
    return this.#sizes;
  }
  #width: number;
  get width() {
    return this.#width;
  }
  set width(width) {
    this.#width = width;
  }
  #height: number;
  get height() {
    return this.#height;
  }
  set height(height) {
    this.#height = height;
  }
  #ratio: string;
  get ratio() {
    return this.#ratio;
  }
  get stringRatio(): string {
    return "I proomise I'll return";
  }
  constructor(width: number = 0, height: number = 0) {
    this.#width = width;
    this.#height = height;

    // TODO #2 far funzionare ratio
    // this.#ratio = zionUtil.convertDecimalToFracionString(
    //   this.#width / this.#height
    // );
    Size.#sizes.push(this);
  }
}
