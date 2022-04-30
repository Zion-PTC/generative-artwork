export class Attribute {
    #trait_type;
    #value;
    constructor(trait_type, value) {
        this.#trait_type = trait_type;
        this.#value = value;
    }
    get trait_type() {
        return this.#trait_type;
    }
    get value() {
        return this.#value;
    }
    set trait_type(trait_type) {
        this.#trait_type = trait_type;
    }
    set value(value) {
        this.#value = value;
    }
}
