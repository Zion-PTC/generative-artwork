import { SystemEntity } from './SystemEntity.js';

export class Class extends SystemEntity {
  #classes = [];
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

    this.rarityNames;
    this.collectionName;

    this.layersNames;
    this.elementsNames;
    this.#classes.push(this);
  }
}
