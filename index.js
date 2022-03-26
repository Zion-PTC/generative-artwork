import { Drawer } from './classes/Drawer.js';
import { Dna } from './classes/Dna.js';

let dnaObject = {
  width: 1000,
  heigth: 1000,
  startEditionFrom: 1,
  endEditionAt: 4,
  supply: 10,
  description:
    'This is an NFT made by the coolest generative code',
  importMetaUrl: import.meta.url,
  sourceFolderName: 'input',
  baseImageUri: 'http://gotek.znft.tech/nft',
  rarityWeigths: [[1, 1], [2, 2], [3]],
  outputPath: './output/_metadata.json',
};

let drawer = new Drawer();
let dna = new Dna({ ...dnaObject });

const startCreating = async () => {
  dna.writeMetadata('');
  let editionCount = dna.startEditionFrom;
  while (editionCount <= dna.endEditionAt) {
    let rarity = dna.getRarity(editionCount);
    let newDna = Dna.createDna(
      dna.layerManager.layers,
      rarity
    );
    if (dna.isDnaUnique(dna.dnaList, newDna)) {
      let results = dna.constructionLayerToDna(
        newDna,
        dna.layerManager.layers,
        rarity
      );
      let loadedElements = []; //array di promesse
      results.forEach((layer) => {
        loadedElements.push(drawer.loadLayerImage(layer));
      });
      let elementArray = await Promise.all(loadedElements);
      drawer.randomBackground();
      elementArray.forEach((element) => {
        drawer.drawElement(element);
        dna.addAttributes(element);
      });
      drawer.signImage(`#${editionCount}`);
      dna.saveCanvasToPng(drawer.canvas, editionCount);
      dna.addMetadata(newDna, editionCount);
      dna.dnaList.push(newDna);
      console.log(newDna);
      editionCount++;
    } else {
      console.log('DNA exists!');
    }
  }
  dna.writeMetadata(JSON.stringify(dna.metadataList));
};

startCreating();
