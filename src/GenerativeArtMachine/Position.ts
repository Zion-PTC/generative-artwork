export interface IPosition {
  get x(): number;
  get y(): number;
  set x(x: number);
  set y(y: number);
}

export class Position implements IPosition {
  static #positions: IPosition[] = [];
  #x: number;
  #y: number;
  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
    Position.#positions.push(this);
  }
  static get positions() {
    return this.#positions;
  }
  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }
  set x(x) {
    this.#x = x;
  }
  set y(y) {
    this.#y = y;
  }
}
