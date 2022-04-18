import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';

// le dimensiondi dovrebbero essere proprietà di:
// • classe
// • layer
// • edizione
// • elemento: le dimensioni reali dell'immagine di riferimento
export class Size {
  static #sizes = [];
  #width;
  #height;
  #ratio;
  constructor(width = 0, height = 0) {
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
    return (this.#width = width);
  }
  set height(height) {
    return (this.#height = height);
  }
  get ratio() {
    return this.#ratio;
  }
}
