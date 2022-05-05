import { Size } from '../../GenerativeArtMachine/Size.js';
import { TreeNode } from './TreeNode.js';

export class File extends TreeNode {
  constructor(
    name,
    path,
    type,
    treeId,
    extension,
    fileSize
  ) {
    super(name, path, type, treeId);
    delete this.children;
    this.extension = extension;
    this.fileSize = fileSize; // MB size of file
  }
}
class Image extends File {
  constructor(name, path, type, width, height) {
    super(name, path, type);
    this.size = new Size(width, height);
  }
}
