import { SmartContract, ISmartContract } from './SmartContract.js';
import { IDrawer } from './Drawer.js';
import { IRarity } from './Rarity.js';
import { ILayer } from './Layer.js';
import { IElement } from './Element.js';
import { IClass } from './Class.js';
import { IPicker } from '@zionstate/generator';
import { IDna } from './Dna.js';
import { IEdition } from './Edition.js';
import { ISystemEntity } from './SystemEntity.js';
declare type SystemEntities = IClass | IElement | IEdition | ILayer;
/**
 * @param id identificativo della collezione
 *
 */
export interface ICollection extends ISmartContract {
    get id(): number;
    set id(id: number);
    set type(type: number);
    get path(): string;
    set path(path: string);
    get type(): number;
    get outputPath(): string;
    set outputPath(outputPath: string);
    get drawer(): IDrawer;
    get rarities(): IRarity[];
    get layers(): ILayer[];
    get elements(): IElement[];
    get classes(): IClass[];
    get nodes(): ISystemEntity<SystemEntities>[];
    set nodes(node: ISystemEntity<SystemEntities>[]);
    get collectionPath(): string;
    get nodeNames(): string;
    get nodesIds(): number;
    get elementsByLayer(): IElement[][];
    get elementsByLayerByRarity(): IElement[][];
    get possibiliDna(): IDna[];
    get possibiliDnaPerRarità(): IDna[][];
    hasDir(): boolean;
    creaDirectory(): ICollection;
    creaEdizione(classe: IClass): IEdition;
    creaEdizioneNVolte(volte: number): IEdition[];
    creaTutteLeEdizioni(): IEdition[];
}
export declare class Collection extends SmartContract {
    #private;
    static get collections(): Collection[];
    static collectionExists(name: string): boolean;
    static deleteCollection(name: string): Collection[];
    picker: IPicker<IDna> | undefined;
    get id(): string | number | undefined;
    set id(id: string | number | undefined);
    get path(): string | undefined;
    set path(path: string | undefined);
    get type(): string;
    set type(type: string);
    get outputPath(): string | undefined;
    set outputPath(outputPath: string | undefined);
    get drawer(): IDrawer | undefined;
    get rarities(): IRarity[];
    get layers(): ILayer[];
    get elements(): IElement[];
    /**
     * @returns {Class[]}
     */
    get classes(): IClass[];
    get nodes(): ISystemEntity<SystemEntities>[];
    set nodes(nodes: ISystemEntity<SystemEntities>[]);
    get nodeNames(): string[];
    get nodesIds(): (string | number)[];
    get collectionPath(): string;
    /**
     * Ritorna un array con degli array contenenti gli
     * elementi di ogni layer. Dovrebbe contenere un numero di
     * array uguale al numero di layer della collezione.
     * @returns {Element[]}
     */
    get elementsByLayer(): IElement[][];
    /**
     * Ritorna un array contenente un array per ogni rarità.
     * Ogni array a sua volta contiene un array per ogni
     * layer. Ognuno di questi array contiene gli elementi del
     * layer raggruppati in sostanza per rarità.
     */
    get elementsByLayerByRarity(): IElement[][][];
    get possibiliDna(): IDna[];
    get possibiliDnaPerRarità(): IDna[][];
    /**
     * @param {string} name nome della collezione
     * @param {string} path percorso della cartella contenente i dati della collezione
     * @param {string} baseUri percorso base per gli oggetti della collezione. Questo dato è quello che apparirà nei metadata degli NFT.
     */
    constructor(name: string, symbol: string | undefined, supply: number | undefined, baseURI: URL, description?: string, path?: string, type?: 'Edition' | 'Element', outputPath?: string, width?: number, height?: number);
    hasDir(): boolean | undefined;
    creaDirectory(): this | undefined;
    /**
     * Accetta un lista di array, che corrisponde ai layer
     * dell'immagine. Ogni arrai contiene gli elementi da combinare.
     * @returns {Dna}
     */
    creaEdizione(classe: IClass): IEdition;
    creaEdizioneNVolte(volte: number, classe: IClass): IEdition[];
    creaTutteLeEdizioni(): void;
}
export {};
