import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '@zionstate_node/zion-util';
import { Drawer } from '../built/src/GenerativeArtMachine/Drawer.js';
import { system } from '@zionstate/system';

// TODO #3 provare se funziona con gli elementi

const testRunner = new Mocha({ slow: 1000 });
testRunner.suite.emit('pre-require', global, 'nofile', testRunner);
var suiteRun = testRunner.run();
process.on('exit', code => {
  process.exit(suiteRun.stats.failures > 0);
});
let log = zionUtil.debuglog('log');

const IMAGE1PATH =
  '/Users/WAW/Documents/Projects/__EXTERNAL_APP_RESOURCES/generative-art/Squares/classe1/background/original/Background_1.png';
const IMAGE2PATH =
  '/Users/WAW/Documents/Projects/__EXTERNAL_APP_RESOURCES/generative-art/Squares/classe1/circle/original/Circle1.png';
const IMAGESPATHS = [IMAGE1PATH, IMAGE2PATH];
const OUTPUTPATH =
  '/Users/WAW/Documents/Projects/ZION/apps/generative-artwork/test/Drawer/Test_Output';

let newDefaultDrawer = new Drawer();
let width = 2000;
let height = 2000;
let x = 0;
let y = 0;
let context = '2d';
let newDrawer = new Drawer(width, height, context);

export let DrawerTest = describe(`DRAWER CLASS`, () => {
  describe(`DRAWER CONSTRUCTOR`, () => {
    describe(`Oggetto construito con valori default`, () => {
      it(`dovrebbe ritornare width = 1000`, () => {
        expect(newDefaultDrawer.canvasProperties.size.width).to.be.equal(1000);
      });
      it(`dovrebbe ritornare heigth = 1000`, () => {
        expect(newDefaultDrawer.canvasProperties.size.height).to.be.equal(1000);
      });
      it(`dovrebbe ritornare context = '2d'`, () => {
        expect(newDefaultDrawer.canvasProperties.context).to.be.equal('2d');
      });
    });
    describe(`Oggetto construito con widht: ${width}, height: ${height} e context: ${context}`, () => {
      it(`dovrebbe ritornare width = ${width}`, () => {
        expect(newDrawer.canvasProperties.size.width).to.be.equal(width);
      });
      it(`dovrebbe ritornare heigth = ${height}`, () => {
        expect(newDrawer.canvasProperties.size.height).to.be.equal(height);
      });
      it(`dovrebbe ritornare context = ${context}`, () => {
        expect(newDrawer.canvasProperties.context).to.be.equal(context);
      });
    });
  });
  describe(`METHODS`, () => {
    let image1 = newDefaultDrawer.loadImage(IMAGE1PATH);
    // let loadedImages = newDefaultDrawer.loadImages(IMAGESPATHS);
    describe(`Method loadImage()`, () => {
      it(`dovrebbe completare il caricamento del file dal percorso fornito`, async () => {
        let expectedResult = true;
        let { complete } = await image1;
        expect(complete).to.be.true;
      });
      it(`dovrebbe aver caricato un immagine con width: 1000.`, async () => {
        let { width } = await image1;
        expect(width).to.be.equal(1000);
      });
      it(`dovrebbe aver caricato un immagine con height: 1000.`, async () => {
        let { height } = await image1;
        expect(height).to.be.equal(1000);
      });
      it(`dovrebbe aver caricato un immagine con src: ${IMAGE1PATH}.`, async () => {
        let { src } = await image1;
        expect(src).to.be.equal(IMAGE1PATH);
      });
      it(`dovrebbe aver caricato un immagine con naturalWidth: 1000.`, async () => {
        let { naturalWidth } = await image1;
        expect(naturalWidth).to.be.equal(1000);
      });
      it(`dovrebbe aver caricato un immagine con naturalHeight: 1000.`, async () => {
        let { naturalHeight } = await image1;
        expect(naturalHeight).to.be.equal(1000);
      });
    });
    describe(`Method drawImage()`, () => {
      it(`dovrebbe disegnare un elemento nel canvas`, async () => {
        const FILENAME = 'prova.png';
        const PATH = `${OUTPUTPATH}/${FILENAME}`;
        let image = await image1;
        newDefaultDrawer.drawImage(image, x, y, width, height);
        log(newDefaultDrawer.canvas);
        system.writePng(PATH, newDefaultDrawer.canvas.toBuffer());
        expect(system.isFileInFolder(FILENAME, OUTPUTPATH)).to.be.true;
        let logger = thisIs => {
          log(thisIs);
        };
        system.deleteFile(PATH, logger);
      });
    });
    // describe(`Method loadImages()`, () => {
    //   it.only(`dovrebbe ritornare un array con le promesse delle immagini caricate.`, async () => {
    //     let _loadedImages = await loadedImages;
    //     let { complete: complete1 } = _loadedImages[0];
    //     let { complete: complete2 } = _loadedImages[1];
    //     expect(complete1).to.be.true;
    //     expect(complete2).to.be.true;
    //   });
    //   it(`dovrebbe avere caricato l'immagine con path: ${IMAGE2PATH}`, async () => {
    //     let _loadedImages = await loadedImages;
    //     let { src } = _loadedImages[1];
    //     expect(src).to.be.equal(IMAGE2PATH);
    //     _loadedImages.pop();
    //     _loadedImages.pop();
    //   });
    // });
    describe(`Method randomBackground()`, () => {
      it(`dovrebbe generare un elemento canvas con un background generato a caso`, () => {
        //
      });
    });
    describe(`Method signImage`, () => {
      it(`dovrebbe generare una scritta che appare sul canvas`, () => {
        //
      });
    });
  });
  describe(`GETTER & SETTERS`, () => {
    // describe(`loadedImages`, () => {
    //   const VALUE1 = 1;
    //   const VALUE2 = 2;
    //   const VALUE3 = 3;
    //   // nella forma array non può essere usato per
    //   // aggiungere element nell'array
    //   let array = newDefaultDrawer.loadedImages;
    //   it.only(`dovrebbe aggiungere elementi e ritornare elementi nell'array e dall'array loadedImages`, () => {
    //     newDefaultDrawer.loadedImages = VALUE1;
    //     newDefaultDrawer.loadedImages = VALUE2;
    //     newDefaultDrawer.loadedImages = VALUE3;
    //     expect(array.length).to.be.not.null;
    //     expect(array[0]).to.be.equal(VALUE1);
    //     expect(array[1]).to.be.equal(VALUE2);
    //     expect(array[2]).to.be.equal(VALUE3);
    //   });
    //   it(`dovrebbe togliere un elemento dall'array`, () => {
    //     log(array);
    //     newDefaultDrawer.loadedImages.pop();
    //     expect(array.length).to.be.equal(2);
    //     expect(array[0]).to.be.equal(VALUE1);
    //     expect(array[1]).to.be.equal(VALUE2);
    //     expect(array[2]).to.be.undefined;
    //   });
    //   newDefaultDrawer.loadedImages.pop();
    //   newDefaultDrawer.loadedImages.pop();
    //   newDefaultDrawer.loadedImages.pop();
    //   log(array);
    // });
  });
});
