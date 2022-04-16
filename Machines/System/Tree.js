import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { TreeNode } from './Tree/TreeNode.js';

export class Tree {
  static #trees = [];
  #nodes = [];
  get nodes() {
    let servedArray = [];
    this.#nodes.forEach((node) => servedArray.push(node));
    Object.freeze(servedArray);
    return servedArray;
  }
  get size() {
    return this.#nodes.length;
  }
  constructor(nodes = []) {
    nodes.forEach((node) => this.#nodes.push(node));
    // this.#nodes = nodes;
    Tree.#trees.push(this);
  }
  add(node) {
    if (!node) {
      throw new Error(
        'non è stato fornito alcun nodo da aggiungere'
      );
    }
    if (Array.isArray(node)) {
      throw new Error('È stato fornito un array.');
    }
    if (node.constructor !== TreeNode) {
      throw new Error(
        'Non è stato fornito un oggetto di tipo TreeNode'
      );
    }
    this.#nodes.push(node);
    return this;
  }
  remove(nodeToRemove) {
    if (!nodeToRemove) {
      throw new Error(
        'Non è stato fornito alcun nodo da rimuovere'
      );
    }
    if (Array.isArray(nodeToRemove)) {
      throw new Error('È stato fornito un array.');
    }
    if (nodeToRemove.constructor !== TreeNode) {
      throw new Error(
        'Non è stato fornito un oggetto di tipo TreeNode'
      );
    }
    const indiceDelNodoDaRimuovere = this.#nodes.findIndex(
      (node) => node.name === nodeToRemove.name
    );
    if (
      indiceDelNodoDaRimuovere + 1 !==
      this.#nodes.length
    ) {
      zionUtil.changePosition(
        this.#nodes,
        indiceDelNodoDaRimuovere,
        this.#nodes.length - 1
      );
    }
    this.#nodes.pop();
    return indiceDelNodoDaRimuovere;
  }
  isPresent(nodoDaControllare) {
    if (!nodoDaControllare) {
      throw new Error(
        'Non è stato fornito alcun nodo da controllare'
      );
    }
    if (Array.isArray(nodoDaControllare)) {
      throw new Error('È stato fornito un array.');
    }
    if (nodoDaControllare.constructor !== TreeNode) {
      throw new Error(
        'Non è stato fornito un oggetto di tipo TreeNode'
      );
    }
    const result = this.#nodes.findIndex(
      (node) => node.name === nodoDaControllare.name
    );
    return result === -1 ? false : true;
  }
  find(nodoDaCercare) {
    if (!nodoDaCercare) {
      throw new Error(
        'Non è stato fornito alcun nodo da cercare'
      );
    }
    if (Array.isArray(nodoDaCercare)) {
      throw new Error('È stato fornito un array.');
    }
    if (nodoDaCercare.constructor !== TreeNode) {
      throw new Error(
        'Non è stato fornito un oggetto di tipo TreeNode'
      );
    }
    return this.#nodes.find(
      (node) => node.name === nodoDaCercare.name
    );
  }
  findByLevel(level) {
    let servedArray = [];
    this.#nodes.forEach((node) => {
      if (node.level === level)
        return servedArray.push(node);
    });
    return servedArray;
  }
}

class BinaryTree extends Tree {
  constructor(nodes) {
    super(nodes);
  }
  findMin() {}
  findMax() {}
}
