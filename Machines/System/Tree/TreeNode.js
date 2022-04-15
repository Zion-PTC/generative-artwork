export class TreeNode {
  static #types = ['Folder', 'File'];
  static #treeNodes = [];
  constructor(path, parent, type) {
    this.name = TreeNode.#setName(
      path,
      TreeNode.#types[type]
    );
    this.path = path;
    this.parent = parent;
    this.type = TreeNode.#types[type];
    this.level = 0;
    this.children = [];
    TreeNode.#treeNodes.push(this);
  }
  static get treeNodes() {
    return TreeNode.#treeNodes;
  }
  static get folders() {
    this.treeNodes.find(
      (node) => node.type === TreeNode.#types[0]
    );
  }
  static #setName = (path, type) => {
    if (type === 'root') {
      return path.match(/\w+$/g)[0];
    }
    if (type === TreeNode.#types[0]) {
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
        if (child.type === TreeNode.#types[1]) {
        }
        stack.push(child);
      }
      let { _string, _folders, _folderId } =
        this.stringedName(
          currentNode.name,
          currentNode.type,
          currentNode.level,
          folders,
          string,
          folderId,
          currentNode._isLastChild,
          nomeDeiFileInNodeChildren
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
  stringedName = (
    name,
    type,
    level,
    folders,
    string,
    folderId,
    _isLastChild,
    nomeDeiFileInNodeChildren
  ) => {
    let tab = '';
    let pattern = ' ⋮';
    while (level) {
      level--;
      tab = tab + pattern;
    }
    if (type === TreeNode.#types[0]) {
      folders.push(nomeDeiFileInNodeChildren);
      string = `${tab}└──${name}`;
      folderId++;
    } else if (type === TreeNode.#types[1]) {
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
  };
}
