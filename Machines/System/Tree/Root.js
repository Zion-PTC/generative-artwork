import { TreeNode } from './TreeNode.js';

export class Root extends TreeNode {
  static #roots = [];
  #type = 'root';
  constructor(name, path, type, treeId) {
    super(name, path, type, treeId);
    this.root = true;
    delete this.parent;
    Root.#roots.push(this);
  }
}
