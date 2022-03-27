import { System } from '../../../classes/System.js';
import { Class } from './Edition/Class/Class.js';
import { Layer } from './Edition/Class/Layer/Layer.js';

export class Collection {
  constructor(name, path, classes) {
    this.id;
    this.name = name;
    this.path = path;
    this.baseUri;
    this.supply;
    this.type;
    this.classes = [];
    this.rarities = [];
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
  //LAYERS
  getReleasedEditions() {}
  getUnreleasedEditions() {}
}
