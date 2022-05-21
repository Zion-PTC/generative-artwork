import { SystemEntity, ISystemEntity } from './SystemEntity.js';
export interface ILayer extends ISystemEntity<ILayer> {
}
export declare class Layer extends SystemEntity<Layer> {
    constructor(name: string, path: string, type: number, width: number, height: number);
}
