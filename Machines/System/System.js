import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { zionUtil } from '../../../telegram-bots/Classes/Utils.js';
import { TreeNode } from './TreeNode.js';

export class System {
  static #blackListFileNames = ['.DS_Store'];
  static get blackListFileNames() {
    return this.#blackListFileNames;
  }
  /**
   * @param {String} path percorso target
   * @returns {String[]} ritorna un array contenente la
   * lista dei nomi delle carelle contenute nel percorso
   * target.
   */
  static arrayOfFoldersInDirectory = (path) => {
    return fs
      .readdirSync(path, {
        withFile_Types: true,
      })
      .filter(
        // vengono esclusi i risultati che contengono un '.'
        // in quanto si tratta di nomi di files e non
        // di cartelle
        (directoryEntity) => !directoryEntity.includes('.')
      );
  };
  /**
   * @param {String} path target path
   * @returns {}  an array of name of the files contained in
   * the target path
   */
  static arrayOfNamesOfFilesInFolder = (path) => {
    return fs
      .readdirSync(path)
      .filter((item) => !/(^|\/)\.['\/\.]/g.test(item))
      .map((fileName) => {
        return {
          name: fileName,
          path: `${path}/${fileName}`,
        };
      });
  };
  /**
   * @param {String} importMetaUrl  data which can be
   * retrieved with in the callee file by typing
   * import.meta.url.
   * @returns {String}  the complete path to the file from
   * which this function is called.
   */
  static pathOfFileFromImportMetaUrl = (importMetaUrl) => {
    return `${dirname(fileURLToPath(importMetaUrl))}`;
  };
  /**
   *
   * @param {String} targetPath path with filename included
   * @param {String} data data to be written in the file
   * @returns
   */
  static writeJson(targetPath, data) {
    return fs.writeFileSync(targetPath, data, () => {});
  }
  /**
   * @param {String} path target path with file name included
   * @param {String} data data to insert in the file
   * @returns
   */
  static writePng(path, data) {
    return fs.writeFileSync(path, data);
  }
  /**
   * @title createNestedDir
   * @note funzione per creare una serie di cartelle
   * @param {String} dir
   */
  static createNestedDir(dir) {
    //example './tmp/but/then/nested';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  /**
   * @title buildTree()
   * @param {String} rootPath  rootPath is the starting
   * point from which the function will build a Directory
   * Structure Object.
   * @returns {TreeNode} returns a complete Tree starting from the rootPath
   */
  static buildTree(rootPath) {
    let _types = ['Folder', 'File'];
    let root = new TreeNode(rootPath, undefined, rootPath);
    const stack = [root];
    // https://en.wikipedia.org/wiki/Depth-first_search
    // Depth-first search aka DFS
    while (stack.length) {
      let currentNode = stack.pop();
      if (currentNode) {
        let children = fs.readdirSync(currentNode.path);
        if (children[0] === System.blackListFileNames[0]) {
          zionUtil.popFirst(children);
        }
        for (let child of children) {
          let childPath = `${currentNode.path}/${child}`;
          let childNode = new TreeNode(
            childPath,
            currentNode.name
          );
          let parent = TreeNode.nodes.find(
            (node) => node.name === childNode.parent
          );
          let level = parent.level;
          level++;
          childNode.level = level;
          if (fs.statSync(childNode.path).isDirectory()) {
            childNode.type = _types[0];
            stack.push(childNode);
          } else {
            childNode.type = _types[1];
          }
          currentNode.children.push(childNode);
        }
      }
    }
    return root;
  }
  /**
   *
   * @param {String} path percorso target
   * @param {*} callback funzione callback senza parametri
   */
  static deleteFile(path, callback) {
    return fs.rm(path, callback);
  }
  /**
   *
   * @param {String} path percorso target
   * @param {Object} options oggetto con opzioni
   * @returns fs.rmdirSync
   */
  static deleteFolder(path, options) {
    return fs.rmdirSync(path, options);
  }
  /**
   *
   * @param {String} dir directory target
   * @returns fs.rmSync()
   */
  static deleteRecursiveDir(dir) {
    return fs.rmSync(dir, { recursive: true, force: true });
  }
  /**
   *
   * @param {String} path percorso target
   * @returns fm.existsSync()
   */
  static existsSync(path) {
    return fs.existsSync(path);
  }
  /**
   *
   * @param {String} path percorso target
   * @param {Object} options oggetto opzioni
   * @returns fs.StatSync()
   */
  static statSync(path, options) {
    return fs.statSync(path, options);
  }
  /**
   *
   * @param {String} path percorso target
   * @param {String[]} options oggetto con opzioni
   * @returns {String[]} lista dei nomi degli oggetti contenuti nella directory target
   */
  static readDirSync(path, options) {
    return fs.readdirSync(path, options);
  }
  static isFileInFolder(file, folder) {
    let array = fs.readdirSync(folder);
    return array.includes(file);
  }
  static get folders() {}
  static get files() {}
}
