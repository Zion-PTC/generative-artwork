import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as readline from 'readline';
let terminalInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
terminalInterface.close();
// console.log(terminalInterface);
// terminalInterface.question(`What's your name?`, (name) => {
//   console.log(`Hi ${name}!`);
//   terminalInterface.close();
// });

export class System {
  /**
   * @param {String} path target path
   * @returns {Array} an array containing the name of folders in
   * the provided directory
   */
  static arrayOfFoldersInDirectory = (path) => {
    return fs.readdirSync(path, {
      withFile_Types: true,
    });
    // .filter((directoryEntity) =>
    //   directoryEntity.isDirectory()
    // )
    // .map((directoryEntity) => directoryEntity.name);
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
          path: `${path}${fileName}`,
        };
      });
  };
  /**
   * @param {String} importMetaUrl  data which can be retrieved with in the callee file
   * bay typing import.meta.url
   * @returns {String}  the complete path to the file from which this function is called
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
   *
   * @param {String} rootPath is the starting poing from which the function will
   * build a Directory Structure Object
   * @returns {TreeNode} returns a complete Tree starting from the rootPath
   */
  static buildTree(rootPath) {
    let _types = ['Folder', 'File'];
    class TreeNode {
      constructor(path) {
        let setName = (path) => {
          if (this.type === _types[0]) {
            return path.match(/\w+$/g)[0];
          }
          return path.match(/(?<=[/])\w*[.]\w*/g)[0];
        };
        this.root = rootPath;
        this.path = path;
        this.children = [];
        this.type = fs.statSync(this.path).isDirectory()
          ? _types[0]
          : _types[1];
        this.name = setName(path);
        this.extension;
        this.size;
      }
      isRoot() {
        if (this.path === this.root) {
          return true;
        }
        return false;
      }
      toStringedTree = () => {
        /**
          System
          ├── System.js
          └── utils
            └── utils.js
         */
        let string = this.name;
        let stack = [this];
        let levels = [];
        while (stack.length) {
          const currentNode = stack.pop();
          if (currentNode) {
            let fileChildren = [];
            let folderChildren = [];
            if (currentNode.children.length !== 0) {
              for (let child of currentNode.children) {
                if (child.type === _types[1]) {
                  fileChildren.push(child);
                }
                if (child.type === _types[0]) {
                  folderChildren.push(child);
                  stack.push(child);
                }
                if (stack.length === 0) {
                  if (!currentNode.isRoot()) {
                    levels.push('newLevel');
                  }
                }
              }
            }
            let newChildren =
              fileChildren.concat(folderChildren);
            let tab = '';
            if (levels.length !== 0) {
              tab = levels.map(() => {
                return '  ';
              });
              tab.join('');
            }
            if (newChildren.length === 1) {
              string = `${string}\n${tab}└──${newChildren[0].name}`;
            }
            if (newChildren.length === 2) {
              string = `${string}\n${tab}├──${newChildren[0].name}`;
              string = `${string}\n${tab}└──${newChildren[1].name}`;
            }
            if (newChildren.length > 2) {
              let lastChild = newChildren.pop();
              for (let child of newChildren) {
                string = `${string}\n${tab}├──${child.name}`;
              }
              string = `${string}\n${tab}└──${lastChild.name}`;
            }
          }
        }
        return string;
      };
    }
    let root = new TreeNode(rootPath);
    const stack = [root];

    // https://en.wikipedia.org/wiki/Depth-first_search
    // Depth-first search aka DFS
    while (stack.length) {
      let currentNode = stack.pop();
      if (currentNode) {
        let children = fs.readdirSync(currentNode.path);

        for (let child of children) {
          let childPath = `${currentNode.path}/${child}`;
          let childNode = new TreeNode(childPath);

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
  static deleteFile(path, callback) {
    fs.rm(path, callback);
  }
  static deleteFolder(path, options) {
    return fs.rmdirSync(path, options);
  }
  static existsSync(path) {
    return fs.existsSync(path);
  }
  get folders() {}
  get files() {}
}

// let pathOfThisFile = System.pathOfFileFromImportMetaUrl(
//   import.meta.url
// );
// let foldersInThisDirectory =
//   System.arrayOfFoldersInDirectory(pathOfThisFile);
// console.log(pathOfThisFile);
// console.log(foldersInThisDirectory);
