import { ISize } from './Size.js';
export interface ISystemEntity<T> {
    id: number | string;
    name: string;
    path?: string;
    type: number;
    size?: ISize;
    listaDiLati: ISystemEntity<T>[];
    connettiA(entity: T): ISystemEntity<T>;
    trovaLatiAdiacenti(): ISystemEntity<T>[];
    èConnessoA(entity: T): boolean;
    èConnessoAeA(entity1: T, entity2: T): boolean;
}
export declare class SystemEntity<T extends ISystemEntity<T>> implements ISystemEntity<T> {
    #private;
    static get systemEntities(): SystemEntity<any>[];
    static systemEntitiesNames(): string[];
    static trovaEntitàConnesseA<T extends ISystemEntity<T>>(entità: T): ISystemEntity<T>[] | undefined;
    id: number | string;
    name: string;
    path?: string;
    type: number;
    size?: ISize;
    listaDiLati: ISystemEntity<T>[];
    constructor(name: string, path: string, type: number, width?: number, height?: number);
    connettiA(entity: ISystemEntity<T>): ISystemEntity<T>;
    trovaLatiAdiacenti(): ISystemEntity<T>[];
    èConnessoA<T extends ISystemEntity<T>>(entity: T): boolean;
    /**
     *
     * @param {SystemEntity} entity1
     * @param {SystemEntity} entity2
     */
    èConnessoAeA<T>(entity1: T, entity2: T): boolean;
}
