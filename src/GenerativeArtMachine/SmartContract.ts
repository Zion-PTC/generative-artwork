export interface ISmartContract {
  name: string;
  symbol: string;
  get supply(): number;
  set supply(supply: number);
  get type(): string;
  set type(type: string);
}

export class SmartContract {
  #supply: number;
  get supply() {
    return this.#supply;
  }
  set supply(supply) {
    this.#supply = supply;
  }
  #type?: string;
  get type() {
    return this.#type;
  }
  set type(type) {
    this.#type = type;
  }
  constructor(
    public name: string,
    public symbol: string,
    supply: number,
    public baseURI: URL,
    public description: string
  ) {
    this.name = name;
    this.symbol = symbol;
    this.#supply = supply;
    this.baseURI = baseURI;
    this.description = description;
  }
}
