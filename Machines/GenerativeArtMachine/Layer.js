import { SystemEntity } from './SystemEntity.js';
export class Layer extends SystemEntity {
    constructor(name, path, type, width, height) {
        super(name, path, type, width, height);
    }
}
