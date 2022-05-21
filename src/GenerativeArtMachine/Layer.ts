import { SystemEntity, ISystemEntity } from './SystemEntity.js';

export interface ILayer extends ISystemEntity<ILayer> {}

export class Layer extends SystemEntity<Layer> {
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
