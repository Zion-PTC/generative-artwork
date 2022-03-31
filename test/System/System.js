import { expect } from 'chai';
import { System } from '../../Machines/System/System.js';
import { describe, it } from 'mocha';
const initialPath =
  '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/System';
const tree = System.buildTree(initialPath);

export let system = describe('TreeBuilder', () => {
  it('Should return root node', () => {
    expect(tree).not.to.be.null;
    expect(tree).to.have.property('path', initialPath);
    expect(tree).to.have.property('children');
  });
  it('Should return root node with its 4 children', () => {
    expect(tree.children.length).to.be.equal(2);
    expect(tree.isRoot()).to.be.equal(true);

    const childrenPath = tree.children.map(
      (child) => child.path
    );
    expect(
      childrenPath.includes(`${initialPath}/System.js`)
    ).to.be.equal(true);
    expect(
      childrenPath.includes(`${initialPath}/utils`)
    ).to.be.equal(true);
    expect(
      childrenPath.includes(`${initialPath}/System.js`)
    ).to.be.equal(true);
  });
  it('Should add utils node with its children inside root', () => {
    const utils = tree.children.find(
      (child) => child.path === `${initialPath}/utils`
    );
    expect(utils.isRoot()).to.be.equal(false);
    expect(utils).not.to.be.null;
    expect(utils?.children.length).to.be.equal(1);
    expect(utils?.children[0]?.path).to.be.equal(
      `${initialPath}/utils/utils.js`
    );
    it('Should return the names of System root folder and of its child utils', () => {
      expect(tree.name).to.be.equal('System');
      expect(utils.name).to.be.equal('utils');
    });
  });
  describe('TreeNode.prototype.toStringedTree()', () => {
    it('Should return a string formatted directory tree', () => {
      /**
        System
        ├── System.js
        └── utils
          └── utils.js
        */
      let expectedString = `System\n├──System.js\n└──utils\n  └──utils.js`;
      expect(tree.toStringedTree()).to.be.equal(
        expectedString
      );
    });
  });
});
