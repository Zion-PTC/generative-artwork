import { Name } from './Name.js';

export class Nft_Metadata extends Name {
  static #nft_metadatas = [];
  #image;
  #external_url;
  #attributes = [];
  constructor(
    name,
    description,
    image,
    external_url,
    attributes
  ) {
    super(name, description);
    this.#image = image;
    this.#external_url = external_url;
    this.#attributes = attributes;
    Nft_Metadata.nft_metadatas = this;
  }
  static get nft_metadatas() {
    return this.#nft_metadatas;
  }
  static set nft_metadatas(nft_metadata) {
    return this.#nft_metadatas.push(nft_metadata);
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
    return (this.#image = image);
  }
  set external_url(external_url) {
    return (this.#external_url = external_url);
  }
  set attributes(attributes = []) {
    return this.#attributes.push([...attributes]);
  }
  èConnessoA(attributo) {
    return this.#attributes.includes(attributo);
  }
}
