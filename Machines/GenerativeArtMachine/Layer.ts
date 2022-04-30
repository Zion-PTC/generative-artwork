import { SystemEntity, ISystemEntity } from './SystemEntity.js';

export interface ILayer extends ISystemEntity<ILayer> {}

export class Layer extends SystemEntity<Layer> {
  constructor(name, path, type, width, height) {
    super(name, path, type, width, height);
  }
}
