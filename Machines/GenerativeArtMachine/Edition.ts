import { Dna } from './Dna.js';
import { SystemEntity, ISystemEntity } from './SystemEntity.js';

export interface IEdition extends ISystemEntity<IEdition> {
  drawEdition(): void;
}

export class Edition extends SystemEntity<Edition> implements IEdition {
  dna;
  constructor(name, path, type, width, height, dna) {
    super(name, path, type, width, height);
    this.dna = new Dna(dna);
  }
  drawEdition(): void {}
}
