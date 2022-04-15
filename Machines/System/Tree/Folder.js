import { TreeNode } from './TreeNode.js';

export class Folder extends TreeNode {
  constructor(name, path, parent, type) {
    super(name, path, parent, type);
  }
}
