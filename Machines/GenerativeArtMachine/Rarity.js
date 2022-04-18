import { SystemEntity } from './SystemEntity.js';

export class Rarity extends SystemEntity {
  constructor(
    name = 'name',
    type = 'type',
    percentage = 0.2
  ) {
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
  constructor() {
    this.from;
    this.to;
  }
}
export class RarityByElement extends Rarity {
  constructor() {
    this.percentage;
  }
}
