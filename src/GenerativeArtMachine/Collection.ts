import { system, TreeNode } from '@zionstate/system';
import { SmartContract, ISmartContract } from './SmartContract.js';
import { Drawer, IDrawer } from './Drawer.js';
import { zionUtil } from '@zionstate_node/zion-util';
import { Rarity, IRarity } from './Rarity.js';
import { Layer, ILayer } from './Layer.js';
import { Element, IElement } from './Element.js';
import { Class, IClass } from './Class.js';
import * as Generator from '@zionstate/generator';
import { IDna } from './Dna.js';
import { Edition, IEdition } from './Edition.js';
import { ISystemEntity } from './SystemEntity.js';
// import { TreeNode } from '@zionstate/system/built/src/TreeNode';

let GeneratorMachine = Generator.default;

const Combinator = GeneratorMachine.Combinator;
const Picker = GeneratorMachine.Picker;
const Estrazione = GeneratorMachine.Picker.Estrazione;

type SystemEntities = IClass | IElement | IEdition | ILayer;
// class MetodoScelta {
//   static #metodiScelta = [];
//   static get metodiScelta() {
//     let copiedArray = [];
//     this.#metodiScelta.forEach((metodo) =>
//       copiedArray.push(metodo)
//     );
//     return this.#metodiScelta;
//   }
//   constructor() {
//     this.metodoScelta = null;
//     MetodoScelta.#metodiScelta.push(this);
//   }
//   assegnaMetodoScelta(metodo) {
//     this.metodoScelta = metodo;
//   }
//   scegliElemento() {
//     return this.metodoScelta();
//   }
//   static scegliMetodo(type) {
//     return MetodoScelta.metodiScelta.find(
//       (metodo) => metodo.name === type
//     );
//   }
// }
// const metodoScelta = new MetodoScelta();
// metodoScelta.assegnaMetodoScelta(metodoEdition);
// metodoScelta.assegnaMetodoScelta(metodoElemento);

// const collectionPicker = function (type) {
//   const metodo = Metodo.findMetodo(type);
//   metodoScelta.assegnaMetodoScelta(metodo);
//   return metodo.metodo();
// };

type CollectionType = 'Edition' | 'Element';
/**
 * @param id identificativo della collezione
 *
 */
export interface ICollection extends ISmartContract {
  get id();
  set id(id: number);
  set type(type: number);
  get path(): string;
  set path(path: string);
  get type(): number;
  get outputPath(): string;
  set outputPath(outputPath: string);
  get drawer(): IDrawer;
  get rarities(): IRarity[];
  get layers(): ILayer[];
  get elements(): IElement[];
  get classes(): IClass[];
  get nodes(): ISystemEntity<SystemEntities>[];
  get collectionPath(): string;
  get nodeNames(): string;
  get nodesIds(): number;
  get elementsByLayer(): IElement[];
  get elementsByLayerByRarity(): IElement[][];
  get possibiliDna(): IDna[];
  get possibiliDnaPerRarità(): IDna[][];
  hasDir(): boolean;
  creaDirectory(): ICollection;
  creaEdizione(classe: IClass): IEdition;
  creaEdizioneNVolte(volte: number): IEdition[];
  creaTutteLeEdizioni(): IEdition[];
  //
}

