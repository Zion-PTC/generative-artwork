import { TreeNode } from './TreeNode.js';

export class File extends TreeNode {
  constructor(path, parent, type) {
    super(path, parent, type);
    this.extension;
    this.size;
  }
}
