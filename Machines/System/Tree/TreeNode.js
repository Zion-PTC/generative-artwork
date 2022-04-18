export class TreeNode {
  static #types = ['Folder', 'File'];
  static #treeNodes = [];
  static get treeNodes() {
    return TreeNode.#treeNodes;
  }
  static get types() {
    return this.#types;
  }
  toStringedTree = () => {
    let string;
    let stack = [this];
    let treeStrings = [];
    let folders = [];
    let folderId = -1;
    while (stack.length) {
      let currentNode = stack.pop();
      let nomeDeiFileInNodeChildren = [];
      if (currentNode.children) {
        let children = currentNode.children;
        children.reverse();
        for (let child of children) {
          nomeDeiFileInNodeChildren.push(child.name);
          if (child.type === TreeNode.#types[1]) {
          }
          stack.push(child);
        }
      }
      let { _string, _folders, _folderId } =
        this.stringedName(
          currentNode.name,
          currentNode.type,
          currentNode.depth,
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
    depth,
    folders,
    string,
    folderId,
    _isLastChild,
    nomeDeiFileInNodeChildren
  ) => {
    let tab = '';
    let pattern = ' ⋮';
    while (depth) {
      depth--;
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
  constructor(name, path, type, treeId) {
    this.name = name;
    this.path = path;
    // parent deve essere al massimo 1
    // this.parent;
    this.genitore = [1];
    this.figlio = [];
    this.type = TreeNode.#types[type];
    this.depth = 0;
    this.children = [];
    TreeNode.#treeNodes.push(this);
    this.id = TreeNode.length;
    this.treeId = treeId;
  }
  connettiAGenitore(node) {
    this.genitore.push(node);
    // node.connettiAFiglio(this);
  }
  connettiAFiglio(node) {
    this.figlio.push(node);
    node.connettiAGenitore(this);
  }
  isRoot() {
    if (this.root) {
      return true;
    }
    return false;
  }
  trovaSiblings() {
    // se è root lancia errore
    if (this.isRoot())
      throw new Error('Il nodo root non ha Siblings');
    // se non è root cerca e metti in un array tutti i nodi
    // che hanno lo stesso parent
    let servedArray = [];
    TreeNode.#treeNodes.forEach((treeNode) => {
      if (treeNode.genitore.name === this.genitore.name) {
        servedArray.push(treeNode);
      }
    });
    return servedArray;
  }
  trovaFigli() {
    // se è file lancia errore
    if (this.type === TreeNode.#types[1])
      throw new Error('I file non hanno figli');
    let servedArray = [];
    this.figlio.forEach((child) => servedArray.push(child));
    Object.freeze(servedArray);
    return servedArray;
  }
  trovaGenitore() {
    if (this.isRoot())
      throw new Error('Il nodo root non ha genitori');
    return TreeNode.#treeNodes.find(
      (treeNode) => treeNode.name === this.genitore.name
    );
  }
}