export class Collection extends SmartContract {
  static #collections: Collection[] = [];
  // INFOS
  #id?: string | number;
  #path;
  #types = ['Edition', 'Element'];
  #type;
  #outputPath;
  #drawer: Drawer;
  #strategy;
  newPicker;
  picker;
  // GRAPH
  #nodes: ISystemEntity<SystemEntities>[] = [];
  #classes: IClass[] = [];
  #layers: ILayer[] = [];
  #rarities: IRarity[] = [];
  #elements: IElement[] = [];
  // GETTERS
  get id() {
    return this.#id;
  }
  set id(id) {
    this.#id = id;
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
  /**
   * @returns {Class[]}
   */
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
    let servedArray: string[] = [];
    this.nodes.forEach(node => servedArray.push(node.name));
    return servedArray;
  }
  get nodesIds() {
    let servedArray: (string | number)[] = [];
    this.nodes.forEach(node => servedArray.push(node.id));
    return servedArray;
  }
  /**
   * Ritorna un array con degli array contenenti gli
   * elementi di ogni layer. Dovrebbe contenere un numero di
   * array uguale al numero di layer della collezione.
   * @returns {Element[]}
   */
  get elementsByLayer(): IElement[][] | undefined {
    let result: IElement[][] = [];
    let layersStack: SystemEntities[] = [];
    const aggiungiALayersStack = function (layer: ILayer) {
      layersStack.push(layer);
    };
    this.layers.forEach(aggiungiALayersStack);
    while (layersStack.length) {
      let elementsOfArray: IElement[] = [];
      const currentLayer = layersStack.shift();
      for (let element of this.elements) {
        if (!currentLayer) return;
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
  get elementsByLayerByRarity(): string[][][] | undefined {
    let result: string[][][] = [];
    for (let rarity of this.rarities) {
      let array = this.elementsByLayer;
      let rarityLayers: string[][] = [];
      if (!array) return;
      for (let layer of array) {
        let elementsOfLayerByRarity: string[] = [];
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
  get possibiliDna(): IElement[][] | undefined {
    if (!this.elementsByLayer) return;
    let servedArray = Combinator.generateCombinations(this.elementsByLayer);
    return servedArray;
  }
  get possibiliDnaPerRarità() {
    let result: string[][][] = [];
    const creaEAggiungi = function (possibilità: string[][]) {
      let servedArray: string[][] = [];
      servedArray = Combinator.generateCombinations(possibilità);
      result.push(servedArray);
    };
    if (this.elementsByLayerByRarity)
      this.elementsByLayerByRarity.forEach(creaEAggiungi);
    return result;
  }
  // SETTERS
  set path(path) {
    this.#path = path;
  }
  set outputPath(outputPath) {
    this.#outputPath = outputPath;
  }
  set type(type) {
    if (type)
      if (!this.#types.includes(type)) {
        throw new Error('Il tipo selezionato non esiste');
      }
    this.#type = type;
  }
  // STATIC \\
  // PROPERTIES \\
  // METHODS \\
  static get collections() {
    let servedArray: Collection[] = [];
    Collection.#collections.forEach(el => servedArray.push(el));
    Object.freeze(servedArray);
    return servedArray;
  }
  static collectionExists(name: string) {
    return Collection.#collections.some(collection => collection.name === name);
  }
  static deleteCollection(name: string) {
    // cerca l'indice della collezione tramite il nome
    const indiceDellaCollezione = Collection.#collections.findIndex(
      element => element.name === name
    );
    // se non c'è lancia errore
    if (indiceDellaCollezione <= -1) {
      throw new Error('non esiste una collezione con quel nome');
    }
    // se c'è cancella l'elemento
    if (indiceDellaCollezione + 1 !== Collection.#collections.length) {
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
    name: string,
    symbol: string = 'simbolo della collezione che verrà usato per creare i token',
    supply: number = 1000,
    baseURI: URL,
    description: string = 'descrizione della collezione che apparirà sulla blockchain',
    path: string = 'percorso del root della collezione',
    type: 'Edition' | 'Element' = 'Edition',
    outputPath: string = '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/GenerativeArtMachine/Machines',
    width = 1000,
    height = 1000
  ) {
    if (!Collection.collectionExists(name)) {
      super(name, symbol, supply, baseURI, description);
      this.#path = path;
      this.#type = type;
      this.#outputPath = outputPath;
      this.#drawer = new Drawer(width, height, '2d', this);
      Collection.#collections.push(this);
      this.#id = Collection.#collections.length;
      this.#buildSistemEntities(system.buildTree);
      this.#loadElements();
      this.newPicker = this.#collectionPicker();
      if (this.possibiliDna)
        this.picker = new Picker<IElement>(...this.possibiliDna);
    }
  }
  hasDir(): boolean | undefined {
    // controllare nel path se esiste una cartella
    if (!this.outputPath) return;
    const folders = system.arrayOfFoldersInDirectory(this.outputPath);

    return folders.some(element => element.name === this.name);
  }
  creaDirectory() {
    if (this.hasDir()) throw Error('Non è stato possibile');
    if (!this.hasDir()) {
      system.createNestedDir(this.collectionPath);
      return this;
    }
  }
  /**
   * Accetta un lista di array, che corrisponde ai layer
   * dell'immagine. Ogni arrai contiene gli elementi da combinare.
   * @returns {Dna}
   */
  creaEdizione(classe: IClass) {
    let strategy = classe,
      nuovaEstrazione,
      PATH;

    if (this.picker)
      nuovaEstrazione = this.picker.scegliACasoETogliElementoDaArray();
    const NAME = 'name';
    if (this.outputPath) PATH = this.outputPath;
    const TYPE = 0;
    const WIDTH = 0;
    const HEIGHT = 0;
    if (!PATH) return;
    let newEdizione = new Edition(
      NAME,
      PATH,
      TYPE,
      WIDTH,
      HEIGHT,
      nuovaEstrazione.elementoEstratto
    );
    return newEdizione.dna;
  }
  creaEdizioneNVolte(volte: number) {
    let servedArray = [];
    while (volte) {
      volte--;
      let newDna = this.creaEdizione('');
      servedArray.push(newDna);
    }
    return servedArray;
  }
  creaTutteLeEdizioni() {
    let serveArray = [];
  }
  #buildSistemEntities(strategy: Function) {
    let tree = strategy(this.path);
    let nodes: TreeNode[] = tree.nodes;
    let classes: IClass[] = [];
    let layers: ILayer[] = [];
    let rarities: IRarity[] = [];
    let elements: IElement[] = [];
    let classServedObj = {};
    let layerServedObj = {};
    let rarityServObj = {};
    nodes.forEach(node => {
      if (node.depth === 3) rarityServObj[node.name] = [];
      if (node.depth === 2) layerServedObj[node.name] = [];
      if (node.depth === 1) classServedObj[node.name] = [];
    });
    nodes.forEach(node => {
      if (node.depth === 1) {
        let currentClass = node;
        let newClass = new Class(
          currentClass.name,
          currentClass.path,
          this.type,
          0,
          0
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
                element.fileSize,
                'description',
                0
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
      let newRarity = new Rarity(key, this.type);
      this.#nodes.push(newRarity);
      const connectToRarity = function (_class: IClass) {
        newRarity.connettiA(_class);
      };
      const connectToElement = function (element: IElement) {
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
    this.elements.forEach(async element => {
      class LoadedImage {
        elementName;
        canvasLoadImage;
        constructor(elementName: string, image) {
          this.elementName = elementName;
          this.canvasLoadImage = image;
        }
      }
      let loadedImage = new LoadedImage('', '');
      loadedImage.canvasLoadImage = await this.drawer.loadImage(element.path);
      loadedImage.elementName = element.name;
      element.loadedImageIndex = count;
      count++;
      this.#drawer.loadedImages = loadedImage;
      element.size.width = loadedImage.canvasLoadImage.width;
      element.size.height = loadedImage.canvasLoadImage.height;
    });
    return this.drawer.loadedImages;
  }
  #collectionPicker() {
    class Metodo {
      name: string;
      metodo: Function;
      static #metodi: Metodo[] = [];
      static get metodi() {
        return Metodo.#metodi;
      }
      static findMetodo(name: string): Metodo {
        return Metodo.#metodi.find(metodo => metodo.name === name);
      }
      constructor(name: string, metodo: Function) {
        this.name = name;
        this.metodo = metodo;
        Metodo.#metodi.push(this);
      }
    }
    class StrategiaDiScelta {
      constructor(public strategia?: Function) {}
      assegnaStrategia(metodo: Metodo) {
        return (this.strategia = metodo.metodo);
      }
      picker() {
        if (this.strategia) return this.strategia();
      }
    }
    new Metodo('Edition', this.#metodoEdition);
    new Metodo('Element', this.#metodoElement);
    const metodo = Metodo.findMetodo(this.type);
    let strategiaDiScelta = new StrategiaDiScelta();
    strategiaDiScelta.assegnaStrategia(metodo);
    return strategiaDiScelta.picker();
  }
  #metodoElement = () => {
    return new Picker(this.possibiliDna);
  };
  #metodoEdition = (possibiliDnaPerRarità = []) => {
    let stack = [];
    for (let possibilità of possibiliDnaPerRarità) {
      stack.push(new Picker(possibilità));
    }
    return stack;
  };
}
