import { SystemEntity } from './SystemEntity';

export class Element extends SystemEntity {
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
    this.position;

    this.rarityName;
    this.collectionName;
    this.className;
    this.layerName;

    this.extension;
    this.#elements.push(this);
  }
}
