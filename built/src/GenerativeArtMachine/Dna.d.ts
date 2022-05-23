import { IElement } from './Element.js';
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
    static get dnas(): Dna[];
    name: string;
    id: number;
    get stringDna(): string;
    get dna(): IElement[];
    set dna(_dna: IElement[]);
    get elementsIds(): (string | number)[];
    constructor(dna: IElement[] | undefined, name: string);
    haElemento(elemento: IElement): boolean;
}
