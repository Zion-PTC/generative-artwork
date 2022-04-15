import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { System } from '../../Machines/System.js';

const testRunner = new Mocha({ slow: 1000 });
testRunner.suite.emit(
  'pre-require',
  global,
  'nofile',
  testRunner
);
var suiteRun = testRunner.run();
process.on('exit', (code) => {
  process.exit(suiteRun.stats.failures > 0);
});
let log = zionUtil.debuglog('log');

const BASE = System.pathOfFileFromImportMetaUrl(
  import.meta.url
);
const NEST1 = `nested`;
const NEST2 = `url`;
const PATH = `${BASE}/${NEST1}/${NEST2}`;
const FILENAME1 = 'filename1.json';
const FILENAME2 = 'filename2.json';
const DATA = 'No Empty';
const NOMEDELLAPROPRIETA = 'path';

const initialPath =
  '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/System';
const FILEINSIDEINITIALPATH = 'Tree.js';

export let SystemTest = describe('System.js', () => {
  // METHODS
  describe(`STATIC METHODS`, () => {
    describe('System static method: buildTree()', () => {
      const tree = System.buildTree(initialPath);
      it('Should return root node', () => {
        expect(tree).not.to.be.null;
        expect(tree).to.have.property('path', initialPath);
        expect(tree).to.have.property('children');
      });
      it('Should return root node with its 2 children', () => {
        expect(tree.children.length).to.be.equal(2);
        expect(tree.isRoot()).to.be.equal(true);
        log(initialPath);

        const childrenPath = tree.children.map(
          (child) => child.path
        );
        expect(
          childrenPath.includes(`${initialPath}/Tree`)
        ).to.be.equal(true);
        expect(
          childrenPath.includes(`${initialPath}/Tree.js`)
        ).to.be.equal(true);
      });
      it('Should add utils node with its children inside root', () => {
        // const treeNode = treeNode.children.find(
        //   (child) => child.path === `${initialPath}/Tree`
        // );
        // expect(treeNode.isRoot()).to.be.equal(false);
        // expect(treeNode).not.to.be.null;
        // expect(treeNode?.children.length).to.be.equal(1);
        // expect(treeNode?.children[0]?.path).to.be.equal(
        //   `${initialPath}/utils/utils.js`
        // );
        // it('Should return the names of System root folder and of its child utils', () => {
        //   expect(tree.name).to.be.equal('System');
        //   expect(utils.name).to.be.equal('utils');
        // });
      });
      describe(`INTERNAL CLASS: TREENODE`, () => {
        describe('TreeNode.prototype.toStringedTree()', () => {
          it('Should return a string formatted directory tree', () => {
            /**
              └──System
               ⋮└──Tree
               ⋮ ⋮├──File.js
               ⋮ ⋮├──Folder.js
               ⋮ ⋮├──Root.js
               ⋮ ⋮└──TreeNode.js
               ⋮├──Tree.js
              
              */
            let expectedString = `└──System\n ⋮└──Tree\n ⋮ ⋮├──File.js\n ⋮ ⋮├──Folder.js\n ⋮ ⋮├──Root.js\n ⋮ ⋮└──TreeNode.js\n ⋮├──Tree.js`;
            expect(tree.toStringedTree()).to.be.equal(
              expectedString
            );
          });
        });
      });
    });
    describe('System static method: arrayOfFoldersInDirectory()', () => {
      const BASE = './';
      const NEST1 = `nested`;
      const NEST2 = `url`;
      const PATH = `${BASE}${NEST1}/${NEST2}`;
      it('dovrebbe ritornare un array contenente i folder contenuti nel percorso fornito', () => {
        System.createNestedDir(PATH);
        // System.writeJson(
        //   `${BASE}${NEST1}/newFile.json`,
        //   'new file'
        // );
        let array1 = System.arrayOfFoldersInDirectory(
          `${BASE}${NEST1}`
        );
        log(`${BASE}${NEST1}`);
        log(array1);
        // log(System.statSync(array1[0]));
        expect(array1[0]).to.be.equal(NEST2);
        System.deleteRecursiveDir(`${BASE}${NEST1}`);
      });
    });
    describe('System static method: arrayOfNamesOfFilesInFolder()', () => {
      System.createNestedDir(PATH);
      System.writeJson(`${PATH}/${FILENAME1}`, DATA);
      const array =
        System.arrayOfNamesOfFilesInFolder(PATH);
      it('dovrebbe creare un array con i nomi dei file contenuti nella cartella', () => {
        expect(array.length).not.to.be.null;
      });
      it('il primo elemento dovrebbe avere un membro "name" non nullo', () => {
        expect(array[0].name).to.be.not.null;
      });
      it(`il primo elemento dovrebbe avere il nome: "${FILENAME1}"`, () => {
        expect(array[0].name).to.be.equal(FILENAME1);
      });
      it(`il primo elemento dovrebbe avere una proprietà chiamata: ${NOMEDELLAPROPRIETA} con valore: \n${PATH}/${FILENAME1}`, () => {
        expect(array[0]).to.have.property(
          NOMEDELLAPROPRIETA,
          `${PATH}/${FILENAME1}`
        );
      });
      System.deleteRecursiveDir(`${BASE}/${NEST1}`);
    });
    describe('System static method: pathOfFileFromImportMetaUrl()', () => {
      const EXPECTEDPATH =
        '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/test/System';
      const importMetaUrl = import.meta.url;
      const path =
        System.pathOfFileFromImportMetaUrl(importMetaUrl);
      it('dovrebbe ritornare il percorso del file da cui si manda il import.meta.url', () => {
        expect(path).to.be.equal(EXPECTEDPATH);
      });
    });
    describe('System static method: writeJson()', () => {
      it(`dovrebbe scrivere un file JSON di nome: ${FILENAME1} nel Test Path`, () => {
        System.writeJson(`${BASE}/${FILENAME1}`, DATA);
        expect(
          System.arrayOfNamesOfFilesInFolder(BASE)[1].name
        ).to.be.equal(FILENAME1);
        System.deleteFile(`${BASE}/${FILENAME1}`, () => {});
      });
    });
    describe('System static method: createNestedDir()', () => {
      const BASEPATH =
        '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/test';
      const PROVAPATHTARGET = 'zeta';
      const PROVAPATH1 = 'prova';
      const PROVAPATH2 = 'ricursiva';
      it('dovrebbe creare una cartella ricursivamente', () => {
        System.createNestedDir(
          BASEPATH +
            '/' +
            PROVAPATHTARGET +
            '/' +
            PROVAPATH1 +
            '/' +
            PROVAPATH2
        );
        expect(
          System.existsSync(
            `${BASEPATH}/${PROVAPATHTARGET}/`
          )
        ).to.be.true;
        expect(
          System.existsSync(
            `${BASEPATH}/${PROVAPATHTARGET}` +
              `/${PROVAPATH1}`
          )
        ).to.be.true;
        expect(
          System.existsSync(
            `${BASEPATH}/${PROVAPATHTARGET}` +
              `/${PROVAPATH1}/${PROVAPATH2}`
          )
        ).to.be.true;
        System.deleteFolder(
          `${BASEPATH}/${PROVAPATHTARGET}` +
            `/${PROVAPATH1}/${PROVAPATH2}`
        );
        System.deleteFolder(
          `${BASEPATH}/${PROVAPATHTARGET}` +
            `/${PROVAPATH1}`
        );
        System.deleteFolder(
          `${BASEPATH}/${PROVAPATHTARGET}`
        );
      });
    });
    describe(`System static method: deleteRecursiveDir()`, () => {
      const NESTEDDIR = './sono/una/nested/dir';
      const ROOTDIR = './sono';
      const SECONDLEVDIR = './sono/una/';
      it(`dovrebbe cancellare il contenuto di una nested directory`, () => {
        System.createNestedDir(NESTEDDIR);
        expect(System.readDirSync(ROOTDIR)[0]).to.be.equal(
          'una'
        );
        System.deleteRecursiveDir(SECONDLEVDIR);
        expect(System.readDirSync(ROOTDIR)[0]).to.be.equal(
          undefined
        );
        System.deleteRecursiveDir(ROOTDIR);
      });
    });
    describe(`Method isFileInFolder()`, () => {
      it(`dovrebbe tornare true controllando che la cartella contenga un file di nome: ${FILEINSIDEINITIALPATH}`, () => {
        let result = System.isFileInFolder(
          FILEINSIDEINITIALPATH,
          initialPath
        );
        expect(result).to.be.true;
      });
      it(`dovrebbe tornare false controllando che la cartella contenga un file specifico`, () => {
        let result = System.isFileInFolder(
          'FILEINSIDEINITIALPATH',
          initialPath
        );
        expect(result).to.be.false;
      });
    });
  });
});
