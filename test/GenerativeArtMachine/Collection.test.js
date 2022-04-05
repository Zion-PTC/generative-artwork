import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/Utils.js';
import { Collection } from '../../Machines/GenerativeArtMachine/Collection.js';
import { System } from '../../Machines/System/System.js';

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

const _ID = 'id';
const NAME = 'Collezione';
const _NAME = 'name';
const PATH =
  '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/input';
const _PATH = 'path';
const BASEURI = './some/mighty/path';
const _BASEURI = 'baseUri';
const FOLDERSTRUCTURE = '';
const _FOLDERSTRUCTURE = 'folderStructure';
const _ROOT = 'root';

let newCollection = new Collection(NAME, PATH, BASEURI);
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
      it(`L'oggetto dovrebbe avere una proprieta: ${_ID}, con valore: 1`, () => {
        log(newCollection[_ID]);
        expect(newCollection[_ID]).to.be.equal(1);
      });
      it(`L'oggetto dovrebbe avere una proprietà: '${_NAME}' con valore: ${NAME}`, () => {
        expect(newCollection[_NAME]).to.be.equal(NAME);
      });
      it(`dovrebbe avere una proprietà: ${_PATH}, con valore ${PATH}`, () => {
        expect(newCollection[_PATH]).to.be.equal(PATH);
      });
      it(`dovrebbe avere un paramentro: ${_BASEURI}, con valore ${BASEURI}`, () => {
        expect(newCollection[_BASEURI]).to.be.equal(
          BASEURI
        );
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
        describe(`Class TreeNode`, () => {
          it(`dovrebbe ritronare una stringa formattata che mostra il tree`, () => {
            console.log(
              newCollection.folderStructure.toStringedTree()
            );
          });
        });
      });
    });
    // describe(`COLLETION STATIC METHODS`, () => {
    //   describe(`Method: collectionExists()`, () => {
    //     it(`dovrebbe verificare che la directory della collezione: ${newCollection.name} non è ancora stata creata`, () => {
    //       System.createNestedDir(BASEURI);
    //       log(System.readDirSync(BASEURI));
    //       expect(
    //         Collection.collectionExists(NAME, BASEURI)
    //       ).to.be.equal(false);
    //       System.deleteRecursiveDir('./some');
    //     });
    //     it(`dovrebbe verificare che la directory della collezione: ${newCollection.name} è ancora stata creata`, () => {
    //       System.createNestedDir(`${BASEURI}/${NAME}`);
    //       log(System.readDirSync(BASEURI));
    //       expect(
    //         Collection.collectionExists(NAME, BASEURI)
    //       ).to.be.equal(true);
    //       System.deleteRecursiveDir('./some');
    //     });
    //   });
    // });
    // describe(`COLLECTION INSTANCE SETTERS`, () => {
    //   const SUPPLY = 'supply';
    //   const VALUE = 1000;
    //   describe(`Method: set supply()`, () => {
    //     it(`dovrebbe registrare l'attributo: ${SUPPLY} con un valore uguale a: ${VALUE}`, () => {
    //       newCollection.supply = VALUE;
    //       expect(newCollection.supply).to.be.equal(VALUE);
    //     });
    //   });
    //   const TYPE = 'type';
    //   const EXPECTEDVALUE = 'Edition';
    //   describe(`Method: set type`, () => {
    //     it(`dovrebbe registrare l'attributo: ${TYPE} con il valore: ${EXPECTEDVALUE}`, () => {
    //       newCollection.type = 1;
    //       expect(newCollection.type).to.be.equal(
    //         EXPECTEDVALUE
    //       );
    //     });
    //   });
    // });
  });
