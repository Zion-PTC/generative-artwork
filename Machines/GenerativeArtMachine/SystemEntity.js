import { Size } from './Size';

export class SystemEntity {
  #systemEntities = [];
  constructor(
    id,
    name,
    path,
    level,
    children = [],
    type,
    width,
    height,
    collectionName
  ) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.level = level;
    this.children = children;
    this.type = type;
    this.collectionName = collectionName;
    this.size = new Size(width, height);
    this.#systemEntities.push(this);
  }
}
