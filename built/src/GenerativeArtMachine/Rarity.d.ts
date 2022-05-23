import { SystemEntity, ISystemEntity } from './SystemEntity.js';
export interface IRarity extends ISystemEntity<IRarity> {
    from?: number;
    to?: number;
    percentage?: number;
}
export declare class Rarity extends SystemEntity<Rarity> implements IRarity {
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
