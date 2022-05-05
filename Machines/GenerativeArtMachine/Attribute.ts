export interface IAttribute {
  get trait_type(): string;
  set trait_type(trait_type: string);
  get value(): string;
  set value(value: string);
}

export class Attribute implements IAttribute {
  #trait_type: string;
  #value: string;
  constructor(trait_type: string, value: string) {
    this.#trait_type = trait_type;
    this.#value = value;
  }
  get trait_type(): string {
    return this.#trait_type;
  }
  get value(): string {
    return this.#value;
  }
  set trait_type(trait_type) {
    this.#trait_type = trait_type;
  }
  set value(value) {
    this.#value = value;
  }
}
