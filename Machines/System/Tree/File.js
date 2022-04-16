import { TreeNode } from './TreeNode.js';

export class File extends TreeNode {
  constructor(name, path, parent, type) {
    super(name, path, parent, type);
    // this.children = undefined;
    this.extension;
    this.size;
  }
}
