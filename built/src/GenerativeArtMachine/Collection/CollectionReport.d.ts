import { IDna } from '../Dna.js';
export declare class CollectionReport {
    name: string;
    classes: [number, string][];
    rarities: [number, string][];
    layers: [number, string][];
    elements: [number, string][];
    possibleCombinations: {
        perRarity: {
            [key: string]: number;
        };
        totali: number;
    };
    supply: number;
    extractableCombinations: IDna[];
    constructor(name: string, classes: [number, string][], rarities: [number, string][], layers: [number, string][], elements: [number, string][], possibleCombinations: {
        perRarity: {
            [key: string]: number;
        };
        totali: number;
    }, supply: number, extractableCombinations: IDna[]);
}
