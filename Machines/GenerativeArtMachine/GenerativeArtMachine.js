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
    (async () => {
      await this.createMachine(name);
    })();
  }
  //METHODS
  //GenerativeArtMachine
  async createMachine(name) {
    console.log(await this.machineExists(name));
    !(await this.machineExists(name))
      ? this.createMachineDirectoryAndJson(name)
      : console.log('Machine already exists');
  }
  async machineExists(name) {
    return new Promise((resolve, reject) => {
      let listOfMachines = System.arrayOfFoldersInDirectory(
        './GenerativeArtMachine/Machines/'
      );
      listOfMachines.includes(name)
        ? resolve(true)
        : resolve(false);
    });
  }
  createMachineDirectoryAndJson(name) {
    System.createNestedDir(
      `./GenerativeArtMachine/Machines/${name}/Collections`
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
