export class CollectionDetails {
  #supply;
  constructor(name, symbol, supply, baseURI, description) {
    this.name = name;
    this.symbol = symbol;
    this.#supply = supply;
    this.baseURI = baseURI;
    this.description = description;
  }
  get supply() {
    return this.#supply;
  }
  set supply(supply) {
    return (this.#supply = supply);
  }
  get type() {
    return this.#type;
  }
  set type(type) {
    this.#type = type;
  }
}
