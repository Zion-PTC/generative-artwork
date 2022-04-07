import { System } from '../System/System.js';
import { SystemEntity } from './SystemEntity.js';

export class Rarity extends SystemEntity {
  #classes = [];
  #layers = [];
  #elements = [];
  constructor(
    id,
    name,
    path,
    level,
    children,
    type,
    width,
    height,
    collectionName
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
      collectionName
    );
    this.from = from;
    this.to = to;
    this.percentage = percentage;
  }
  get classes() {
    return this.#classes;
  }
  set classes(classes) {
    return this.#classes.push(classes);
  }
  get layers() {
    return this.#layers;
  }
  set layers(layers) {
    return this.#layers.push(layers);
  }
  get elements() {
    return this.#elements;
  }
  set elements(elements) {
    return this.#elements.push(elements);
  }
  countElements() {
    return (this.elementCounts =
      System.arrayOfNamesOfFilesInFolder(this.path).length);
  }
}
