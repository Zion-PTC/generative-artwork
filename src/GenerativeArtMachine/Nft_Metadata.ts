import { Attribute, IAttribute } from './Attribute.js';
import { Name, IName } from './Name.js';

interface INft_Metadata extends IName {
  // get nft_metadatas(): INft_Metadata[];
  // set nft_metadatas(nft_metadatas: INft_Metadata[]);
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
export class Nft_Metadata extends Name implements INft_Metadata {
  static #nft_metadatas: INft_Metadata[] = [];
  static get nft_metadatas(): INft_Metadata[] {
    return this.#nft_metadatas;
  }
  static set nft_metadatas(nft_metadata: INft_Metadata[]) {
    this.#nft_metadatas.push(...nft_metadata);
  }
  #image;
  #external_url;
  #attributes: IAttribute[] = [];
  constructor(
    name: string,
    description: string,
    image: URL,
    external_url: URL,
    attributes: IAttribute[]
  ) {
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
  set attributes(attributes: IAttribute[]) {
    this.#attributes.push(...attributes);
  }
  èConnessoA(attributo: IAttribute) {
    return this.#attributes.includes(attributo);
  }
}
