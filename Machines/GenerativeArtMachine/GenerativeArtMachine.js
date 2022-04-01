import { System } from '../System/System.js';
import { Collection } from './Collection.js';

export class GenerativeArtMachine {
  constructor(name, description, url, path) {
    this.name = name;
    this.description = description;
    this.url = url;
    this.path = path;
    //Collections
    this.collections = [];
    // this.createMachine(name);
    return this;
  }
  //METHODS
  //GenerativeArtMachine
  async createMachine() {
    // !(await this.machineExists(name))
    //   ? this.createMachineDirectoryAndJson(name)
    //   : console.log('Machine already exists');
  }
  static async machineExists(name) {
    return new Promise((resolve, reject) => {
      let listOfMachines = System.arrayOfFoldersInDirectory(
        '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/GenerativeArtMachine/Machines'
      );
      listOfMachines.includes(name)
        ? resolve(true)
        : resolve(false);
    });
  }
  createMachineDirectoryAndJson(name) {
    System.createNestedDir(
      `/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/GenerativeArtMachine/Machines${name}/Collections`
    );
    System.writeJson(
      `./GenerativeArtMachine/Machines/${name}/${name}.json`,
      JSON.stringify(this)
    );
  }
  //Dna

  addDnaToDnaList() {}
  createUniqueDna() {}

  // COLLECTION
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
  editCollection() {}
  searchCollection() {}
  // EDITION
  createNextEdition() {}
  createSpecificEdition() {}
  createEditions(from, to) {}
  getEdition(edition) {}
  getEditionsBatch() {}
}
