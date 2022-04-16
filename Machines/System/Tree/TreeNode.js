export class TreeNode {
  static #types = ['Folder', 'File'];
  static #treeNodes = [];
  constructor(name, path, parent, type) {
    this.name = name;
    this.path = path;
    // parent deve essere al massimo 1
    this.parent = parent;
    this.type = TreeNode.#types[type];
    this.level = 0;
    this.children = [];
    TreeNode.#treeNodes.push(this);
  }
  static get treeNodes() {
    return TreeNode.#treeNodes;
  }
  static get types() {
    return this.#types;
  }
  isRoot() {
    if (this.path === this.root) {
      return true;
    }
    return false;
  }
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
  trovaSiblings() {
    // se è root lancia errore
  }
  trovaFigli() {
    // se è file lancia errore
  }
  trovaGenitore() {
    // se è root lancia errore
  }
}
