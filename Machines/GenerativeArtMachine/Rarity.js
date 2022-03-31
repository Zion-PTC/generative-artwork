import { System } from '../System/System.js';

export class Rarity {
  constructor(name, path, collection, cl, layer) {
    this.name = name;
    this.path = path;
    this.collection = collection;
    this.class = cl;
    this.layer = layer;
    this.elementCounts = 0;
    this.percentage;
    this.countElements();
  }
  countElements() {
    return (this.elementCounts =
      System.arrayOfNamesOfFilesInFolder(this.path).length);
  }
}
