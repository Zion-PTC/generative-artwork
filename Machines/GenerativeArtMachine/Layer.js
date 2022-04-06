import { SystemEntity } from './SystemEntity';

export class Layer extends SystemEntity {
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

    this.rarityName = rarityName;
    this.collectionName = collectionName;
    this.className = className;

    this.elementsNames = elementsNames;
    this.#layers.push(this);
  }
}
