export class Element {
  constructor(
    name,
    path,
    collection,
    rarity,
    imageClass,
    layer
  ) {
    this.name = name;
    this.path = path;
    this.fileType;
    this.collection = collection;
    this.imageClass = imageClass;
    this.layer = layer;
    this.rarity = rarity;
  }
}
