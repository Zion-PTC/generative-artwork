export declare class Metodo {
    #private;
    name: string;
    metodo: Function;
    static get metodi(): Metodo[];
    static findMetodo(name: string): Function;
    constructor(name: string, metodo: Function);
}
