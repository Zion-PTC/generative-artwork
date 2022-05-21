import { Name } from './Name.js';
/**
 * @param name Nome della collezione. Questo campo sarà il
 * campo che descrive la collezione sulla blockchain.
 * @param symbol Simbolo della collezione che verrà usato
 * per creare i token
 */
export class Nft_Metadata extends Name {
    static #nft_metadatas = [];
    static get nft_metadatas() {
        return this.#nft_metadatas;
    }
    static set nft_metadatas(nft_metadata) {
        this.#nft_metadatas.push(...nft_metadata);
    }
    #image;
    #external_url;
    #attributes = [];
    constructor(name, description, image, external_url, attributes) {
        super(name, description);
        this.#image = image;
        this.#external_url = external_url;
        this.#attributes = attributes;
        Nft_Metadata.nft_metadatas = [this];
    }
    get image() {
        return this.#image;
    }
    get external_url() {
        return this.#external_url;
    }
    get attributes() {
        return this.#attributes;
    }
    set image(image) {
        this.#image = image;
    }
    set external_url(external_url) {
        this.#external_url = external_url;
    }
    set attributes(attributes) {
        this.#attributes.push(...attributes);
    }
    èConnessoA(attributo) {
        return this.#attributes.includes(attributo);
    }
}
