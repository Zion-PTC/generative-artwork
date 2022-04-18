import { Size } from '../../GenerativeArtMachine/Size.js';
import { TreeNode } from './TreeNode.js';

export class File extends TreeNode {
  constructor(
    name,
    path,
    parent,
    type,
    treeId,
    extension,
    fileSize
  ) {
    super(name, path, type, treeId);
    delete this.children;
    // this.level = this.parent.level++;
    this.extension = extension;
    this.fileSize = fileSize; // MB size of file
  }
}
class Image extends File {
  constructor(name, path, parent, type, width, height) {
    super(name, path, parent, type);
    this.size = new Size(width, height);
  }
}
