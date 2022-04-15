import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Collection } from '../../Machines/GenerativeArtMachine/Collection.js';
import { System } from '../../Machines/System.js';
import { ZionRegEx } from '../../../telegram-bots/Classes/_Standard Classes/ZionRegEx.js';
import { Drawer } from '../../Machines/GenerativeArtMachine/Drawer.js';

function expectedTreeStringResult() {
  let string = `└──input\n ⋮└──background\n ⋮ ⋮└──original\n ⋮ ⋮ ⋮├──Background_1.png\n ⋮ ⋮ ⋮├──Background_2.png\n ⋮ ⋮ ⋮├──Background_3.png\n ⋮ ⋮ ⋮├──Background_4.png\n ⋮ ⋮ ⋮├──Background_5.png\n ⋮ ⋮ ⋮└──asdf\n ⋮ ⋮└──rare\n ⋮ ⋮ ⋮├──Background1.png\n ⋮ ⋮ ⋮└──Background2.png\n ⋮ ⋮└──super_rare\n ⋮ ⋮ ⋮└──Background1.png\n ⋮└──circle\n ⋮ ⋮└──original\n ⋮ ⋮ ⋮├──Circle1.png\n ⋮ ⋮ ⋮├──Circle2.png\n ⋮ ⋮ ⋮├──Circle3.png\n ⋮ ⋮ ⋮├──Circle4.png\n ⋮ ⋮ ⋮└──Circle5.png\n ⋮ ⋮└──rare\n ⋮ ⋮ ⋮├──Circle1.png\n ⋮ ⋮ ⋮└──Circle2.png\n ⋮ ⋮└──super_rare\n ⋮ ⋮ ⋮└──Circle1.png\n ⋮└──innercircle\n ⋮ ⋮└──original\n ⋮ ⋮ ⋮├──InnerCircle1.png\n ⋮ ⋮ ⋮├──InnerCircle2.png\n ⋮ ⋮ ⋮├──InnerCircle3.png\n ⋮ ⋮ ⋮├──InnerCircle4.png\n ⋮ ⋮ ⋮└──InnerCircle5.png\n ⋮ ⋮└──rare\n ⋮ ⋮ ⋮├──InnerCircle1.png\n ⋮ ⋮ ⋮└──InnerCircle2.png\n ⋮ ⋮└──super_rare\n ⋮ ⋮ ⋮└──InnerCircle1.png`;
  return string;
}

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

let name,
  symbol,
  supply,
  baseURI,
  description,
  path,
  type,
  outputPath,
  width,
  height;

// proprietà della classe
const _ID = 'id';
const _NAME = 'name';
const _SYMBOL = 'symbol';
const _SUPPLY = 'supply';
const _BASEURI = 'baseURI';
const _DESCRIPTION = 'description';
const _PATH = 'path';
const _TYPE = 'type';
const _OUTPUTPATH = 'outputPath';
const _DRAWER = 'drawer';
const _WIDTH = 'width';
const _HEIGHT = 'height';
const _FOLDERSTRUCTURE = 'folderStructure';
const _ROOT = 'root';

const NAME = 'Collezione';
const SYMBOL = 'CLZ';
const SUPPLY = 1000;
const BASEURI = 'http://some.mighty.path';
const DESCRIPTION =
  'description of my beautiful collection.';
const PATH =
  '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/input';
const TYPE = 'Edition';
const OUTPUTPATH =
  '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/GenerativeArtMachine/Machines';
const WIDTH = 1000;
const HEIGHT = 1000;
name = NAME;
symbol = SYMBOL;
supply = SUPPLY;
baseURI = BASEURI;
description = DESCRIPTION;
path = PATH;
type = TYPE;
outputPath = OUTPUTPATH;
width = WIDTH;
height = HEIGHT;

let newCollection = new Collection(
  name,
  symbol,
  supply,
  baseURI,
  description,
  path,
  type,
  outputPath,
  width,
  height
);
let arrayConIlContenutoDellaDirectory =
  System.readDirSync(PATH);
