import { Dna } from './Dna';
import { SystemEntity } from './SystemEntity';

export class Edition extends SystemEntity {
  #editions = [];
  #imageFile;
  #dna;
  constructor(
    id,
    name,
    path,
    level,
    children = [],
    type,
    width,
    height,
    collection,
    imageFile
  ) {
    super(
      id,
      name,
      path,
      level,
      children,
      type,
      width,
      height,
      collection
    );
    this.#imageFile = imageFile;
    this.#editions.push(this);
    this.#dna = new Dna();
  }
  get imageFile() {
    return this.#imageFile;
  }
  set imageFile(imageFile) {
    return (this.#imageFile = imageFile);
  }
}
