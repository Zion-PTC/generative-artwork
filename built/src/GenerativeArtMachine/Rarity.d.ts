import { IDna } from './Dna.js';
import { IEdition } from './Edition.js';
import { IElement } from './Element.js';
import { SystemEntity, ISystemEntity } from './SystemEntity';
export interface IRarity extends ISystemEntity<IRarity> {
    from: number;
    to: number;
    percentage: number;
    get elementsByLayer(): IElement[];
    get possibiliDna(): IDna[];
    creaEdizione?(): IEdition;
    creaEdizioneNVolte?(): IEdition[];
    creaTutteLeEdizioni?(): IEdition[];
}
export declare class Rarity extends SystemEntity<Rarity> {
    name: string;
    type: number;
    constructor(name: string, type: number);
}
export declare class RarityByEdition extends Rarity {
    name: string;
    type: number;
    percentage: number;
    from: number;
    to: number;
    constructor(name: string, type: number, percentage: number, from: number, to: number);
}
export declare class RarityByElement extends Rarity {
    name: string;
    type: number;
    percentage: number;
    constructor(name: string, type: number, percentage: number);
}
