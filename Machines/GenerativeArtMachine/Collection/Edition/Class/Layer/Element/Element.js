export class Element {
  constructor(name, path, collection, rarity, cl, layer) {
    this.name = name;
    this.path = path;
    this.fileType;
    this.collection = collection;
    this.class = cl;
    this.layer = layer;
    this.rarity = rarity;
  }
}
