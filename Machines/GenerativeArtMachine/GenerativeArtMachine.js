import { System } from '../System/System.js';
import { Collection } from './Collection.js';

export class GenerativeArtMachine {
  constructor(name, description, url, path) {
    this.name = name;
    this.description = description;
    this.url = url;
    this.path = `${path}${name}`;
    //Collections
    this.collections = [];
    this.logMessage;
    // this.createMachine(name);
    return this;
  }
  //STATIC METHODS
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
  //METHODS
  async createMachineDirectoryAndJson() {
    this.logMessage = undefined;
    let ERRORMESSAGE = `It already exists a machine with name ${this.name}`;
    let response = await GenerativeArtMachine.machineExists(
      this.name
    );
    response;
    if (!response) {
      System.createNestedDir(`${this.path}/Collections`);
      System.writeJson(
        `${this.path}/${this.name}.json`,
        JSON.stringify(this)
      );
      return this;
    } else {
      this.logMessage = ERRORMESSAGE;
      return this;
    }
  }
  async deleteMachineDirectoryAndJson() {
    return System.deleteRecursiveDir(this.path);
  }
}
