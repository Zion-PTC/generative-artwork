import { TreeNode } from './TreeNode.js';

export class Folder extends TreeNode {
  constructor(name, path, type, treeId) {
    super(name, path, type, treeId);
    this.depth;
  }
}
