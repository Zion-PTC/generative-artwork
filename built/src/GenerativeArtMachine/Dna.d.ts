import { Image } from '@zionrepack/canvas';
import { IElement } from './Element.js';
export interface IDna {
    name: string;
    get stringDna(): string;
    get combination(): IElement[];
    set combination(combination: IElement[]);
    get elementsIds(): (string | number)[];
    get layeredImages(): Promise<(Image | undefined)[]>;
    haElemento(elemento: IElement): boolean;
}
export declare class Dna implements IDna {
    #private;
    static get dnas(): Dna[];
    get combination(): IElement[];
    set combination(combination: IElement[]);
    get stringDna(): string;
    get elementsIds(): (string | number)[];
    get layeredImages(): Promise<(Image | undefined)[]>;
    name: string;
    id: number;
    constructor(combination: IElement[] | undefined, name: string);
    haElemento(elemento: IElement): boolean;
}
