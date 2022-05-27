import { IDna } from './Dna.js';
import { SystemEntity, ISystemEntity } from './SystemEntity.js';
export interface IEdition extends ISystemEntity<IEdition> {
    dna: IDna;
    drawEdition(): IEdition;
}
export declare class Edition extends SystemEntity<Edition> implements IEdition {
    #private;
    dna: IDna;
    constructor(name: string, path: string, type: number, width: number, height: number, dna: IDna);
    drawEdition(): IEdition;
}
