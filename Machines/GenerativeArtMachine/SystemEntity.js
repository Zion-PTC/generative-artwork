import { Size } from './Size.js';

export class SystemEntity {
  #id;
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
  get id() {
    return this.#id;
  }
  set id(id) {
    return (this.#id = id);
  }
}
