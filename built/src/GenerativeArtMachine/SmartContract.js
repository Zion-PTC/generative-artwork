export class SmartContract {
    name;
    symbol;
    baseURI;
    description;
    #supply;
    get supply() {
        return this.#supply;
    }
    set supply(supply) {
        this.#supply = supply;
    }
    #type;
    get type() {
        return this.#type;
    }
    set type(type) {
        this.#type = type;
    }
    constructor(name, symbol, supply, baseURI, description) {
        this.name = name;
        this.symbol = symbol;
        this.baseURI = baseURI;
        this.description = description;
        this.name = name;
        this.symbol = symbol;
        this.#supply = supply;
        this.baseURI = baseURI;
        this.description = description;
    }
}
