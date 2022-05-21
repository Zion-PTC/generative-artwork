import { Dirent } from '@zionstate/system';
import { Collection } from './GenerativeArtMachine/Collection';
export declare class GenerativeArtMachine {
    name: Dirent;
    description: string;
    url: URL;
    path: string;
    collections: Collection[];
    logMessage: string | undefined;
    /**
     *
     * @param {string} name Nome da assegnare alla macchine dovrebbe corrispondere con lo user name.
     * @param {string} description Descrizione della macchina. Deve includere delle informazioni relative al progetto.
     * @param {string} url Url che punta verso la pagina del progetto.
     * @param {string} path É il percorso dove vengono salvati i file relativi all'istanza della GenArtMachine.
     * @returns ritorna this.
     */
    constructor(name: Dirent, description: string, url: URL, path: string, collections: Collection[], logMessage: string | undefined);
    static machineExists(name: Dirent): Promise<unknown>;
    createMachineDirectoryAndJson(): Promise<this>;
    deleteMachineDirectoryAndJson(): Promise<this>;
}
