// le dimensiondi dovrebbero essere proprietà di:
// • classe
// • layer
// • edizione
// • elemento: le dimensioni reali dell'immagine di riferimento
export class Size {
    static #sizes = [];
    static get sizes() {
        return this.#sizes;
    }
    #width;
    get width() {
        return this.#width;
    }
    set width(width) {
        this.#width = width;
    }
    #height;
    get height() {
        return this.#height;
    }
    set height(height) {
        this.#height = height;
    }
    #ratio;
    get ratio() {
        return this.#ratio;
    }
    get stringRatio() {
        return "I proomise I'll return";
    }
    constructor(width = 0, height = 0) {
        this.#width = width;
        this.#height = height;
        // TODO #2 far funzionare ratio
        // this.#ratio = zionUtil.convertDecimalToFracionString(
        //   this.#width / this.#height
        // );
        Size.#sizes.push(this);
    }
}
