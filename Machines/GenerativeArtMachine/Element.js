import { Position } from './Position';
import { SystemEntity } from './SystemEntity';

export class Element extends SystemEntity {
  static #elements = [];
  constructor(
    id,
    name,
    path,
    level,
    children,
    type,
    width,
    height,
    collectionName,
    x,
    y
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
    this.position = new Position(x, y);

    this.rarityName;
    this.collectionName = collectionName;
    this.className;
    this.layerName;

    this.extension;
    this.#elements.push(this);
  }
  static get elements() {
    return this.#elements;
  }
}