// nel caso in cui la lista contenga il file .DS_Store
if (
  arrayConIlContenutoDellaDirectory.includes('.DS_Store')
) {
  zionUtil.popFirst(arrayConIlContenutoDellaDirectory);
}
// log(newCollection);
// log(newCollection.folderStructure.children[0].children[0]);

export let CollectionTest =
  describe('COLLECTION CLASS', () => {
    describe('COLLECTION CONSTRUCTOR', () => {
      it(`dovrebbe avere una proprietà: '${_ID}', con valore: 1`, () => {
        expect(newCollection[_ID]).to.be.equal(1);
      });
      it(`dovrebbe avere una proprietà: '${_NAME}' con valore: ${NAME}`, () => {
        expect(newCollection[_NAME]).to.be.equal(NAME);
      });
      it(`dovrebbe avere una proprietà: '${_SYMBOL}' con valore: ${SYMBOL}`, () => {
        expect(newCollection[_SYMBOL]).to.be.equal(SYMBOL);
      });
      it(`dovrebbe avere una proprietà: '${_SUPPLY}' con valore: ${SUPPLY}`, () => {
        expect(newCollection.supply).to.be.equal(SUPPLY);
      });
      it(`dovrebbe avere una proprietà: '${_BASEURI}', con valore ${BASEURI}`, () => {
        expect(newCollection[_BASEURI]).to.be.equal(
          BASEURI
        );
      });
      it(`dovrebbe avere una proprietà: '${_DESCRIPTION}' con valore ${DESCRIPTION}`, () => {
        expect(newCollection.description).to.be.equal(
          DESCRIPTION
        );
      });
      it(`dovrebbe avere una proprietà: '${_PATH}', con valore ${PATH}`, () => {
        expect(newCollection[_PATH]).to.be.equal(PATH);
      });
      it(`dovrebbe avere una proprieta: '${_TYPE}' con valore: ${TYPE}`, () => {
        expect(newCollection.type).to.be.equal(TYPE);
      });
      it(`dovrebbe avere una proprietà: '${_OUTPUTPATH}' con valore: ${OUTPUTPATH}`, () => {
        expect(newCollection.outputPath).to.be.equal(
          OUTPUTPATH
        );
      });
      describe(`Classe Drawer()`, () => {
        it(`dovrebbe avere una proprietà: '${_DRAWER}' di classe: ${Drawer.name} `, () => {
          expect(
            newCollection.drawer.constructor === Drawer
          ).to.be.true;
        });
        it(`dovrebbe avere una proprietà: '${_WIDTH}', con valore: ${WIDTH}`, () => {
          expect(
            newCollection.drawer.canvasProperties.size[
              _WIDTH
            ]
          ).to.be.equal(WIDTH);
        });
        it(`dovrebbe avere una proprietà: '${_HEIGHT}', con valore: ${HEIGHT}`, () => {
          expect(
            newCollection.drawer.canvasProperties.size[
              _HEIGHT
            ]
          ).to.be.equal(HEIGHT);
        });
      });
      describe(`Collection constructor attribute: ${_FOLDERSTRUCTURE}`, () => {
        it(`dovrebbe avere una proprietà: ${_FOLDERSTRUCTURE}, con un valore`, () => {
          expect(newCollection[_FOLDERSTRUCTURE]).to.be.not
            .null;
        });
        it(`l'oggetto: ${_FOLDERSTRUCTURE} dovrebbe contenere un nodo con attributo: ${_ROOT}, con valore: '${PATH}'`, () => {
          expect(
            newCollection.folderStructure[_ROOT]
          ).to.be.equal(PATH);
        });
        it(`l'oggetto: ${_FOLDERSTRUCTURE} dovrebbe contenere un child con attributo: ${_PATH}, con valore: '${arrayConIlContenutoDellaDirectory[0]}`, () => {
          expect(newCollection.folderStructure.children[0])
            .not.to.be.null;
          expect(
            newCollection.folderStructure.children[0].path
          ).to.be.equal(
            `${PATH}/${arrayConIlContenutoDellaDirectory[0]}`
          );
        });
        it(`dovrebbe effettuare una ricerca DFS`, () => {
          //
        });
        describe(`Class TreeNode`, () => {
          it(`dovrebbe ritronare una stringa formattata che mostra il tree, con valore uguale a ${ZionRegEx.firstAndLastDyn(
            expectedTreeStringResult(),
            5
          ).join('...')}`, () => {
            let stringedTree =
              newCollection.folderStructure.toStringedTree();
            expect(stringedTree).to.be.equal(
              expectedTreeStringResult()
            );
          });
        });
      });
      it(`dovrebbe ritornare il path della collezione`, () => {
        const EXPECTEDRESULT = `${OUTPUTPATH}/${NAME}`;
        expect(newCollection.collectionPath).to.be.equal(
          EXPECTEDRESULT
        );
      });
    });
    describe(`COLLETION STATIC METHODS`, () => {
      describe(`Method: collectionExists()`, () => {
        it(`dovrebbe verificare che la directory della collezione: ${newCollection.name} non è ancora stata creata`, () => {
          // System.createNestedDir(BASEURI);
          // // log(System.readDirSync(BASEURI));
          // expect(
          //   Collection.collectionExists(NAME, BASEURI)
          // ).to.be.equal(false);
          // System.deleteRecursiveDir('./some');
          expect(Collection.collectionExists(NAME)).to.be
            .true;
          expect(Collection.collectionExists('pio')).to.be
            .false;
        });
        // it(`dovrebbe verificare che la directory della collezione: ${newCollection.name} sia stata creata`, () => {
        //   // System.createNestedDir(`${BASEURI}/${NAME}`);
        //   // log(System.readDirSync(BASEURI));
        //   // expect(
        //   //   Collection.collectionExists(NAME, BASEURI)
        //   // ).to.be.equal(true);
        //   // System.deleteRecursiveDir('./some');
        // });
      });
    });
    describe(`COLLECTION INSTANCE METHODS`, () => {
      describe(`Method hasDir()`, () => {
        it(`dovrebbe tornare false in quanto la cartella con il nome della collezione non esiste ancora.`, () => {
          expect(newCollection.hasDir()).to.be.false;
        });
        it(`creiamo la cartella nell'output path, e la funzione dovrebbe tornare true.`, () => {
          System.createNestedDir(`${OUTPUTPATH}/${NAME}`);
          expect(newCollection.hasDir()).to.be.true;
          System.deleteRecursiveDir(
            `${OUTPUTPATH}/${NAME}`
          );
        });
      });
      describe(`Method creaDirectory()`, () => {
        it(`dovrebbe creare una cartella con nome: ${NAME}`, () => {
          const PATHDELLACOLLEZIONE = `${OUTPUTPATH}/${NAME}`;
          System.deleteRecursiveDir(PATHDELLACOLLEZIONE);
        });
        it(`dovrebbe lanciare un errore in quanto la cartella esiste già`, () => {
          const PATHDELLACOLLEZIONE = `${OUTPUTPATH}/${NAME}`;
          System.createNestedDir(PATHDELLACOLLEZIONE);
          expect(() =>
            newCollection.creaDirectory()
          ).to.throw('Non è stato possibile');
          System.deleteRecursiveDir(PATHDELLACOLLEZIONE);
        });
      });
    });
    describe(`COLLECTION INSTANCE SETTERS`, () => {
      const SUPPLY = 'supply';
      const VALUE = 1000;
      describe(`Method: set supply()`, () => {
        it(`dovrebbe registrare l'attributo: ${SUPPLY} con un valore uguale a: ${VALUE}`, () => {
          newCollection.supply = VALUE;
          expect(newCollection.supply).to.be.equal(VALUE);
        });
      });
      const TYPE = 'type';
      const EXPECTEDVALUE = 'Edition';
      describe(`Method: set type`, () => {
        it(`dovrebbe registrare l'attributo: ${TYPE} con il valore: ${EXPECTEDVALUE}`, () => {
          newCollection.type = EXPECTEDVALUE;
          expect(newCollection.type).to.be.equal(
            EXPECTEDVALUE
          );
        });
      });
    });
  });
