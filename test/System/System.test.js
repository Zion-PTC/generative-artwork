import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { system } from '../../Machines/System.js';
import { Tree } from '../../Machines/System/Tree.js';
import { TreeNode } from '../../Machines/System/Tree/TreeNode.js';

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

const BASE = system.pathOfFileFromImportMetaUrl(
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
      const tree = system.buildTree(initialPath);
      let root = tree.nodes[0];

      it('Should return root node', () => {
        expect(root).not.to.be.null;
        expect(root).to.have.property('path', initialPath);
        expect(root).to.have.property('children');
      });
      it('Should return root node with its 2 children', () => {
        expect(root.children.length).to.be.equal(2);
        expect(root.isRoot()).to.be.equal(true);
        log(initialPath);

        const childrenPath = root.children.map(
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
      describe(`TREE`, () => {
        describe(`Property nodes`, () => {
          it(`dovrebbe tornare un lista dei nodi contenuti nel tree`, () => {
            expect(Array.isArray(tree.nodes)).to.be.true;
          });
          it(`non dovrebbe permettere di aggiungegere un elemento all'array`, () => {
            expect(() =>
              tree.nodes.push('something')
            ).to.throw(
              'Cannot add property 8, object is not extensible'
            );
          });
        });
        describe(`Property 'size'`, () => {
          it(`dovrebbe tornare dimensione del tree`, () => {
            expect(tree.size).to.be.equal(8);
          });
        });
        const NAME = 'giorno';
        const PATH = 'nessunPath';
        const PARENT = 'non ho parenti';
        const TYPE = 1;
        const TYPE1 = 'File';
        const giorgio = new TreeNode(
          NAME,
          PATH,
          PARENT,
          TYPE
        );
        describe(`Method add()`, () => {
          it(`dovrebbe lanciare un errore perché non è stato fornito un nodo da aggiungere`, () => {
            const ERRORMESSAGE =
              'non è stato fornito alcun nodo da aggiungere';
            expect(() => tree.add()).to.throw(ERRORMESSAGE);
          });
          it(`dovrebbe lanciare un errore perché gli è stato fornito un argomento ma non del tipo giusto`, () => {
            const ERRORMESSAGE =
              'Non è stato fornito un oggetto di tipo TreeNode';
            expect(() => {
              tree.add('pooo');
            }).to.throw(ERRORMESSAGE);
          });
          it(`devrebbe lanciare un errore perché è stato fornito un array`, () => {
            const ERRORMESSAGE =
              'È stato fornito un array.';
            const ARGOMENTOSBAGLIATO = ['blue'];
            expect(() =>
              tree.add(ARGOMENTOSBAGLIATO)
            ).to.throw(ERRORMESSAGE);
          });
          it(`dovrebbe aggiungere un nodo al tree`, () => {
            tree.add(giorgio);
            expect(
              tree.nodes[tree.size - 1].name
            ).to.be.equal(NAME);
            expect(
              tree.nodes[tree.size - 1].path
            ).to.be.equal(PATH);
            expect(
              tree.nodes[tree.size - 1].parent
            ).to.be.equal(PARENT);
            expect(
              tree.nodes[tree.size - 1].type
            ).to.be.equal(TYPE1);
          });
        });
        describe(`Method remove()`, () => {
          it(`dovrebbe lanciare un errore perché non è stato fornito un nodo da rimuovere`, () => {
            const ERRORMESSAGE =
              'Non è stato fornito alcun nodo da rimuovere';
            expect(() => tree.remove()).to.throw(
              ERRORMESSAGE
            );
          });
          it(`dovrebbe lanciare un errore perché gli è stato fornito un array`, () => {
            const ARGOMENTOSBAGLIATO = ['no array'];
            const ERRORMESSAGE =
              'È stato fornito un array.';
            expect(() =>
              tree.remove(ARGOMENTOSBAGLIATO)
            ).to.throw(ERRORMESSAGE);
          });
          it(`devrebbe lanciare un errore perché è stato fornito un array`, () => {
            const ARGOMENTOSBAGLIATO =
              'argomento sbagliato';
            const ERRORMESSAGE =
              'Non è stato fornito un oggetto di tipo TreeNode';
            expect(() =>
              tree.remove(ARGOMENTOSBAGLIATO)
            ).to.throw(ERRORMESSAGE);
          });
          it(`dovrebbe eliminare il nodo con nome 'giorgio'`, () => {
            log(tree.size);
            log(tree.remove(giorgio));
            log(tree.size);
          });
        });
        describe(`Method isPresent()`, () => {
          it(`dovrebbe lanciare un errore perchè non è stato fornito nessuno nodo da controllare`, () => {
            const ERRORMESSAGE =
              'Non è stato fornito alcun nodo da controllare';
            expect(() => tree.isPresent()).to.throw(
              ERRORMESSAGE
            );
          });
          it(`dovrebbe lanciare un errore perché gli stiamo fornendo un array`, () => {
            const ERRORMESSAGE =
              'È stato fornito un array.';
            const ARGOMENTOSBAGLIATO = ['sbagliato'];
            expect(() =>
              tree.isPresent(ARGOMENTOSBAGLIATO)
            ).to.throw(ERRORMESSAGE);
          });
          it(`dovrebbe lanciare un errore perchè gli abbiamo fornito un argomento sbagliato`, () => {
            const ERRORMESSAGE =
              'Non è stato fornito un oggetto di tipo TreeNode';
            const ARGOMENTOSBAGLIATO = 'sono sbagliato';
            expect(() =>
              tree.isPresent(ARGOMENTOSBAGLIATO)
            ).to.throw(ERRORMESSAGE);
          });
          it(`dovrebbe ritornare vero`, () => {
            tree.add(giorgio);
            expect(tree.isPresent(giorgio)).to.be.true;
            tree.remove(giorgio);
          });
          it(`dovrebbe ritornare falso perchè si sta cercando un nodo inesistente.`, () => {
            expect(tree.isPresent(giorgio)).to.be.false;
          });
        });
        describe(`Method find()`, () => {
          it(`dovrebbe lanciare un errore perché non gli abbiamo fornito un argomento`, () => {
            const ERRORMESSAGE =
              'Non è stato fornito alcun nodo da cercare';
            expect(() => tree.find()).to.throw(
              ERRORMESSAGE
            );
          });
          it(`dovrebbe lanciare un errore perche gli abbiamo mandato un array come argomento`, () => {
            const ERRORMESSAGE =
              'È stato fornito un array.';
            const ARGOMENTOSBAGLIATO = ['array'];
            expect(() =>
              tree.find(ARGOMENTOSBAGLIATO)
            ).to.throw(ERRORMESSAGE);
          });
          it(`dovrebbe lanciare un errore perché gli abbiamo fornito l'argomento sbagliato `, () => {
            const ERRORMESSAGE =
              'Non è stato fornito un oggetto di tipo TreeNode';
            const ARGOMENTOSBAGLIATO = 'errrrrr';
            expect(() =>
              tree.find(ARGOMENTOSBAGLIATO)
            ).to.throw(ERRORMESSAGE);
          });
          it(`dovrebbe tornare il nodo cercandolo con il suo nome`, () => {
            tree.add(giorgio);
            expect(tree.find(giorgio).name).to.be.equal(
              giorgio.name
            );
            tree.remove(giorgio);
          });
        });
        describe(`Method findByLevel()`, () => {
          it(`dovrebbe tornare piu nodi??`, () => {
            const folderContenutoNelLivello1 = 'Tree';
            expect(tree.findByLevel(1)[0].name).to.be.equal(
              folderContenutoNelLivello1
            );
          });
        });
      });
      describe.only(`INTERNAL CLASS: TREENODE`, () => {
        describe(`Method trovaSiblings()`, () => {
          it(`dovrebbe lanciare un errore perchè si stanno cercando i siblings del nodo root`, () => {
            const ERRORMESSAGE =
              'Il nodo root non ha Siblings';
            expect(() =>
              tree.nodes[0].trovaSiblings()
            ).to.throw(ERRORMESSAGE);
          });
          it(`dovrebbe tornare la lista di Siblinigs del nodo dal quale si è chiamato il metodo`, () => {
            const NOMEFOLDER = 'Tree';
            const NOMEFILE = 'Tree.js';
            const PERCORSOTREEJS =
              '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/System/Tree.js';
            expect(
              tree.nodes[1].trovaSiblings()[0].name
            ).to.be.equal(NOMEFOLDER);
            expect(
              tree.nodes[1].trovaSiblings()[1].path
            ).to.be.equal(PERCORSOTREEJS);
            expect(
              tree.nodes[1].trovaSiblings()[1].name
            ).to.be.equal(NOMEFILE);
          });
        });
        describe(`Method trovaFigli`, () => {
          it(`dovrebbe lanciare un errore perchè i nodi di tipo file non hanno figli`, () => {
            const fileNode = tree.nodes[2];
            const ERRORMESSAGE = 'I file non hanno figli';
            expect(() => fileNode.trovaFigli()).to.throw(
              ERRORMESSAGE
            );
          });
          it(`dovrebbe tornare la lista di 5 figli del nodo 'Tree`, () => {
            const folderNode = tree.nodes[1];
            expect(
              folderNode.trovaFigli().length
            ).to.be.equal(5);
          });
        });
        describe(`Method trovaGenitore`, () => {
          it(`dovrebbe lanciare un errore perchè il root node non ha parenti`, () => {
            const root = tree.nodes[0];
            const ERRORMESSAGE =
              'Il nodo root non ha genitori';
            expect(() => root.trovaGenitore()).to.throw(
              ERRORMESSAGE
            );
          });
          it(`dovrebbe tornare il nodo genitore del folder Tree`, () => {
            const treeFolder = tree.nodes[1];
            const NOMEGENITORE = 'System';
            expect(
              treeFolder.trovaGenitore().name
            ).to.be.equal(NOMEGENITORE);
          });
        });
        describe('Method toStringedTree()', () => {
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
            let expectedString = `└──System\n ⋮└──Tree\n ⋮ ⋮├──File.js\n ⋮ ⋮├──Folder.js\n ⋮ ⋮├──LeafNode.js\n ⋮ ⋮├──Root.js\n ⋮ ⋮└──TreeNode.js\n ⋮├──Tree.js`;
            expect(root.toStringedTree()).to.be.equal(
              expectedString
            );
          });
        });
        describe(`Property root`, () => {
          it(``, () => {
            const root = tree.nodes[0];
            log(root);
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
        system.createNestedDir(PATH);
        // System.writeJson(
        //   `${BASE}${NEST1}/newFile.json`,
        //   'new file'
        // );
        let array1 = system.arrayOfFoldersInDirectory(
          `${BASE}${NEST1}`
        );
        log(`${BASE}${NEST1}`);
        log(array1);
        // log(System.statSync(array1[0]));
        expect(array1[0]).to.be.equal(NEST2);
        system.deleteRecursiveDir(`${BASE}${NEST1}`);
      });
    });
    describe('System static method: arrayOfNamesOfFilesInFolder()', () => {
      system.createNestedDir(PATH);
      system.writeJson(`${PATH}/${FILENAME1}`, DATA);
      const array =
        system.arrayOfNamesOfFilesInFolder(PATH);
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
      system.deleteRecursiveDir(`${BASE}/${NEST1}`);
    });
    describe('System static method: pathOfFileFromImportMetaUrl()', () => {
      const EXPECTEDPATH =
        '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/test/System';
      const importMetaUrl = import.meta.url;
      const path =
        system.pathOfFileFromImportMetaUrl(importMetaUrl);
      it('dovrebbe ritornare il percorso del file da cui si manda il import.meta.url', () => {
        expect(path).to.be.equal(EXPECTEDPATH);
      });
    });
    describe('System static method: writeJson()', () => {
      it(`dovrebbe scrivere un file JSON di nome: ${FILENAME1} nel Test Path`, () => {
        system.writeJson(`${BASE}/${FILENAME1}`, DATA);
        expect(
          system.arrayOfNamesOfFilesInFolder(BASE)[1].name
        ).to.be.equal(FILENAME1);
        system.deleteFile(`${BASE}/${FILENAME1}`, () => {});
      });
    });
    describe('System static method: createNestedDir()', () => {
      const BASEPATH =
        '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/test';
      const PROVAPATHTARGET = 'zeta';
      const PROVAPATH1 = 'prova';
      const PROVAPATH2 = 'ricursiva';
      it('dovrebbe creare una cartella ricursivamente', () => {
        system.createNestedDir(
          BASEPATH +
            '/' +
            PROVAPATHTARGET +
            '/' +
            PROVAPATH1 +
            '/' +
            PROVAPATH2
        );
        expect(
          system.existsSync(
            `${BASEPATH}/${PROVAPATHTARGET}/`
          )
        ).to.be.true;
        expect(
          system.existsSync(
            `${BASEPATH}/${PROVAPATHTARGET}` +
              `/${PROVAPATH1}`
          )
        ).to.be.true;
        expect(
          system.existsSync(
            `${BASEPATH}/${PROVAPATHTARGET}` +
              `/${PROVAPATH1}/${PROVAPATH2}`
          )
        ).to.be.true;
        system.deleteFolder(
          `${BASEPATH}/${PROVAPATHTARGET}` +
            `/${PROVAPATH1}/${PROVAPATH2}`
        );
        system.deleteFolder(
          `${BASEPATH}/${PROVAPATHTARGET}` +
            `/${PROVAPATH1}`
        );
        system.deleteFolder(
          `${BASEPATH}/${PROVAPATHTARGET}`
        );
      });
    });
    describe(`System static method: deleteRecursiveDir()`, () => {
      const NESTEDDIR = './sono/una/nested/dir';
      const ROOTDIR = './sono';
      const SECONDLEVDIR = './sono/una/';
      it(`dovrebbe cancellare il contenuto di una nested directory`, () => {
        system.createNestedDir(NESTEDDIR);
        expect(system.readdirSync(ROOTDIR)[0]).to.be.equal(
          'una'
        );
        system.deleteRecursiveDir(SECONDLEVDIR);
        expect(system.readdirSync(ROOTDIR)[0]).to.be.equal(
          undefined
        );
        system.deleteRecursiveDir(ROOTDIR);
      });
    });
    describe(`Method isFileInFolder()`, () => {
      it(`dovrebbe tornare true controllando che la cartella contenga un file di nome: ${FILEINSIDEINITIALPATH}`, () => {
        let result = system.isFileInFolder(
          FILEINSIDEINITIALPATH,
          initialPath
        );
        expect(result).to.be.true;
      });
      it(`dovrebbe tornare false controllando che la cartella contenga un file specifico`, () => {
        let result = system.isFileInFolder(
          'FILEINSIDEINITIALPATH',
          initialPath
        );
        expect(result).to.be.false;
      });
    });
  });
});
