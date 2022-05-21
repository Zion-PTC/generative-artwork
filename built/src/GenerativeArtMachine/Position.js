export class Position {
    static #positions = [];
    #x;
    #y;
    constructor(x, y) {
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
