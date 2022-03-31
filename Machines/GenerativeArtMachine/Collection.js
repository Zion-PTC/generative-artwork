import { Class } from './Class.js';

export class Collection {
  constructor(name, path, classes) {
    this.id;
    this.name = name;
    this.path = path;
    this.baseUri;
    this.supply;
    this.type;
    this.classes = [];
    this.createClasses(classes);
  }
  //COLLECTIONS
  collectionExists(name) {}
  //CLASSES
  createClasses(classes) {
    classes.forEach((className) => {
      let newClass = new Class(
        className,
        this.path,
        this.name
      );
      this.classes.push(newClass);
    });
  }
  get arrayOfClasses() {
    let array = [];
    this.classes.forEach((cl) => {
      return array.push(cl.name);
    });
    return array;
  }
  get arrayOfRarities() {
    let array = [];
    this.classes.forEach((cl) => {
      cl.raritySet.forEach((rarityName) => {
        let obj = {};
        obj.name = rarityName;
        obj.layers = [];
        cl.rarities
          .filter((rarity) => {
            return rarity.name === rarityName;
          })
          .forEach((rarity) => {
            obj.layers.push(rarity.layer.name);
          });
        array.push(obj);
      });
    });
    return array;
  }
  //LAYERS
  getReleasedEditions() {}
  getUnreleasedEditions() {}
}
