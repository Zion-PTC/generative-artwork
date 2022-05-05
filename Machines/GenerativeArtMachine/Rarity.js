import { SystemEntity } from './SystemEntity';
export class Rarity extends SystemEntity {
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
