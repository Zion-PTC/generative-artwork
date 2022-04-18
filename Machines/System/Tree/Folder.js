import { TreeNode } from './TreeNode.js';

export class Folder extends TreeNode {
  constructor(name, path, parent, type, treeId) {
    super(name, path, type, treeId);
    // this.level = this.parent.level++;
    this.depth;
  }
}
