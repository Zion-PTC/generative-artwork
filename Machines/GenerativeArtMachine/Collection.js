import { system } from '../System.js';
import { SmartContract } from './SmartContract.js';
import { Drawer } from './Drawer.js';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Rarity } from './Rarity.js';
import { Layer } from './Layer.js';
import { Element } from './Element.js';
import { Class } from './Class.js';
import { SystemEntity } from './SystemEntity.js';
/**
 * Folder structure types
 * EDITION
 * Ogni edizione è composta da elementi facenti parte
 * della stessa rarità.
 * Il dna manager conta quanti elementi sono presenti
 * per ogni livello, in base alla rarità.
 * 
  I   Classe
  II  └── Layers
  III   └── Rarità
  IV      └── Elementi
 *
 * La rarità è il III livello nella struttura
 * delle directories.
 * es :
 * ci sono 3 livelli
 * con 3 rarità:
 * •comune: contenente 5 elementi
 * •raro: contenente 2 elementi
 * •super_raro: contente 1 elemento
 * Il dna manager calcola tutte le combinazioni
 * possibili fancendo
 * n°elementiRarita1Livello1 = A = 5
 * n°elementiRarita1Livello2 = B = 5
 * n°elementiRarita1Livello3 = C = 5
 * possibilitàComuni = A x B x C = 125
 * n°elementiRarita2Livello1 = A = 2
 * n°elementiRarita2Livello2 = B = 2
 * n°elementiRarita2Livello3 = C = 2
 * possibilitàComuni = A x B x C = 8
 * n°elementiRarita1Livello1 = A = 1
 * n°elementiRarita1Livello2 = B = 1
 * n°elementiRarita1Livello3 = C = 1
 * possibilitàComuni = A x B x C = 1
 * totale = 125 + 8 + 1 = 134
 * 
 * ELEMENT
 * Il dna Manager calcola tutte le possibili combinazioni
 * di tutti gli elementi presenti
 * elementiRari = 5 + 2 + 1 = 8
 * ogni livello può avere 12 elementi
 * Layer1Elementi = A = 8
 * Layer2Elementi = B = 8
 * Layer3Elementi = C = 8
 * per calcolare le possibilità bisogna fare
 * A x B x C = 512 Possibilità
 * in queste possibilità tutti gli elementi compaiono
 * con la stessa probabilità. Anche gli elementi rari
 * compaiono nella stessa quantità ovvero ogni elemento
 * appare 8 volte.
 * Fra queste 512 combinazioni ce nè solo una che contiene
 * tutti e 3 elementi piu rari.
 * Se teniamo solo due livelli con elementi super rari
 * rimane un solo liver
 * 
 * Ogni edizione può essere composta da elementi di
 * rarità diversa.
 */
export class Collection extends SmartContract {
  static #collections = [];
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
  // get folderTree() {
  //   return this.#folderTree;
  // }
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
        for (let layer of currentClass.figlio) {
          let newLayer = new Layer(
            layer.name,
            layer.path,
            this.type,
            undefined,
            undefined
          );
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
    // this.#nodes = SystemEntity.systemEntities;
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
