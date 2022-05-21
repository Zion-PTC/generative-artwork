import { system } from '@zionstate/system';
// import { system } from '../system/system.js';
export class GenerativeArtMachine {
    name;
    description;
    url;
    path;
    collections;
    logMessage;
    /**
     *
     * @param {string} name Nome da assegnare alla macchine dovrebbe corrispondere con lo user name.
     * @param {string} description Descrizione della macchina. Deve includere delle informazioni relative al progetto.
     * @param {string} url Url che punta verso la pagina del progetto.
     * @param {string} path É il percorso dove vengono salvati i file relativi all'istanza della GenArtMachine.
     * @returns ritorna this.
     */
    constructor(name, description, url, path, collections, logMessage) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.path = path;
        this.collections = collections;
        this.logMessage = logMessage;
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
            let listOfMachines = system.arrayOfFoldersInDirectory('/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/GenerativeArtMachine/Machines');
            listOfMachines.includes(name) ? resolve(true) : resolve(false);
        });
    }
    //METHODS
    async createMachineDirectoryAndJson() {
        this.logMessage = undefined;
        let ERRORMESSAGE = `It already exists a machine with name ${this.name}`;
        let response = await GenerativeArtMachine.machineExists(this.name);
        if (!response) {
            system.createNestedDir(`${this.path}/Collections`);
            system.writeJson(`${this.path}/${this.name}.json`, JSON.stringify(this));
            return this;
        }
        else {
            this.logMessage = ERRORMESSAGE;
            return this;
        }
    }
    async deleteMachineDirectoryAndJson() {
        system.deleteRecursiveDir(this.path);
        return this;
    }
}
