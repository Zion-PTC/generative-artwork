import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Collection } from '../../Machines/GenerativeArtMachine/Collection.js';
import { system } from '../../Machines/system.js';
import { ZionRegEx } from '../../../telegram-bots/Classes/_Standard Classes/ZionRegEx.js';
import { Drawer } from '../../Machines/GenerativeArtMachine/Drawer.js';
import { Rarity } from '../../Machines/GenerativeArtMachine/Rarity.js';
import { Layer } from '../../Machines/GenerativeArtMachine/Layer.js';
import { Element } from '../../Machines/GenerativeArtMachine/Element.js';
import { Class } from '../../Machines/GenerativeArtMachine/Class.js';
import { Dna } from '../../Machines/GenerativeArtMachine/Dna.js';

function expectedTreeStringResult() {
  let string = `└──input\n ⋮└──classe1\n ⋮ ⋮└──background\n ⋮ ⋮ ⋮└──original\n ⋮ ⋮ ⋮ ⋮├──Background_1.png\n ⋮ ⋮ ⋮ ⋮├──Background_2.png\n ⋮ ⋮ ⋮ ⋮├──Background_3.png\n ⋮ ⋮ ⋮ ⋮├──Background_4.png\n ⋮ ⋮ ⋮ ⋮└──Background_5.png\n ⋮ ⋮ ⋮└──rare\n ⋮ ⋮ ⋮ ⋮├──Background1.png\n ⋮ ⋮ ⋮ ⋮└──Background2.png\n ⋮ ⋮ ⋮└──super_rare\n ⋮ ⋮ ⋮ ⋮└──Background1.png\n ⋮ ⋮└──circle\n ⋮ ⋮ ⋮└──original\n ⋮ ⋮ ⋮ ⋮├──Circle1.png\n ⋮ ⋮ ⋮ ⋮├──Circle2.png\n ⋮ ⋮ ⋮ ⋮├──Circle3.png\n ⋮ ⋮ ⋮ ⋮├──Circle4.png\n ⋮ ⋮ ⋮ ⋮└──Circle5.png\n ⋮ ⋮ ⋮└──rare\n ⋮ ⋮ ⋮ ⋮├──Circle1.png\n ⋮ ⋮ ⋮ ⋮└──Circle2.png\n ⋮ ⋮ ⋮└──super_rare\n ⋮ ⋮ ⋮ ⋮└──Circle1.png\n ⋮ ⋮└──innercircle\n ⋮ ⋮ ⋮└──original\n ⋮ ⋮ ⋮ ⋮├──InnerCircle1.png\n ⋮ ⋮ ⋮ ⋮├──InnerCircle2.png\n ⋮ ⋮ ⋮ ⋮├──InnerCircle3.png\n ⋮ ⋮ ⋮ ⋮├──InnerCircle4.png\n ⋮ ⋮ ⋮ ⋮└──InnerCircle5.png\n ⋮ ⋮ ⋮└──rare\n ⋮ ⋮ ⋮ ⋮├──InnerCircle1.png\n ⋮ ⋮ ⋮ ⋮└──InnerCircle2.png\n ⋮ ⋮ ⋮└──super_rare\n ⋮ ⋮ ⋮ ⋮└──InnerCircle1.png`;
  return string;
}

