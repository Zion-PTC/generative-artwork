import { System } from '../System/System.js';
import { Class } from './Class.js';

export class Collection {
  #count = 0;
  constructor(name, path, baseUri) {
    this.#count++;
    this.id = this.#count;
    this.name = name;
    this.path = path;
    this.baseUri = baseUri;
    this.supply;
    this.type;
    this.folderStructure = System.buildTree(this.path);
    this.classes = [];
  }
  //COLLECTIONS
  static collectionExists(name) {}
  //CLASSES
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
  getCollections() {}
  createNewCollection(name, classes) {
    let newCollection = new Collection(
      name,
      this.path,
      classes
    );
    this.collections.push(newCollection);
    return newCollection;
  }
  getReleasedEditions() {}
  getUnreleasedEditions() {}
}
