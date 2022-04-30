import { Dna, IDna } from './Dna.js';
import { Edition, IEdition } from './Edition.js';
import { Element, IElement } from './Element.js';
import { SystemEntity, ISystemEntity } from './SystemEntity';

export interface IRarity extends ISystemEntity<IRarity> {
  from: number;
  to: number;
  percentage: number;
  get elementsByLayer(): IElement[];
  get possibiliDna(): IDna[];
  creaEdizione?(): IEdition;
  creaEdizioneNVolte?(): IEdition[];
  creaTutteLeEdizioni?(): IEdition[];
}

export class Rarity extends SystemEntity<Rarity> {
  parent;
  from;
  to;
  percentage;
  constructor(name = 'name', type, percentage = 0.2) {
    super(name, undefined, type, undefined, undefined);
    delete this.size;
    delete this.path;
    delete this.parent;
    this.from;
    this.to;
    this.percentage = percentage;
  }
}
export class RarityByEdition extends Rarity {
  constructor(name, type, percentage) {
    super(name, type, percentage);
    this.from;
    this.to;
  }
}
export class RarityByElement extends Rarity {
  constructor(name, type, percentage) {
    super(name, type, percentage);
    this.percentage;
  }
}
