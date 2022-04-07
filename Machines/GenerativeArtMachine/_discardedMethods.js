export class _discardedMethods {
  constructor() {}
  // CLASS
  classExists() {}
  createClasses(classes) {
    classes.forEach((className) => {
      let newClass = new Class(
        className,
        this.path,
        this.name
      );
      this.classes.push(newClass);
    });
  }
  // LAYERS
  createLayers() {
    let layersName = System.arrayOfFoldersInDirectory(
      this.path
    );
    layersName.forEach((layerName) => {
      let newLayer = new Layer(
        layerName,
        `${this.path}/${layerName}`,
        this.collection
      );
      return this.layers.push(newLayer);
    });
  }
  // RARITIES
  createRarities(path) {
    let raritiesByLayers = [];
    this.layers.forEach((layer) => {
      let newRarityNames = System.arrayOfFoldersInDirectory(
        `${this.path}/${layer.name}`
      );
      newRarityNames.forEach((rarityName) => {
        let newRarity = new Rarity(
          rarityName,
          `${path}/${layer.name}/${rarityName}`,
          this.collection,
          this,
          layer
        );
        return this.rarities.push(newRarity);
      });
      return raritiesByLayers.push(newRarityNames);
    });
    if (this.haveAllLayersSameRarities(raritiesByLayers)) {
    } else {
      console.log(
        'Layers do not have the same Rarity Folders'
      );
    }
  }
  // ELEMENTS
  createElements() {
    this.rarities.forEach((rarity) => {
      let elements = System.arrayOfNamesOfFilesInFolder(
        `${this.path}/${rarity.layer.name}/${rarity.name}`
      );
      elements.forEach((element) => {
        this.elements.push(
          new Element(
            element.name,
            element.path,
            this.collection,
            this.name,
            rarity.layer,
            rarity.name
          )
        );
        return;
      });
      return;
    });
  }
  // CONTROL
  // GETTERS
  get raritiesSortedByLayer() {
    let obj = [];
    this.layers.forEach((layer) => {
      let layerObj = {};
      layerObj['name'] = layer.name;
      this.rarities
        .filter((rarity) => {
          return rarity.layer.name === layer.name;
        })
        .forEach((rarityOfLayer) => {
          return (layerObj[rarityOfLayer.name] =
            rarityOfLayer.elementCounts);
        });
      return obj.push(layerObj);
    });
    return obj;
  }
  get raritySet() {
    let raritySet = new Set();
    this.rarities.forEach((rarity) => {
      return raritySet.add(rarity.name);
    });
    return raritySet;
  }
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
  get possibleCombinationsOfClass() {
    let array = [];
    let obj = this.possibleCombinationsPerRarity;
    this.raritySet.forEach((rarity) => {
      let value = obj[rarity];
      return array.push(value);
    });
    array = array.reduce((p, c) => p + c);
    return array;
  }
  // copiato da versione precedente dovrebbe servire per
  // creare un elemento con le informazioni per il drawer:
  // posizione e size del canvas
  static makeLayer = (layer) => {
    let raritiesOfLayer = System.arrayOfFoldersInDirectory(
      `${this.sourcePath}/${layer}`
    );
    let elementsByRarityOfLayer = {};
    raritiesOfLayer.forEach((folderInLayerFolder) => {
      elementsByRarityOfLayer[folderInLayerFolder] =
        System.arrayOfNamesOfFilesInFolder(
          `${this.sourcePath}/${layer}/${folderInLayerFolder}`
        );
    });
    return {
      elements: elementsByRarityOfLayer,
      position: { x: 0, y: 0 },
      size: {
        width: this.width,
        heigth: this.heigth,
      },
    };
  };
  //LAYERS
  getCollections() {}
  getReleasedEditions() {}
  getUnreleasedEditions() {}
  // GETTERS
  get supply() {
    return this.#supply;
  }
  get type() {
    return this.#type;
  }
  // SETTERS
  /**
   * @param {number} supply
   */
  set supply(supply) {
    this.#supply = supply;
    return this;
  }
  /**
   * @param {number} type Indica il tipo di collezione :
   * • 1 - Edition : la rarità degli elementi è basata sulla singola edizione
   * • 2 - Element : la rarità delle edizioni è basata sulla rarità di ogni singolo elemento
   */
  set type(type) {
    let typesIndex = type - 1;
    this.#type = this.#types[typesIndex];
    return this;
  }
  //COLLECTIONS
  static collectionExists(name, path) {
    let elemetsInFolder = System.readDirSync(path);
    let response;
    elemetsInFolder.includes(name)
      ? (response = true)
      : (response = false);
    return response;
  }
  //CLASSES
  get arrayOfClasses() {
    let array = [];
    this.classes.forEach((cl) => {
      return array.push(cl.name);
    });
    return array;
  }
  get arrayOfRarities() {
    let array = [];
    this.classes.forEach((cl) => {
      cl.raritySet.forEach((rarityName) => {
        let obj = {};
        obj.name = rarityName;
        obj.layers = [];
        cl.rarities
          .filter((rarity) => {
            return rarity.name === rarityName;
          })
          .forEach((rarity) => {
            obj.layers.push(rarity.layer.name);
          });
        array.push(obj);
      });
    });
    return array;
  }
}
