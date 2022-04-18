import { Size } from './Size.js';

export class SystemEntity {
  static #systemEntities = [];
  constructor(name, path, type, width, height) {
    this.name = name;
    this.path = path;
    this.type = type;
    this.size = new Size(width, height);
    this.listaDiLati = [];
    SystemEntity.#systemEntities.push(this);
    this.id = SystemEntity.#systemEntities.length;
  }
  static get systemEntities() {
    return this.#systemEntities;
  }
  connettiA(entity) {
    // if (this.èConnessoA(entity)) {
    //   return;
    // }
    this.listaDiLati.push(entity);
    entity.listaDiLati.push(this);
  }
  trovaLatiAdiacenti() {
    return this.listaDiLati.map((lato) => lato.id);
  }
  èConnessoA(entity) {
    return this.listaDiLati.some(
      (lato) => (lato.id = entity.id)
    );
  }
  static getEntitiesNames() {
    let servedArray = [];
    this.#systemEntities.forEach((entity) => {
      servedArray.push(entity.name);
    });
    return servedArray;
  }
}
