import { zionUtil } from '@zionstate_node/zion-util';
import { Element } from './Element.js';
export class Dna {
    // STATICS
    static #dnas = [];
    static get dnas() {
        return Dna.#dnas;
    }
    // PROPERTIES
    #combination;
    get combination() {
        return this.#combination;
    }
    set combination(combination) {
        if (!zionUtil.checkObjectConstructor(combination, Array)) {
            throw new Error(`È stato passato un oggetto che non è di tipo Array`);
        }
        combination.forEach(element => this.#combination.push(element));
    }
    // GETTERS
    get stringDna() {
        let servedArray = [];
        this.combination.forEach(element => {
            servedArray.push(element.description);
        });
        return `Questa edizione ha le seguenti caratteristiche: ${servedArray.join(', ')}`;
    }
    get elementsIds() {
        let servedArray = [];
        this.#combination.forEach(el => {
            servedArray.push(el.id);
        });
        return servedArray;
    }
    name;
    id;
    constructor(combination = [], name) {
        this.name = name; // TODO creare un nomde identificativo magari usando UUID
        this.#combination = combination;
        Dna.#dnas.push(this);
        this.id = Dna.#dnas.length;
    }
    haElemento(elemento) {
        if (zionUtil.checkObjectConstructor(elemento, Element))
            return this.#combination.some(element => element.id === elemento.id);
        else
            throw new Error(`L'argomento inviato non è di tipo corretto, prova ad inviare un Elemento!`);
    }
}
