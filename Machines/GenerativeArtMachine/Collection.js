import { system } from '../System.js';
import { SmartContract } from './SmartContract.js';
import { Drawer } from './Drawer.js';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Rarity } from './Rarity.js';
import { Layer } from './Layer.js';
import { Element } from './Element.js';
import { Class } from './Class.js';
import { GeneratorMachine } from '../GeneratorMachine.js';
import { Dna } from './Dna.js';

const Combinator = GeneratorMachine.Combinator;
const Picker = GeneratorMachine.Picker;
const Estrazione = GeneratorMachine.Picker.Estrazione;

export class Collection extends SmartContract {
  static #collections = [];
  // DNA
  #dnaScelti;
  #dnaScartati;
  // INFOS
  #id;
  #path;
  #types = ['Edition', 'Element'];
  #type;
  #outputPath;
  #drawer;
  #folderTree;
  // GRAPH
  #nodes = [];
  #classes = [];
  #layers = [];
  #rarities = [];
  #elements = [];
  // GETTERS
  static get collections() {
    let servedArray = [];
    Collection.#collections.forEach((el) =>
      servedArray.push(el)
    );
    Object.freeze(servedArray);
    return servedArray;
  }
  get id() {
    return this.#id;
  }
  get path() {
    return this.#path;
  }
  get type() {
    return this.#type;
  }
  get outputPath() {
    return this.#outputPath;
  }
  get drawer() {
    return this.#drawer;
  }
  get rarities() {
    return this.#rarities;
  }
  get layers() {
    return this.#layers;
  }
  get elements() {
    return this.#elements;
  }
  get classes() {
    return this.#classes;
  }
  get nodes() {
    return this.#nodes;
  }
  get collectionPath() {
    return `${this.outputPath}/${this.name}`;
  }
  get nodeNames() {
    let servedArray = [];
    this.nodes.forEach((node) =>
      servedArray.push(node.name)
    );
    return servedArray;
  }
  get nodesIds() {
    let servedArray = [];
    this.nodes.forEach((node) => servedArray.push(node.id));
    return servedArray;
  }
  /**
   * Ritorna un array con degli array contenenti gli
   * elementi di ogni layer. Dovrebbe contenere un numero di
   * array uguale al numero di layer della collezione.
   */
  get elementsByLayer() {
    let result = [];
    let layersStack = [];
    const aggiungiALayersStack = function (element) {
      layersStack.push(element);
    };
    this.layers.forEach(aggiungiALayersStack);
    while (layersStack.length) {
      let elementsOfArray = [];
      const currentLayer = layersStack.shift();
      for (let element of this.elements) {
        if (element.èConnessoA(currentLayer)) {
          elementsOfArray.push(element);
        }
      }
      result.push(elementsOfArray);
    }
    return result;
  }
  /**
   * Ritorna un array contenente un array per ogni rarità.
   * Ogni array a sua volta contiene un array per ogni
   * layer. Ognuno di questi array contiene gli elementi del
   * layer raggruppati in sostanza per rarità.
   */
  get elementsByLayerByRarity() {
    let result = [];
    for (let rarity of this.rarities) {
      let array = this.elementsByLayer;
      let rarityLayers = [];
      for (let layer of array) {
        let elementsOfLayerByRarity = [];
        for (let element of layer) {
          if (element.èConnessoA(rarity)) {
            elementsOfLayerByRarity.push(element.name);
          }
        }
        rarityLayers.push(elementsOfLayerByRarity);
      }
      result.push(rarityLayers);
    }
    return result;
  }
  get possibiliDna() {
    let servedArray = Combinator.generateCombinations(
      this.elementsByLayer
    );
    return servedArray;
  }
  get possibiliDnaPerRarità() {
    let result = [];
    const creaEAggiungi = function (possibilità) {
      let servedArray =
        Combinator.generateCombinations(possibilità);
      result.push(servedArray);
    };
    this.elementsByLayerByRarity.forEach(creaEAggiungi);
    return result;
  }
  // SETTERS
  set id(id) {
    return (this.#id = id);
  }
  set path(path) {
    return (this.#path = path);
  }
  set outputPath(outputPath) {
    return (this.#outputPath = outputPath);
  }
  set type(type) {
    if (!this.#types.includes(type)) {
      throw new Error('Il tipo selezionato non esiste');
    }
    return (this.#type = type);
  }
  // STATIC \\
  // PROPERTIES \\
  // METHODS \\
  static collectionExists(name) {
    return Collection.#collections.some(
      (collection) => collection.name === name
    );
  }
  static deleteCollection(name) {
    // cerca l'indice della collezione tramite il nome
    const indiceDellaCollezione =
      Collection.#collections.findIndex(
        (element) => element.name === name
      );
    // se non c'è lancia errore
    if (indiceDellaCollezione <= -1) {
      throw new Error(
        'non esiste una collezione con quel nome'
      );
    }
    // se c'è cancella l'elemento
    if (
      indiceDellaCollezione + 1 !==
      Collection.#collections.length
    ) {
      zionUtil.changePosition(
        Collection.#collections,
        indiceDellaCollezione,
        Collection.#collections.length - 1
      );
    }
    Collection.#collections.pop();
    return Collection.#collections;
  }
  /**
   * @param {string} name nome della collezione
   * @param {string} path percorso della cartella contenente i dati della collezione
   * @param {string} baseUri percorso base per gli oggetti della collezione. Questo dato è quello che apparirà nei metadata degli NFT.
   */
  constructor(
    name = 'Default Name',
    symbol = 'DFS',
    supply = 1000,
    baseURI = 'http',
    description = 'description',
    path,
    type = 'Edition',
    outputPath = '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/GenerativeArtMachine/Machines',
    width = 1000,
    height = 1000
  ) {
    if (!Collection.collectionExists(name))
      super(name, symbol, supply, baseURI, description);
    this.#path = path;
    this.#type = type;
    this.#outputPath = outputPath;
    this.#drawer = new Drawer(width, height, '2d', name);
    this.folderTree = system.buildTree(path);
    Collection.#collections.push(this);
    this.id = Collection.#collections.length;
    this.#buildSistemEntities();
    this.#loadElements();
    this.picker = new Picker(this.possibiliDna);
  }
  hasDir() {
    // controllare nel path se esiste una cartella
    const folders = system.arrayOfFoldersInDirectory(
      this.outputPath
    );

    return folders.some((element) => element === this.name);
  }
  creaDirectory() {
    // controllo che la directory non esista di già
    if (this.hasDir()) throw Error('Non è stato possibile');
    if (!this.hasDir()) {
      system.createNestedDir(this.collectionPath);
      return this;
    }
  }
  /**
   * Accetta un lista di array, che corrisponde ai layer
   * dell'immagine. Ogni arrai contiene gli elementi da combinare.
   * @param {array[][]} listaDiElementi
   * @returns {Dna}
   */
  scegliFraPossibiliDna() {
    let dna =
      this.picker.scegliACasoETogliElementoDaArray();
    let newDna = new Dna(dna.elementoEstratto);
    return newDna;
  }
  scegliFraPossibiliDnaNVolte(volte) {
    let servedArray = [];
    while (volte) {
      volte--;
      let newDna = this.scegliFraPossibiliDna();
      servedArray.push(newDna);
    }
    return servedArray;
    // return this.picker.estraiConCallbacknVolte(
    //   volte,
    //   this.scegliFraPossibiliDna
    // );
  }
  #buildSistemEntities() {
    let tree = this.folderTree;
    let nodes = tree.nodes;
    let classes = [];
    let layers = [];
    let rarities = [];
    let elements = [];
    let classServedObj = {};
    let layerServedObj = {};
    let rarityServObj = {};
    nodes.forEach((node) => {
      if (node.depth === 3) rarityServObj[node.name] = [];
      if (node.depth === 2) layerServedObj[node.name] = [];
      if (node.depth === 1) classServedObj[node.name] = [];
    });
    nodes.forEach((node) => {
      if (node.depth === 1) {
        let currentClass = node;
        let newClass = new Class(
          currentClass.name,
          currentClass.path,
          this.type
        );
        this.#nodes.push(newClass);
        for (let layer of currentClass.figlio) {
          let newLayer = new Layer(
            layer.name,
            layer.path,
            this.type,
            undefined,
            undefined
          );
          this.#nodes.push(newLayer);
          for (let rarity of layer.figlio) {
            for (let element of rarity.figlio) {
              layerServedObj[layer.name].push(element.name);
              // qui potrei creare gli elementi
              let newElement = new Element(
                element.name,
                element.path,
                this.type,
                undefined, // width
                undefined,
                element.extension,
                element.fileSize
              );
              this.#nodes.push(newElement);
              newElement.connettiA(newLayer);
              newElement.connettiA(newClass);
              rarityServObj[rarity.name].push(newElement);
              elements.push(newElement);
            }
          }
          newLayer.connettiA(newClass);
          layers.push(newLayer);
        }
        classes.push(newClass);
      }
    });
    for (let key in rarityServObj) {
      let newRarity = new Rarity(key, this.type, undefined);
      this.#nodes.push(newRarity);
      const connectToRarity = function (_class) {
        newRarity.connettiA(_class);
      };
      const connectToElement = function (element) {
        element.connettiA(newRarity);
      };
      classes.forEach(connectToRarity);
      rarityServObj[key].forEach(connectToElement);
      rarities.push(newRarity);
    }
    this.#classes = classes;
    this.#elements = elements;
    this.#rarities = rarities;
    this.#layers = layers;
  }
  #loadElements() {
    let count = 0;
    this.elements.forEach(async (element) => {
      class LoadedImage {
        constructor(elementName, image) {
          this.elementName = elementName;
          this.canvasLoadImage = image;
        }
      }
      let loadedImage = new LoadedImage();
      loadedImage.canvasLoadImage =
        await this.drawer.loadImage(element.path);
      loadedImage.elementName = element.name;
      element.loadedImageIndex = count;
      count++;
      this.#drawer.loadedImages = loadedImage;
      element.size.width =
        loadedImage.canvasLoadImage.width;
      element.size.height =
        loadedImage.canvasLoadImage.height;
    });
    return this.drawer.loadedImages;
  }
}