const testRunner = new Mocha({ slow: 1000 });
testRunner.suite.emit('pre-require', global, 'nofile', testRunner);
var suiteRun = testRunner.run();
process.on('exit', () => {
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
const _FOLDERTREE = 'folderTree';
const _ROOT = 'root';

const NAME = 'Collezione';
const SYMBOL = 'CLZ';
const SUPPLY = 1000;
const BASEURI = 'http://some.mighty.path';
const DESCRIPTION = 'description of my beautiful collection.';
const PATH = '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/input';
const TYPE = 'Element';
const OUTPUTPATH =
  '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/GenerativeArtMachine/Machines';
const WIDTH = 1000;
const HEIGHT = 1000;

let newCollection = new Collection(
  NAME,
  SYMBOL,
  SUPPLY,
  BASEURI,
  DESCRIPTION,
  PATH,
  TYPE,
  OUTPUTPATH,
  WIDTH,
  HEIGHT
);
let newCollection2 = new Collection(
  'bla',
  'sym',
  1000,
  'baseURi',
  'ma che figata',
  '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/input',
  'Edition',
  '/path',
  1000,
  1000
);
let arrayConIlContenutoDellaDirectory = system.readdirSync(PATH);
// nel caso in cui la lista contenga il file .DS_Store
if (arrayConIlContenutoDellaDirectory.includes('.DS_Store')) {
  zionUtil.popFirst(arrayConIlContenutoDellaDirectory);
}

const checkElementsInArrayConstructor = function (elements = [], constructor) {
  let results = [];
  elements.forEach((element) => {
    if (element.constructor !== constructor) {
      results.push(false);
    }
    results.push(true);
  });
  return results.some((res) => res === false) ? false : true;
};

export let CollectionTest = describe('COLLECTION CLASS', () => {
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
      expect(newCollection[_BASEURI]).to.be.equal(BASEURI);
    });
    it(`dovrebbe avere una proprietà: '${_DESCRIPTION}' con valore ${DESCRIPTION}`, () => {
      expect(newCollection.description).to.be.equal(DESCRIPTION);
    });
    it(`dovrebbe avere una proprietà: '${_PATH}', con valore ${PATH}`, () => {
      expect(newCollection[_PATH]).to.be.equal(PATH);
    });
    it(`dovrebbe avere una proprieta: '${_TYPE}' con valore: ${TYPE}`, () => {
      expect(newCollection.type).to.be.equal(TYPE);
    });
    it(`dovrebbe avere una proprietà: '${_OUTPUTPATH}' con valore: ${OUTPUTPATH}`, () => {
      expect(newCollection.outputPath).to.be.equal(OUTPUTPATH);
    });
    describe(`Classe Drawer()`, () => {
      it(`dovrebbe avere una proprietà: '${_DRAWER}' di classe: ${Drawer.name} `, () => {
        expect(newCollection.drawer.constructor === Drawer).to.be.true;
      });
      it(`dovrebbe avere una proprietà: '${_WIDTH}', con valore: ${WIDTH}`, () => {
        expect(newCollection.drawer.canvasProperties.size[_WIDTH]).to.be.equal(
          WIDTH
        );
      });
      it(`dovrebbe avere una proprietà: '${_HEIGHT}', con valore: ${HEIGHT}`, () => {
        expect(newCollection.drawer.canvasProperties.size[_HEIGHT]).to.be.equal(
          HEIGHT
        );
      });
      it(`dovrebbe aver caricato tutti gli elementi`, () => {
        expect(newCollection.drawer.loadedImages.length).to.be.equal(
          newCollection.elements.length
        );
      });
      it(`dovrebbe caricare un'immagine`, async () => {
        let size = await newCollection.drawer.loadImage(
          newCollection.elements[0].path
        );
        expect(size.height).to.be.equal(1000);
      });
    });
    describe(`Collection constructor attribute: ${_FOLDERTREE}`, () => {
      it(`dovrebbe avere una proprietà: ${_FOLDERTREE}, con un valore`, () => {
        expect(newCollection[_FOLDERTREE]).to.be.not.null;
      });
    });
    it(`dovrebbe ritornare il path della collezione`, () => {
      const EXPECTEDRESULT = `${OUTPUTPATH}/${NAME}`;
      expect(newCollection.collectionPath).to.be.equal(EXPECTEDRESULT);
    });
  });
  describe(`GETTERS & SETTERS`, () => {
    describe(`Getter property 'rarities'`, () => {
      it(`dovrebbe tornare una lista di oggetti di tipo 'Rarity'`, () => {
        let rarities = newCollection.rarities;
        expect(Array.isArray(rarities)).to.be.true;
        let results = [];
        rarities.forEach((rarity) => {
          if (rarity.constructor === Rarity) {
            results.push(true);
          } else {
            results.push(false);
          }
        });
        expect(results.some((res) => res === false)).to.be.false;
      });
      it(`dovrebbe avere una proprietà type`, () => {
        log(newCollection.rarities[0].type);
      });
    });
    describe(`Getter property 'layers'`, () => {
      it(`dovrebbe ritornare la lista di ogetti di tipo layer della collezione`, () => {
        let layers = newCollection.layers;
        expect(Array.isArray(layers)).to.be.true;
        let result = checkElementsInArrayConstructor(layers, Layer);
        expect(result).to.be.true;
      });
    });
    describe(`Getter property 'elements'`, () => {
      it(`dovrebbe tornare una lista di oggetti di tipo Element`, () => {
        expect(Array.isArray(newCollection.elements)).to.be.true;
        let res = checkElementsInArrayConstructor(
          newCollection.elements,
          Element
        );
        expect(res).to.be.true;
      });
      it(`dovrebbe ritornare la dimensione del file dell'elemento`, () => {
        let elements = newCollection.elements;
        let element = elements[0];
        expect(element.fileSize).to.be.not.null;
      });
    });
    describe(`Getter property 'classes'`, () => {
      it(`dovrebbe tornare una lista di oggetti di tipo classe`, () => {
        let classes = newCollection.classes;
        expect(Array.isArray(classes)).to.be.true;
        expect(checkElementsInArrayConstructor(classes, Class)).to.be.true;
      });
    });
    describe(`Getter property 'nodeNames'`, () => {
      it(`dovrebbe tornare la lista di nomi di elementi presenti nella collezione`, () => {
        const listaDeiNomiDeiNodi = newCollection.nodeNames;
        expect(Array.isArray(listaDeiNomiDeiNodi)).to.be.true;
      });
    });
    describe(`Getter property 'elementsByLayer'`, () => {
      it(`dovrebbe ritornare un array contente una lista di elementi per ogni layer della classe`, () => {
        const listaDiElementiPerLayer = newCollection.elementsByLayer;
        expect(Array.isArray(listaDiElementiPerLayer)).to.be.true;
        expect(listaDiElementiPerLayer.length).to.be.equal(
          newCollection.layers.length
        );
      });
      it(`dovrebbe tornare un array, il quale puo essere variato, una volta cambiato si dovrebbe\n\t  poter richiamare il getter e ricevere un nuovo array appena creato, quindi i due array\n\t  dovrebbero essere diversi`, () => {
        let result1 = newCollection.elementsByLayer;
        let array1Lenght = result1.length;
        expect(array1Lenght).to.be.equal(3);
        result1.pop();
        expect(array1Lenght).to.be.equal(3);
        expect(result1.length).to.be.equal(2);
        let result2 = newCollection.elementsByLayer;
        expect(result2.length).to.be.equal(3);
      });
    });
    describe(`Getter property 'elementsByLayerByRarity'`, () => {
      it(`dovrebbe tornare gli elementi divisi prima per rarità e in seguito in base al loro layer.`, () => {
        let listaDiELementiPerRaritàPerLayer =
          newCollection.elementsByLayerByRarity;
        expect(Array.isArray(listaDiELementiPerRaritàPerLayer)).to.be.true;
        expect(listaDiELementiPerRaritàPerLayer.length).to.be.equal(
          newCollection.rarities.length
        );
        expect(listaDiELementiPerRaritàPerLayer[0].length).to.be.equal(
          newCollection.layers.length
        );
      });
    });
    describe(`Getter property 'possibiliDna'`, () => {
      it(`dovrebbe creare una lista con tutte le combinazioni possibili`, () => {
        let result = newCollection.possibiliDna;
        expect(result.length).to.be.equal(512);
      });
    });
    describe(`Getter property 'possibiliDnaPerRarità'`, () => {
      it(`dovrebbe tornare un lista di possibilità divise per rarità.`, () => {
        let result = newCollection.possibiliDnaPerRarità;
        expect(result[0].length).to.be.equal(125);
        expect(result[1].length).to.be.equal(8);
        expect(result[2].length).to.be.equal(1);
      });
    });
  });
  describe(`COLLECTION STATIC PROPERTIES`, () => {
    describe(`Property 'collections'`, () => {
      it(`dovrebbe tornare una lista di collezioni create tramite la funzione`, () => {
        expect(Collection.collections.length).to.be.equal(2);
      });
      it(`non dovrebbe permettere l'aggiunta di un elemento`, () => {
        expect(Collection.collections.length).to.be.equal(2);
        let array = Collection.collections;
        expect(() => {
          array.push('iiiiiiiiiiii');
        }).to.throw();
        expect(Collection.collections.length).to.be.equal(2);
      });
    });
  });
  describe(`COLLECTION STATIC METHODS`, () => {
    describe(`Method: collectionExists()`, () => {
      it(`dovrebbe verificare che la directory della collezione: ${newCollection.name} non è ancora stata creata`, () => {
        expect(Collection.collectionExists(NAME)).to.be.true;
        expect(Collection.collectionExists('pio')).to.be.false;
      });
    });
    describe(`Method deleteCollection()`, () => {
      it(`dovrebbe cancellare la collezione selezionata passandogli il nome della stessa`, () => {
        const nomeDellaCollezioneDaCancellare = newCollection2.name;
        Collection.deleteCollection(nomeDellaCollezioneDaCancellare);
        expect(Collection.collections.length).to.be.equal(1);
        expect(
          Collection.collections.findIndex(
            (collection) => collection.name === nomeDellaCollezioneDaCancellare
          )
        ).to.be.equal(-1);
      });
      it(`dovrebbe lanciare un errore perché la collezione non esiste.`, () => {
        const nomeDellaCollezioneCheNonEsiste = 'ucci';
        expect(() => {
          Collection.deleteCollection(nomeDellaCollezioneCheNonEsiste);
        }).to.throw();
      });
    });
  });
  describe(`COLLECTION INSTANCE METHODS`, () => {
    describe(`Method hasDir()`, () => {
      it(`dovrebbe tornare false in quanto la cartella con il nome della collezione non esiste ancora.`, () => {
        expect(newCollection.hasDir()).to.be.false;
      });
      it(`creiamo la cartella nell'output path, e la funzione dovrebbe tornare true.`, () => {
        system.createNestedDir(`${OUTPUTPATH}/${NAME}`);
        expect(newCollection.hasDir()).to.be.true;
        system.deleteRecursiveDir(`${OUTPUTPATH}/${NAME}`);
      });
    });
    describe(`Method creaDirectory()`, () => {
      it(`dovrebbe creare una cartella con nome: ${NAME}`, () => {
        const PATHDELLACOLLEZIONE = `${OUTPUTPATH}/${NAME}`;
        system.deleteRecursiveDir(PATHDELLACOLLEZIONE);
      });
      it(`dovrebbe lanciare un errore in quanto la cartella esiste già`, () => {
        const PATHDELLACOLLEZIONE = `${OUTPUTPATH}/${NAME}`;
        system.createNestedDir(PATHDELLACOLLEZIONE);
        expect(() => newCollection.creaDirectory()).to.throw(
          'Non è stato possibile'
        );
        system.deleteRecursiveDir(PATHDELLACOLLEZIONE);
      });
    });
    describe(`Method creaEdizione()`, () => {
      it(`Dovrebbe tornare un array contenente un dna a caso fra quelli possibili.`, () => {
        let dna = newCollection.creaEdizione();
        expect(zionUtil.checkObjectConstructor(dna, Dna)).to.be.true;
      });
      it(`dovrebbe continuare l'estrazione di elementi in modo da esaurire piano piano tutte le possibili combinazioni`, () => {
        //
        expect(
          newCollection.picker.estrazione.elementiRimanenti.length
        ).to.be.equal(511);
        newCollection.creaEdizione();
        expect(
          newCollection.picker.estrazione.elementiRimanenti.length
        ).to.be.equal(510);
      });
    });
    describe(`Method creaEdizioneNVolte()`, () => {
      it(`dovrebbe effettuare piu volte l'estrazione fra i possibili dna`, () => {
        log(newCollection.picker.estrazione.elementiRimanenti.length);
        let dnas = newCollection.creaEdizioneNVolte(10);
        log(dnas);
        log(newCollection.picker.estrazione.elementiRimanenti.length);
      });
      it(`newPicker`, () => {
        let picker = newCollection.picker;
        let dnaPossibili = newCollection.possibiliDna;
        let newPicker = newCollection.newPicker;
        let ep = picker.estrazione;
        let enp = newPicker.estrazione;
        let {
          arrayOriginale: aop,
          elementiEstratti: eiep,
          elementiRimanenti: eirp,
          elementoEstratto: eep,
        } = ep;
        let {
          arrayOriginale: aonp,
          elementiEstratti: eienp,
          elementiRimanenti: eirnp,
          elementoEstratto: eenp,
        } = enp;
        log(eirnp.length);
        log(eirp.length);
        log(dnaPossibili.length);
      });
    });
  });
  describe(`COLLECTION SETTERS`, () => {
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
        expect(newCollection.type).to.be.equal(EXPECTEDVALUE);
      });
    });
  });
  describe.only(`Method methodName`, () => {
    it(`task description`, () => {
      let classes = newCollection.classes;
      let primaClasse = classes[0];
      log(primaClasse);
    });
  });
});
