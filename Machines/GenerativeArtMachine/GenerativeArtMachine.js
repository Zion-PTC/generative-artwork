import { System } from '../System/System.js';

export class GenerativeArtMachine {
  /**
   *
   * @param {string} name Nome da assegnare alla macchine dovrebbe corrispondere con lo user name.
   * @param {string} description Descrizione della macchina. Deve includere delle informazioni relative al progetto.
   * @param {string} url Url che punta verso la pagina del progetto.
   * @param {string} path É il percorso dove vengono salvati i file relativi all'istanza della GenArtMachine.
   * @returns ritorna this.
   */
  constructor(name, description, url, path) {
    this.name = name;
    this.description = description;
    this.url = url;
    this.path = `${path}${name}`;
    this.collections = [];
    this.logMessage;
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
    System.deleteRecursiveDir(this.path);
    return this;
  }
}
