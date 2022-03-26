import { Generator } from './Generator.js';
import { LayerManager } from './LayerManager.js';
import { RarityWeight } from './RarityWeight.js';
import { System } from './System.js';

export class Dna {
  constructor({
    width,
    heigth,
    startEditionFrom = 1,
    endEditionAt = 2,
    supply,
    description = '',
    importMetaUrl,
    sourceFolderName,
    baseImageUri = '',
    rarityWeigths,
    outputPath,
  }) {
    this.description = description;
    this.baseImageUri = baseImageUri;
    this.startEditionFrom = startEditionFrom;
    this.endEditionAt = endEditionAt;
    this.supply = supply;
    this.rarityWeigths = [
      new RarityWeight(
        'super_rare',
        rarityWeigths[0][0],
        rarityWeigths[0][1]
      ),
      new RarityWeight(
        'rare',
        rarityWeigths[1][0],
        rarityWeigths[1][1]
      ),
      new RarityWeight(
        'original',
        rarityWeigths[2][0],
        this.supply
      ),
    ];
    this.outputPath = outputPath;
    this.metadataList = [];
    this.attributesList = [];
    this.dnaList = [];
    this.layerManager = new LayerManager(
      importMetaUrl,
      width,
      heigth,
      sourceFolderName
    );
  }
  isDnaUnique = (dnaList = [], dna = []) => {
    let foundDna = dnaList.find(
      (i) => i.join('') === dna.join('')
    );
    return foundDna == undefined ? true : false;
  };
  addMetadata = (dna, edition) => {
    let date = Date.now();
    let tempMetadata = {
      dna: dna.join(''),
      name: `#${edition}`,
      description: this.description,
      image: `${this.baseImageUri}/${edition}`,
      edition: edition,
      date,
      attributeList: this.attributesList,
    };
    this.metadataList.push(tempMetadata);
    this.attributesList = [];
  };
  addAttributes = (element) => {
    let selectedElement = element.layer.selectedElement;
    this.attributesList.push({
      name: selectedElement.name,
      rarity: selectedElement.rarity,
    });
  };
  getRarity = (editionCount) => {
    let rarity = '';
    this.rarityWeigths.forEach((rarityWeight) => {
      if (
        editionCount >= rarityWeight.from &&
        editionCount <= rarityWeight.to
      ) {
        rarity = rarityWeight.value;
      }
    });
    return rarity;
  };
  constructionLayerToDna = (
    dna = [],
    layers = [],
    rarity
  ) => {
    let mappedDnaToLayers = layers.map((layer, index) => {
      let selectedElement =
        layer.elements[rarity][dna[index]];
      return {
        location: layer.location,
        position: layer.position,
        size: layer.size,
        selectedElement: selectedElement,
      };
    });
    return mappedDnaToLayers;
  };
  writeMetadata = (data) => {
    System.writeJson(this.outputPath, data);
  };
  saveCanvasToPng = (canvas, editionCount) => {
    const bufferTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'raw',
    ];
    return System.writePng(
      `./output/${editionCount}.png`,
      canvas.toBuffer('image/png')
    );
  };
  static createDna = (layers, rarity) => {
    return layers.map((layer) => {
      let layerElementsOfRarity =
        layer.elements[rarity].length;
      return Generator.numeroRandomIntero(
        layerElementsOfRarity
      );
    });
  };
}
