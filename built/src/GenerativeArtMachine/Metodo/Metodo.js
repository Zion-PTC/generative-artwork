export class Metodo {
    name;
    metodo;
    static #metodi = [];
    static get metodi() {
        return Metodo.#metodi;
    }
    static findMetodo(name) {
        if (!Metodo.#metodi)
            throw new Error('no metodi');
        let res = Metodo.#metodi.find(metodo => metodo.name === name);
        if (!res)
            throw new Error('no match');
        return res.metodo;
    }
    constructor(name, metodo) {
        this.name = name;
        this.metodo = metodo;
        Metodo.#metodi.push(this);
    }
}
