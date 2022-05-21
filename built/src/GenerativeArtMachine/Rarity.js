import { SystemEntity } from './SystemEntity';
export class Rarity extends SystemEntity {
    name;
    type;
    constructor(name = 'name', type) {
        super(name, '', type, 0, 0);
        this.name = name;
        this.type = type;
        delete this.size;
        delete this.path;
    }
}
export class RarityByEdition extends Rarity {
    name;
    type;
    percentage;
    from;
    to;
    constructor(name, type, percentage, from, to) {
        super(name, type);
        this.name = name;
        this.type = type;
        this.percentage = percentage;
        this.from = from;
        this.to = to;
    }
}
export class RarityByElement extends Rarity {
    name;
    type;
    percentage;
    constructor(name, type, percentage) {
        super(name, type);
        this.name = name;
        this.type = type;
        this.percentage = percentage;
        this.percentage = percentage;
    }
}
