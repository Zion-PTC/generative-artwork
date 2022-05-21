import { Element, IElement } from './Element.js';
export interface IDna {
    name: string;
    get stringDna(): string;
    get dna(): IElement[];
    set dna(dna: IElement[]);
    get elementsIds(): (string | number)[];
    haElemento(elemento: IElement): boolean;
}
export declare class Dna implements IDna {
    #private;
    name: string;
    id: number;
    static get dnas(): Dna[];
    get stringDna(): string;
    get dna(): IElement[];
    set dna(_dna: IElement[]);
    get elementsIds(): (string | number)[];
    constructor(dna: Element[] | undefined, name: string);
    haElemento(elemento: IElement): boolean;
}
