import { Dna } from './Dna.js';
import { SystemEntity } from './SystemEntity.js';
export class Edition extends SystemEntity {
    dna;
    constructor(name, path, type, width, height, dna) {
        super(name, path, type, width, height);
        this.dna = new Dna(dna);
    }
    drawEdition() { }
}
