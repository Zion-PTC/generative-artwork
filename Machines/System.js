import fs from 'fs';
import { dirname, extname } from 'path';
import { fileURLToPath } from 'url';

import { zionUtil } from '../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Tree } from './System/Tree.js';
import { File } from './System/Tree/File.js';
import { Folder } from './System/Tree/Folder.js';
import { Root } from './System/Tree/Root.js';
import { TreeNode } from './System/Tree/TreeNode.js';

export class System {
  #blackListFileNames = ['.DS_Store'];
  get blackListFileNames() {
    return this.#blackListFileNames;
  }
  get folders() {}
  get files() {}
  setNameForTreeNode = (path, type) => {
    if (type === 'root') {
      return path.match(/\w+$/g)[0];
    }
    if (type === TreeNode.types[0]) {
      return path.match(/\w+$/g)[0];
    }
    let jointSpacesPath = path.replace(/ /g, '_');
    let res = jointSpacesPath.match(
      /(?<=[/])\w*[.]\w*/g
    )[0];
    return res;
  };
  /**
   * @param {String} path percorso target
   * @returns {String[]} ritorna un array contenente la
   * lista dei nomi delle carelle contenute nel percorso
   * target.
   */
  arrayOfFoldersInDirectory = (path) => {
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
  arrayOfNamesOfFilesInFolder = (path) => {
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
  pathOfFileFromImportMetaUrl = (importMetaUrl) => {
    return `${dirname(fileURLToPath(importMetaUrl))}`;
  };
  /**
   *
   * @param {String} targetPath path with filename included
   * @param {String} data data to be written in the file
   * @returns
   */
  writeJson(targetPath, data) {
    return fs.writeFileSync(targetPath, data, () => {});
  }
  /**
   * @param {String} path target path with file name included
   * @param {String} data data to insert in the file
   * @returns
   */
  writePng(path, data) {
    return fs.writeFileSync(path, data);
  }
  /**
   * @title createNestedDir
   * @note funzione per creare una serie di cartelle
   * @param {String} dir
   */
  createNestedDir(dir) {
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
   * @returns {Tree} returns a complete Tree starting from the rootPath
   */
  buildTree(rootPath) {
    let newTree = new Tree();
    let _types = ['Folder', 'File'];
    let nodes = [];
    let type = system.getTreeNodeType(rootPath);
    let name = this.setNameForTreeNode(
      rootPath,
      TreeNode.types[type]
    );
    let root = new Root(name, rootPath, type);
    newTree.add(root);
    const stack = [root];
    // https://en.wikipedia.org/wiki/Depth-first_search
    // Depth-first search aka DFS
    while (stack.length) {
      let currentNode = stack.pop();
      if (currentNode) {
        let children = fs.readdirSync(currentNode.path);
        if (children[0] === system.blackListFileNames[0]) {
          zionUtil.popFirst(children);
        }
        for (let child of children) {
          let childPath = `${currentNode.path}/${child}`;
          let type = system.getTreeNodeType(childPath);
          let name = this.setNameForTreeNode(
            childPath,
            TreeNode.types[type]
          );
          let childNode;
          if (_types[type] === _types[0]) {
            childNode = new Folder(
              name,
              childPath,
              currentNode.name,
              type,
              newTree.id
            );
            childNode.depth = currentNode.depth + 1;
            nodes.push(childNode);
          }
          if (_types[type] === _types[1]) {
            childNode = new File(
              name,
              childPath,
              currentNode.name,
              type,
              newTree.id,
              this.getFileExtension(childPath),
              this.getFileSize(childPath)
              // extension
            );
            childNode.depth = currentNode.depth + 1;
            nodes.push(childNode);
          }
          currentNode.connettiAFiglio(childNode);
          if (
            system.getTreeNodeType(childNode.path) === 0
          ) {
            childNode.type = _types[0];
            stack.push(childNode);
          } else {
            childNode.type = _types[1];
          }
          currentNode.children.push(childNode);
        }
      }
    }
    // creando un tree con l'array di TreeNodes si crea un
    // legame per il quale aggiungendo un elemento al
    const addNode = function (node) {
      newTree.add(node);
    };
    nodes.forEach(addNode);
    return newTree;
  }
  /**
   *
   * @param {String} path percorso target
   * @param {*} callback funzione callback senza parametri
   */
  deleteFile(path, callback) {
    return fs.rm(path, callback);
  }
  /**
   *
   * @param {String} path percorso target
   * @param {Object} options oggetto con opzioni
   * @returns fs.rmdirSync
   */
  deleteFolder(path, options) {
    return fs.rmdirSync(path, options);
  }
  /**
   *
   * @param {String} dir directory target
   * @returns fs.rmSync()
   */
  deleteRecursiveDir(dir) {
    return fs.rmSync(dir, { recursive: true, force: true });
  }
  /**
   *
   * @param {String} path percorso target
   * @returns fm.existsSync()
   */
  existsSync(path) {
    return fs.existsSync(path);
  }
  /**
   *
   * @param {String} path percorso target
   * @param {Object} options oggetto opzioni
   * @returns fs.StatSync()
   */
  statSync(path, options) {
    return fs.statSync(path, options);
  }
  isFileInFolder(file, folder) {
    let array = fs.readdirSync(folder);
    return array.includes(file);
  }
  getTreeNodeType(path) {
    let result;
    fs.statSync(path).isDirectory()
      ? (result = 0)
      : (result = 1);
    return result;
  }
  // work on files
  getFileSize(path) {
    let size = fs.statSync(path).size;
    return size;
  }
  getFileExtension(path) {
    let extension = extname(path);
    return extension;
  }
}

export let system = new System();
Object.assign(system, fs);
