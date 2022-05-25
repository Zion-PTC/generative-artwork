export class SmartContract {
    name;
    symbol;
    _supply;
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
    constructor(name, symbol, _supply, baseURI, description) {
        this.name = name;
        this.symbol = symbol;
        this._supply = _supply;
        this.baseURI = baseURI;
        this.description = description;
        this.name = name;
        this.symbol = symbol;
        this.#supply = _supply;
        this.baseURI = baseURI;
        this.description = description;
    }
}
