export class Nft_Metadata {
  #nft_metadatas = [];
  #name;
  #description;
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
    this.#name = name;
    this.#description = description;
    this.#image = image;
    this.#external_url = external_url;
    this.#attributes = attributes;
    this.#nft_metadatas.push(this);
  }
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
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
  set name(name) {
    return (this.#name = name);
  }
  set description(description) {
    return (this.#description = description);
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
}
