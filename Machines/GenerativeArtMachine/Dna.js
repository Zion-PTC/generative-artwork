export class Dna {
  static #dnas = [];
  constructor() {
    this.dna = [];
    Dna.#dnas.push(this);
    this.id = Dna.#dnas.length;
  }
}
