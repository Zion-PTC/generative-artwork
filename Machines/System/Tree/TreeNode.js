import fs from 'fs';
let _types = ['Folder', 'File'];
export class TreeNode {
  static #treenodes = [];
  constructor(path, parent, rootPath, type) {
    this.root = rootPath;
    this.path = path;
    this.level = 0;
    this.parent = parent;
    this.children = [];
    this.type = fs.statSync(this.path).isDirectory()
      ? _types[0]
      : _types[1];
    this.extension;
    this.size;
    this.name = TreeNode.#setName(path, this.type);
    TreeNode.#treenodes.push(this);
  }
  static get treenodes() {
    return this.#treenodes;
  }
  static get folders() {
    this.treenodes.find((node) => node.type === _types[0]);
  }
  /**
   *
   * @param {string} path percorso del file o cartella
   * per la quale bisogna
   * @param {string} type
   * @returns
   */
  static #setName = (path, type) => {
    if (type === _types[0]) {
      return path.match(/\w+$/g)[0];
    }
    let jointSpacesPath = path.replace(/ /g, '_');
    let res = jointSpacesPath.match(
      /(?<=[/])\w*[.]\w*/g
    )[0];
    return res;
  };
  /**
   * @name isRoot()
   * @returns true se il nodo è il nodo root, falso se non è
   * il nodo root.
   */
  isRoot() {
    if (this.path === this.root) {
      return true;
    }
    return false;
  }
  /**
    System
    ├── System.js
    └── utils
      └── utils.js
   */
  toStringedTree = () => {
    let string;
    let stack = [this];
    let treeStrings = [];
    let folders = [];
    let folderId = -1;
    while (stack.length) {
      let currentNode = stack.pop();
      if (currentNode.children.length !== 0) {
      }
      let children = currentNode.children;
      children.reverse();
      let nomeDeiFileInNodeChildren = [];
      for (let child of children) {
        nomeDeiFileInNodeChildren.push(child.name);
        if (child.type === _types[1]) {
        }
        stack.push(child);
      }
      function stringedName(
        name,
        type,
        level,
        folders,
        string,
        folderId,
        _isLastChild
      ) {
        let tab = '';
        let pattern = ' ⋮';
        while (level) {
          level--;
          tab = tab + pattern;
        }
        if (type === _types[0]) {
          folders.push(nomeDeiFileInNodeChildren);
          string = `${tab}└──${name}`;
          folderId++;
        } else if (type === _types[1]) {
          if (name === folders[folderId][0]) {
            _isLastChild = true;
            string = `${tab}└──${name}`;
          } else {
            string = `${tab}├──${name}`;
          }
        }
        let _string = string;
        let _folders = folders;
        let _folderId = folderId;
        return { _string, _folders, _folderId };
      }
      let { _string, _folders, _folderId } = stringedName(
        currentNode.name,
        currentNode.type,
        currentNode.level,
        folders,
        string,
        folderId,
        currentNode._isLastChild
      );
      string = _string;
      folderId = _folderId;
      folders = _folders;
      currentNode.stringedDir = string;
      treeStrings.push(string);
    }
    treeStrings = treeStrings.join('\n');
    return treeStrings;
  };
}
