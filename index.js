import { Drawer } from './classes/Drawer.js';
import { Dna } from './classes/Dna.js';

let dnaObject = {
  width: 1000,
  heigth: 1000,
  startEditionFrom: 1,
  endEditionAt: 4,
  supply: 10,
  description: "This is an NFT made by the coolest generative code",
  importMetaUrl: import.meta.url,
  sourceFolderName: 'input',
  baseImageUri: 'http://gotek.znft.tech/nft',
  rarityWeigths: [[1, 1], [2, 2], [3]]
}

let drawer = new Drawer()
let dna = new Dna({ ...dnaObject })
const bufferTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'raw'
]


const startCreating = async () => {
  dna.writeMetadata('');
  let editionCount = dna.startEditionFrom;
  while (editionCount <= dna.endEditionAt) {
    console.log(editionCount);

    let rarity = dna.getRarity(editionCount)
    console.log(rarity);

    let newDna = dna.createDna(dna.layerManager.layers, rarity)

    if (dna.isDnaUnique(dna.dnaList, newDna)) {
      let results = dna.constructionLayerToDna(
        newDna,
        dna.layerManager.layers,
        rarity
      );
      let loadedElements = []; //array di promesse

      results.forEach(layer => {
        loadedElements.push(
          drawer.loadLayerImage(layer)
        )
      });

      let elementArray = await Promise.all(loadedElements)
      drawer.randomBackground()
      elementArray.forEach(element => {
        drawer.drawElement(element)
        dna.addAttributes(element)
      })
      drawer.signImage(`#${editionCount}`)
      dna.saveImage(
        drawer.canvas,
        editionCount,
        bufferTypes[2]
      )
      dna.addMetadata(newDna, editionCount)
      dna.dnaList.push(newDna)
      console.log(dna.dnaList);
      editionCount++;
    } else {
      console.log('DNA exists!');
    }
  }
  dna.writeMetadata(JSON.stringify(dna.metadataList));
};

startCreating();