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
  constructor(public name = 'name', public type: number) {
    super(name, '', type, 0, 0);
    delete this.size;
    delete this.path;
  }
}
export class RarityByEdition extends Rarity {
  from: number;
  to: number;
  constructor(
    public name: string,
    public type: number,
    public percentage: number,
    from: number,
    to: number
  ) {
    super(name, type);
    this.from = from;
    this.to = to;
  }
}
export class RarityByElement extends Rarity {
  constructor(
    public name: string,
    public type: number,
    public percentage: number
  ) {
    super(name, type);
    this.percentage = percentage;
  }
}
