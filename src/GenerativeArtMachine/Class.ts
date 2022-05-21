import { SystemEntity, ISystemEntity } from './SystemEntity.js';

export interface IClass extends ISystemEntity<Class> {}

export class Class extends SystemEntity<Class> implements IClass {
  constructor(
    name: string,
    path: string,
    type: number,
    width: number,
    height: number
  ) {
    super(name, path, type, width, height);
  }
}
