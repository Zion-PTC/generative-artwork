import { IAttribute } from './Attribute.js';
import { Name, IName } from './Name.js';
interface INft_Metadata extends IName {
    get image(): URL;
    set image(image: URL);
    get external_url(): URL;
    get attributes(): IAttribute[];
    set attributes(attributes: IAttribute[]);
    èConnessoA(attributo: IAttribute): boolean;
}
/**
 * @param name Nome della collezione. Questo campo sarà il
 * campo che descrive la collezione sulla blockchain.
 * @param symbol Simbolo della collezione che verrà usato
 * per creare i token
 */
export declare class Nft_Metadata extends Name implements INft_Metadata {
    #private;
    static get nft_metadatas(): INft_Metadata[];
    static set nft_metadatas(nft_metadata: INft_Metadata[]);
    constructor(name: string, description: string, image: URL, external_url: URL, attributes: IAttribute[]);
    get image(): URL;
    get external_url(): URL;
    get attributes(): IAttribute[];
    set image(image: URL);
    set external_url(external_url: URL);
    set attributes(attributes: IAttribute[]);
    èConnessoA(attributo: IAttribute): boolean;
}
export {};
