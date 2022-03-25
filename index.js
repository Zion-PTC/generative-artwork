import { Drawer } from './classes/Drawer.js';
import { Dna } from './classes/Dna.js';

let dnaObject = {
  width: 1000,
  heigth: 1000,
  supply: 4,
  description: "This is an NFT made by the coolest generative code",
  importMetaUrl: import.meta.url,
  sourceFolderName: 'input',
  baseImageUri: 'http://gotek.znft.tech/nft',
  rarityWeigths: [[1, 1], [2, 2], [3]]
}

let drawer = new Drawer()
let canvas = drawer.canvas
let dna = new Dna({ ...dnaObject })
let layers = dna.layerManager.layers
let startEditionFrom = dna.startEditionFrom
let endEditionAt = dna.endEditionAt
let metadataList = dna.metadataList;
const bufferTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'raw'
]

const startCreating = async () => {
  dna.writeMetadata('');
  let editionCount = startEditionFrom;
  while (editionCount <= endEditionAt) {
    console.log(editionCount);

    let rarity = dna.getRarity(editionCount)
    console.log(rarity);

    let newDna = dna.createDna(layers, rarity)

    if (dna.isDnaUnique(dna.dnaList, newDna)) {
      let results = dna.constructionLayerToDna(
        newDna,
        layers,
        rarity
      );
      let loadedElements = []; //array di promesse

      results.forEach(layer => {
        loadedElements.push(
          drawer.loadLayerImage(layer)
        )
      });

      await Promise.all(loadedElements)
        .then(elementArray => {
          drawer.randomBackground()
          elementArray.forEach(element => {
            drawer.drawElement(element)
            dna.addAttributes(element)
          })
          drawer.signImage(`#${editionCount}`)
          dna.saveImage(
            canvas,
            editionCount,
            bufferTypes[2]
          )
          dna.addMetadata(newDna, editionCount)
        })
      dna.dnaList.push(newDna)
      console.log(dna.dnaList);
      editionCount++;
    } else {
      console.log('DNA exists!');
    }
  }
  dna.writeMetadata(JSON.stringify(metadataList));
};

startCreating();