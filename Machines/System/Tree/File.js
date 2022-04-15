import { TreeNode } from './TreeNode.js';

export class File extends TreeNode {
  constructor(name, path, parent, type) {
    super(name, path, parent, type);
    this.extension;
    this.size;
  }
}
