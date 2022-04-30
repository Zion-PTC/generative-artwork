export interface IName {
  get name(): string;
  get description(): string;
  get nameAndDescription(): string;
  set name(name: string);
  set description(description: string);
}

export class Name {
  #name;
  #description;
  constructor(name, description) {
    this.#name = name;
    this.#description = description;
  }
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }
  get nameAndDescription() {
    return `Name of the NFT:${this.name}.\nDescription of this NFT: ${this.description}`;
  }
  set name(name) {
    this.#name = name;
  }
  set description(description) {
    this.#description = description;
  }
}
