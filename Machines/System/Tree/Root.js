import { TreeNode } from './TreeNode.js';

export class Root extends TreeNode {
  static #roots = [];
  #type = 'root';
  constructor(name, path, parent, type) {
    super(name, path, parent, type);
    this.root = path;
    Root.#roots.push(this);
  }
}
