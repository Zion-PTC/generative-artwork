export interface ISmartContract {
  name: string;
  symbol: string;
  get supply(): number;
  set supply(supply: number);
  get type(): string;
  set type(type: string);
}

export class SmartContract {
  #supply;
  #type;
  name;
  symbol;
  baseURI;
  description;
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
    this.#supply = supply;
  }
  get type() {
    return this.#type;
  }
  set type(type) {
    this.#type = type;
  }
}