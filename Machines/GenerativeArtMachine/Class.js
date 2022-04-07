import { SystemEntity } from './SystemEntity.js';

export class Class extends SystemEntity {
  #classes = [];
  #rarities = [];
  #collection;
  #layers = [];
  constructor(
    id,
    name,
    path,
    level,
    children,
    type,
    width,
    height,
    collection
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

    this.#rarities;
    this.#collection;

    this.#layers;
    this.elementsNames;
    this.#classes.push(this);
  }
  get classes() {
    return this.#classes;
  }
  get rarities() {
    return this.#rarities;
  }
  get collection() {
    return this.#collection;
  }
  get layers() {
    return this.#layers;
  }
}
