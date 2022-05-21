import { SystemEntity, ISystemEntity } from './SystemEntity.js';
export interface IClass extends ISystemEntity<Class> {
}
export declare class Class extends SystemEntity<Class> implements IClass {
    constructor(name: string, path: string, type: number, width: number, height: number);
}
