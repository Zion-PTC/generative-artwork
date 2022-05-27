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
import { CollectionReport } from './Collection/CollectionReport.js';
import { EditionsReport } from './Collection/EditionsReport.js';
declare type SystemEntities = IClass | IElement | IEdition | ILayer;
/**
 * @param {number} id identificativo della collezione
 * @param {string} name nome della collezione
 * @param {string} symbol simbolo della collezione che verrà usato per creare i token
 * @param {string} supply quantità di token della collezione
 * @param {string} baseURI percorso base per gli oggetti della collezione. Questo dato è quello che apparirà nei metadata degli NFT.
 * @param {string} description descrizione della collezione che apparirà sulla blockchain
 * @param {string} path percorso del root della collezione contenente i dati della collezione
 * @param {string} type tipo di collezione ('Edition' o 'Element')
 */
export interface ICollection extends ISmartContract {
    get id(): number;
    set id(id: number);
    get path(): string;
    set path(path: string);
    get type(): string;
    set type(type: string);
    get outputPath(): string;
    set outputPath(outputPath: string);
    get editions(): IEdition[];
    set editions(editions: IEdition[]);
    get editionsReport(): EditionsReport;
    set editionsReport(editionReport: EditionsReport);
    get nodes(): ISystemEntity<SystemEntities>[];
    set nodes(node: ISystemEntity<SystemEntities>[]);
    get drawer(): IDrawer;
    get rarities(): IRarity[];
    get layers(): ILayer[];
    get elements(): IElement[];
    get classes(): IClass[];
    get collectionPath(): string;
    get nodeNames(): string[];
    get nodesIds(): (string | number)[];
    get elementsByLayer(): IElement[][];
    get gruppiDna(): [string[], IDna[], number][];
    get possibiliDna(): IDna[];
    get report(): CollectionReport;
    hasDir(): boolean;
    creaDirectory(): Collection;
    creaEdizione(classe: IClass): IEdition;
    creaEdizioni(volte: number, classe: IClass): IEdition[];
    creaTutteLeEdizioni(): IEdition[];
    stampaEdizione(edizione: IEdition): Promise<ICollection>;
    possibiliDnaPerLayer(rarities: IRarity[]): IDna[];
}
export declare class Collection extends SmartContract implements ICollection {
    #private;
    static get collections(): Collection[];
    static collectionExists(name: string): boolean;
    static deleteCollection(name: string): Collection[];
    get id(): number;
    set id(id: number);
    get path(): string;
    set path(path: string);
    get type(): string;
    set type(type: string);
    get outputPath(): string;
    set outputPath(outputPath: string);
    get editions(): IEdition[];
    set editions(editions: IEdition[]);
    get nodes(): ISystemEntity<SystemEntities>[];
    set nodes(nodes: ISystemEntity<SystemEntities>[]);
    get editionsReport(): EditionsReport;
    set editionsReport(editionReport: EditionsReport);
    get drawer(): IDrawer;
    get rarities(): IRarity[];
    get layers(): ILayer[];
    get elements(): IElement[];
    get classes(): IClass[];
    /**
     *
     */
    get nodeNames(): string[];
    /**
     *
     */
    get nodesIds(): (string | number)[];
    /**
     *
     */
    get collectionPath(): string;
    /**
     * Ritorna un array con degli array contenenti gli
     * elementi di ogni layer. Dovrebbe contenere un numero di
     * array uguale al numero di layer della collezione.
     * @returns {Element[]}
     */
    get elementsByLayer(): IElement[][];
    /**
     *
     */
    get possibiliDna(): IDna[];
    /**
     * @returns Ritorna una lista di tuple
     */
    get gruppiDna(): [string[], IDna[], number][];
    /**
     * @returns Ritorna una lista contenente un gruppo di DNA
     */
    get gruppiDnaPuri(): [string[], IDna[], number][];
    /**
     *
     */
    get gruppiDnaImpuri(): [string[], IDna[], number][];
    /**
     *
     */
    get report(): CollectionReport;
    picker: IPicker<IDna>;
    /**
     *
     * @param name Nome della collezione.
     * @param symbol Symbolo della collezione (ticker blockchain).
     * @param supply Quantità di token.
     * @param baseURI Base URI per la collezione (URL)
     * @param description Descrizione della collezione-
     * @param path Percorso dei files.
     * @param type Tipo di collezione.
     * @param outputPath percorso dove vengono renderizzati i files.
     * @param width Larghezza dell'immagine.
     * @param height Altezza dell'immagine.
     */
    constructor(name: string, symbol: string, supply: number, baseURI: URL, description: string, path: string, type: 'Edition' | 'Element', outputPath: string, width?: number, height?: number);
    hasDir(): boolean;
    /**
     * crea una directory
     * @returns {Collection}
     */
    creaDirectory(): Collection;
    /**
     * Accetta un lista di array, che corrisponde ai layer
     * dell'immagine. Ogni arrai contiene gli elementi da combinare.
     * @returns {Dna}
     */
    creaEdizione(classe: IClass): IEdition;
    creaEdizioni(volte: number, classe: IClass): IEdition[];
    creaTutteLeEdizioni(): IEdition[];
    stampaEdizione(edizione: IEdition): Promise<ICollection>;
    /**
     *
     */
    possibiliDnaPerLayer: (rarities: IRarity[]) => IDna[];
}
export {};
