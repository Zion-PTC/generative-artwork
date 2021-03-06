import { Size } from './Size.js';
export class SystemEntity {
    static #systemEntities = [];
    static get systemEntities() {
        return this.#systemEntities;
    }
    static systemEntitiesNames() {
        let servedArray = [];
        this.#systemEntities.forEach(entity => {
            servedArray.push(entity.name);
        });
        return servedArray;
    }
    static trovaEntitàConnesseA(entità) {
        let servedArray = [], connessioni;
        let res = this.#systemEntities.find(sysEnt => sysEnt.id === entità.id);
        if (!res)
            return;
        connessioni = res.trovaLatiAdiacenti();
        if (connessioni)
            connessioni.forEach(conn => servedArray.push(conn));
        return servedArray;
    }
    id;
    name;
    type;
    path;
    size;
    listaDiLati = [];
    constructor(name, path, type, width, height) {
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
    trovaLatiAdiacenti() {
        return this.listaDiLati.map(lato => lato);
    }
    èConnessoA(entity) {
        return this.listaDiLati.some(lato => lato.id === entity.id);
    }
    /**
     *
     * @param {SystemEntity} entity1
     * @param {SystemEntity} entity2
     */
    èConnessoAeA(entity1, entity2) {
        //@ts-expect-error
        const condizione = this.èConnessoA(entity1) && this.èConnessoA(entity2);
        return condizione;
    }
}
