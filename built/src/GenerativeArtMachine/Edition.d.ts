import { Dna } from './Dna.js';
import { Element } from './Element.js';
import { SystemEntity, ISystemEntity } from './SystemEntity.js';
export interface IEdition extends ISystemEntity<IEdition> {
    drawEdition(): void;
}
export declare class Edition extends SystemEntity<Edition> implements IEdition {
    dna: Dna;
    constructor(name: string, path: string, type: number, width: number, height: number, dna: Element[]);
    drawEdition(): void;
}
