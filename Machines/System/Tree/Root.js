import { TreeNode } from './TreeNode.js';

export class Root extends TreeNode {
  static #roots = [];
  #type = 'root';
  constructor(path, parent, type) {
    super(path, parent, type);
    this.root = path;
    Root.#roots.push(this);
  }
}
