import { Size } from './Size.js';

export class SystemEntity {
  #systemEntities = [];
  #id;
  #name;
  #path;
  #level;
  #children = [];
  #type;
  #collection;
  constructor(
    id,
    name,
    path,
    level,
    children = [],
    type,
    width,
    height,
    collection
  ) {
    this.#id = id;
    this.#name = name;
    this.#path = path;
    this.#level = level;
    this.#children = children;
    this.#type = type;
    this.#collection = collection;
    this.size = new Size(width, height);
    this.#systemEntities.push(this);
  }
  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get path() {
    return this.#path;
  }
  get level() {
    return this.#level;
  }
  get children() {
    return this.#children;
  }
  get type() {
    return this.#type;
  }
  get collection() {
    return this.#collection;
  }
  set id(id) {
    return (this.#id = id);
  }
}
