export class DnaManager {
  constructor({
    width,
    heigth,
    importMetaUrl,
    sourceFolderName,
    startEditionFrom = 1,
    endEditionAt = 2,
    supply,
    description = '',
    baseImageUri = '',
    rarityWeights,
    outputPath,
  }) {
    this.layerManager = new LayerManager(
      width,
      heigth,
      importMetaUrl,
      sourceFolderName
    );
    this.description = description;
    this.baseImageUri = baseImageUri;
    this.startEditionFrom = startEditionFrom;
    this.endEditionAt = endEditionAt;
    this.supply = supply;
    this.rarityWeights = [
      new RarityWeight(
        'super_rare',
        rarityWeights[0][0],
        rarityWeights[0][1],
        () => {}
      ),
      new RarityWeight(
        'rare',
        rarityWeights[1][0],
        rarityWeights[1][1]
      ),
      new RarityWeight(
        'original',
        rarityWeights[2][0],
        this.supply
      ),
    ];
    this.rarity = '';
    this.outputPath = outputPath;
    this.metadataList = [];
    this.attributesList = [];
    this.dnaList = [];
    this.possibleCombinations;
  }
  //__Controls
  haveAllLayersSameRarities() {}
  pickRandomPossibility() {}
  pickSpecificPossibility() {}
  calculatePossibleCombinations() {}
  get elementCountsByRarity() {
    let setOfRarities = this.raritySet;
    let array = [];
    this.rarities.forEach((rarity) => {
      return setOfRarities.add(rarity.name);
    });
    setOfRarities.forEach((rarity) => {
      let obj = {};
      obj['name'] = rarity;
      this.raritiesSortedByLayer.filter((layer) => {
        obj[layer.name] = layer[rarity];
      });
      return array.push(obj);
    });
    return array;
  }
  get possibleCombinationsPerRarity() {
    let rarityObj = {};
    this.elementCountsByRarity.forEach((rarity) => {
      rarityObj[rarity.name] = [];
      this.layers.forEach((layer) => {
        rarityObj[rarity.name].push(rarity[layer.name]);
      });
      return (rarityObj[rarity.name] = rarityObj[
        rarity.name
      ].reduce((p, c) => p * c));
    });
    return rarityObj;
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
    this.rarity = '';
    this.rarityWeights.forEach((rarityWeight) => {
      if (
        editionCount >= rarityWeight.from &&
        editionCount <= rarityWeight.to
      ) {
        this.rarity = rarityWeight.name;
      }
    });
    return this;
  };
  constructionLayerToDna = (dna = [], layers = []) => {
    let mappedDnaToLayers = layers.map((layer, index) => {
      let selectedElement =
        layer.elements[this.rarity][dna[index]];
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
    return System.writeJson(this.outputPath, data);
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
  createDna = (rarity) => {
    return this.layerManager.layers.map((layer) => {
      return Generator.integerRandomNumber(
        layer.elements[rarity].length
      );
    });
  };

  //Dna

  addDnaToDnaList() {}
  createUniqueDna() {}
}
