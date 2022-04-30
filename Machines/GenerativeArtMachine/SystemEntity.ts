import { Collection } from './Collection.js';
import { Size, ISize } from './Size.js';

export interface ISystemEntity<T> {
  id: number | string;
  name: string;
  path: string;
  type: number;
  size: ISize;
  listaDiLati: T[];
  connettiA(entity: T): this;
  trovaLatiAdiacenti(): T[];
  èConnessoA(entity: T): boolean;
  èConnessoAeA(entity1: T, entity2: T): boolean;
}

export class SystemEntity<T extends ISystemEntity<T>>
  implements ISystemEntity<T>
{
  static #systemEntities = [];
  static get systemEntities() {
    return this.#systemEntities;
  }
  static systemEntitiesNames() {
    let servedArray = [];
    this.#systemEntities.forEach((entity) => {
      servedArray.push(entity.name);
    });
    return servedArray;
  }
  static trovaEntitàConnesseA<T extends ISystemEntity<T>>(entità: T) {
    let servedArray: T[] = [];
    let res: T = this.#systemEntities.find((sysEnt) => sysEnt.id === entità.id);
    let connessioni: T[] = res.trovaLatiAdiacenti();
    connessioni.forEach((conn) => servedArray.push(conn));
    return servedArray;
  }
  id: number | string;
  name: string;
  path: string;
  type: number;
  size: ISize;
  listaDiLati: T[] = [];
  constructor(
    name: string,
    path: string,
    type: number,
    width: number,
    height: number
  ) {
    this.name = name;
    this.path = path;
    this.type = type;
    this.size = new Size(width, height);
    SystemEntity.#systemEntities.push(this);
    this.id = SystemEntity.#systemEntities.length;
  }
  connettiA(entity) {
    this.listaDiLati.push(entity);
    entity.listaDiLati.push(this);
    return this;
  }
  trovaLatiAdiacenti(): T[] {
    return this.listaDiLati.map((lato) => lato);
  }
  èConnessoA<T extends ISystemEntity<T>>(entity: T): boolean {
    return this.listaDiLati.some((lato) => lato.id === entity.id);
  }
  /**
   *
   * @param {SystemEntity} entity1
   * @param {SystemEntity} entity2
   */
  èConnessoAeA<T>(entity1: T, entity2: T): boolean {
    //@ts-expect-error
    const condizione = this.èConnessoA(entity1) && this.èConnessoA(entity2);
    return condizione;
  }
}

function mitroviovunque() {
  console.log('mi trovi ovunque');
}
