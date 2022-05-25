import {
  system,
  TreeNode,
  ITree,
  ITreeNode,
  IFile,
  IFolder,
  IRoot,
} from '@zionstate/system';
import { SmartContract, ISmartContract } from './SmartContract.js';
import { Drawer, IDrawer, LoadedImage } from './Drawer.js';
import { zionUtil } from '@zionstate_node/zion-util';
import { Rarity, IRarity } from './Rarity.js';
import { Layer, ILayer } from './Layer.js';
import { Element, IElement } from './Element.js';
import { Class, IClass } from './Class.js';
import * as Generator from '@zionstate/generator';
import { IEstrazione, IPicker } from '@zionstate/generator';
import { Dna, IDna } from './Dna.js';
import { Edition, IEdition } from './Edition.js';
import { ISystemEntity } from './SystemEntity.js';
import { Image } from '@zionrepack/canvas';
// import { TreeNode } from '@zionstate/system/built/src/TreeNode';

let GeneratorMachine = Generator.default;

const Combinator = GeneratorMachine.Combinator;
const Picker = GeneratorMachine.Picker;
const Estrazione = GeneratorMachine.Picker.Estrazione;

class CollectionReport {
  constructor(
    public name: string,
    public classes: [number, string][],
    public rarities: [number, string][],
    public layers: [number, string][],
    public elements: [number, string][],
    public possibleCombinations: {
      perLayer: { [key: string]: number };
      totali: number;
    },
    public supply: number,
    public extractableCombinations: IDna[]
  ) {}
}

class EditionsReport {
  #elementsUsage: { [key: string]: number } = {};
  set elementUsage(elementUsage: string) {
    if (this.#elementsUsage[elementUsage]) this.#elementsUsage[elementUsage]++;
    else this.#elementsUsage[elementUsage] = 1;
    this.#composeReport();
  }
  get createdEditionsAmount(): number | undefined {
    if (this.createdEditions) return this.createdEditions.length;
  }
  constructor(
    public collection: string,
    public createdEditions: IEdition[] = [],
    public elementsReport: { [key: string]: string } = {}
  ) {}
  #composeReport() {
    for (let key in this.#elementsUsage) {
      if (this.createdEditionsAmount)
        this.elementsReport[key] =
          (
            Math.floor(
              (this.#elementsUsage[key] / this.createdEditionsAmount) * 10000
            ) / 100
          ).toString() + ' %';
    }
  }
}

type SystemEntities = IClass | IElement | IEdition | ILayer;
class MetodoScelta {
  static #metodiScelta: MetodoScelta[] = [];
  static get metodiScelta() {
    let copiedArray = [];
    this.#metodiScelta.forEach(metodo => copiedArray.push(metodo));
    return this.#metodiScelta;
  }
  static scegliMetodo(type: 'Edition' | 'Element') {
    return MetodoScelta.metodiScelta.find(metodo => metodo.name === type);
  }
  constructor(public name?: string, public metodoScelta?: Function) {
    MetodoScelta.#metodiScelta.push(this);
  }
  assegnaMetodoScelta(metodo: Function) {
    this.metodoScelta = metodo;
  }
  scegliElemento() {
    if (!this.metodoScelta) throw new Error('no method');
    return this.metodoScelta();
  }
}
const metodoScelta = new MetodoScelta();
function metodoEdition() {}
function metodoElemento() {}
metodoScelta.assegnaMetodoScelta(metodoEdition);
metodoScelta.assegnaMetodoScelta(metodoElemento);

class Metodo {
  name: string;
  metodo: Function;
  static #metodi: Metodo[] = [];
  static get metodi() {
    return Metodo.#metodi;
  }
  static findMetodo(name: string): Function {
    if (!Metodo.#metodi) throw new Error('no metodi');
    let res: Metodo | undefined = Metodo.#metodi.find(
      metodo => metodo.name === name
    );
    if (!res) throw new Error('no match');
    return res.metodo;
  }
  constructor(name: string, metodo: Function) {
    this.name = name;
    this.metodo = metodo;
    Metodo.#metodi.push(this);
  }
}

const collectionPicker = function (type: string) {
  const metodo = Metodo.findMetodo(type);
  metodoScelta.assegnaMetodoScelta(metodo);
  return metodo;
};

class StrategiaDiScelta {
  constructor(public strategia?: Function) {}
  assegnaStrategia(metodo: Function) {
    this.strategia = metodo;
    return this;
  }
  picker() {
    if (this.strategia) return this.strategia();
  }
}

type CollectionType = 'Edition' | 'Element';
/**
 * @param {number} id identificativo della collezione
 * @param {string} name nome della collezione
 * @param {string} symbol simbolo della collezione che verrà usato per creare i token
 * @param {string} supply quantità di token della collezione
 * @param {string} baseURI percorso base per gli oggetti della collezione. Questo dato è quello che apparirà nei metadata degli NFT.
 * @param {string} description descrizione della collezione che apparirà sulla blockchain
 * @param {string} path percorso del root della collezione contenente i dati della collezione
 * @param {string} type tipo di collezione ('Edition' o 'Element')
 */
export interface ICollection extends ISmartContract {
  get id();
  set id(id: number);
  get path(): string;
  set path(path: string);
  get type(): string;
  set type(type: string);
  get outputPath(): string;
  set outputPath(outputPath: string);
  get editions(): IEdition[];
  set editions(editions: IEdition[]);
  get editionsReport(): EditionsReport;
  set editionsReport(editionReport: EditionsReport);
  get nodes(): ISystemEntity<SystemEntities>[];
  set nodes(node: ISystemEntity<SystemEntities>[]);
  // READ ONLY
  get drawer(): IDrawer;
  get rarities(): IRarity[];
  get layers(): ILayer[];
  get elements(): IElement[];
  get classes(): IClass[];
  get collectionPath(): string;
  get nodeNames(): string[];
  get nodesIds(): (string | number)[];
  get elementsByLayer(): IElement[][];
  get elementsByLayerByRarity(): IElement[][][];
  get possibiliDna(): IDna[];
  get possibiliDnaPerRarità(): IDna[][];
  get report(): CollectionReport;
  hasDir(): boolean;
  creaDirectory(): Collection;
  creaEdizione(classe: IClass): IEdition;
  creaEdizioneNVolte(volte: number, classe: IClass): IEdition[];
  creaTutteLeEdizioni(): IEdition[];
}

export class Collection extends SmartContract implements ICollection {
  static #collections: Collection[] = [];
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
    const indiceDellaCollezione = Collection.#collections.findIndex(
      element => element.name === name
    );
    if (indiceDellaCollezione <= -1) {
      throw new Error('non esiste una collezione con quel nome');
    }
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
  #id: number;
  get id() {
    return this.#id;
  }
  set id(id) {
    this.#id = id;
  }
  #path;
  get path() {
    return this.#path;
  }
  set path(path) {
    this.#path = path;
  }
  #types = ['Edition', 'Element'];
  #type: string;
  get type() {
    return this.#type;
  }
  set type(type: string) {
    if (type)
      if (!this.#types.includes(type)) {
        throw new Error('Il tipo selezionato non esiste');
      }
    this.#type = type;
  }
  #outputPath;
  get outputPath() {
    return this.#outputPath;
  }
  set outputPath(outputPath) {
    this.#outputPath = outputPath;
  }
  #editions: IEdition[] = [];
  get editions(): IEdition[] {
    return this.#editions;
  }
  set editions(editions: IEdition[]) {
    this.#editions.push(...editions);
  }
  #nodes: ISystemEntity<SystemEntities>[] = [];
  get nodes() {
    return this.#nodes;
  }
  set nodes(nodes: ISystemEntity<SystemEntities>[]) {
    this.#nodes.push(...nodes);
  }
  #editionsReport?: EditionsReport;
  get editionsReport(): EditionsReport {
    if (this.#editionsReport) return this.#editionsReport;
    return new EditionsReport(
      'no report',
      [
        new Edition(
          'no name',
          'no path',
          0,
          0,
          0,
          new Dna(undefined, 'noname')
        ),
      ],
      { element: 'no element' }
    );
  }
  set editionsReport(editionReport: EditionsReport) {
    this.#editionsReport = editionReport;
  }
  #drawer: IDrawer;
  get drawer() {
    return this.#drawer;
  }
  #rarities: IRarity[] = [];
  get rarities() {
    return this.#rarities;
  }
  #layers: ILayer[] = [];
  get layers() {
    return this.#layers;
  }
  #elements: IElement[] = [];
  get elements() {
    return this.#elements;
  }
  #classes: IClass[] = [];
  /**
   * @returns {Class[]}
   */
  get classes() {
    return this.#classes;
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
  get collectionPath() {
    return `${this.outputPath}/${this.name}`;
  }
  /**
   * Ritorna un array con degli array contenenti gli
   * elementi di ogni layer. Dovrebbe contenere un numero di
   * array uguale al numero di layer della collezione.
   * @returns {Element[]}
   */
  get elementsByLayer(): IElement[][] {
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
        if (!currentLayer) throw new Error('No Current Layer');
        if (element.èConnessoA(currentLayer)) elementsOfArray.push(element);
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
  get elementsByLayerByRarity(): IElement[][][] {
    let result: IElement[][][] = [];
    for (let rarity of this.rarities) {
      let array = this.elementsByLayer;
      let rarityLayers: IElement[][] = [];
      for (let layer of array) {
        let elementsOfLayerByRarity: IElement[] = [];
        for (let element of layer)
          if (element.èConnessoA(rarity)) elementsOfLayerByRarity.push(element);
        rarityLayers.push(elementsOfLayerByRarity);
      }
      result.push(rarityLayers);
    }
    return result;
  }
  get possibiliDna(): IDna[] {
    if (!this.elementsByLayer) throw new Error('no elements by layer');
    let combinations = Combinator.generateCombinations(this.elementsByLayer);
    let servedArray: IDna[] = combinations.map(e => new Dna(e, 'name'));
    return servedArray;
  }
  get possibiliDnaPerRarità(): IDna[][] {
    let result: IDna[][] = [],
      combinations: IElement[][];
    const creaEAggiungi = function (elementsByLayer: IElement[][]) {
      combinations = Combinator.generateCombinations(elementsByLayer);
      let servedArray: IDna[] = combinations.map(e => new Dna(e, 'name'));
      result.push(servedArray);
    };
    this.elementsByLayerByRarity.forEach(creaEAggiungi);
    return result;
  }
  get report(): CollectionReport {
    let report: CollectionReport,
      servedRarityObj: { [key: string]: number } = {};
    this.possibiliDnaPerRarità.forEach(
      (rarità, index) => (servedRarityObj[index.toString()] = rarità.length)
    );
    report = new CollectionReport(
      this.name,
      this.classes.map((classe, index) => [index, classe.name]),
      this.rarities.map((rarity, index) => [index, rarity.name]),
      this.layers.map((layer, index) => [index, layer.name]),
      this.elements.map((element, index) => [index, element.name]),
      { perLayer: servedRarityObj, totali: this.possibiliDna.length },
      this.supply,
      []
    );

    return report;
  }
  picker: IPicker<IDna>;
  constructor(
    name: string,
    symbol: string,
    supply: number,
    baseURI: URL,
    description: string,
    path: string,
    type: 'Edition' | 'Element',
    outputPath: string = '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/GenerativeArtMachine/Machines',
    width = 1000,
    height = 1000
  ) {
    if (Collection.collectionExists(name)) throw new Error('already exists');
    super(name, symbol, supply, baseURI, description);
    let drawer = new Drawer(width, height, '2d', this);
    this.editionsReport = new EditionsReport(this.name);
    this.#path = path;
    this.#type = type;
    this.#outputPath = outputPath;
    this.#drawer = drawer;
    Collection.#collections.push(this);
    this.#id = Collection.#collections.length;
    this.#buildSistemEntities(system.buildTree);
    this.#loadElements();
    this.picker = new Picker<IDna>(this.possibiliDna);
    // this.newPicker = this.#collectionPicker();
  }
  hasDir(): boolean {
    const folders = system.arrayOfFoldersInDirectory(this.outputPath);
    return folders.some(element => element.name === this.name);
  }
  creaDirectory(): Collection {
    if (this.hasDir()) throw Error('Non è stato possibile');
    if (!this.hasDir()) {
      system.createNestedDir(this.collectionPath);
    }
    return this;
  }
  /**
   * Accetta un lista di array, che corrisponde ai layer
   * dell'immagine. Ogni arrai contiene gli elementi da combinare.
   * @returns {Dna}
   */
  creaEdizione(classe: IClass): IEdition {
    let strategy = classe,
      nuovaEstrazione,
      PATH;
    if (this.picker)
      nuovaEstrazione = this.picker.scegliACasoETogliElementoDaArray();
    const NAME = 'name';
    if (this.outputPath) PATH = this.outputPath;
    const TYPE = 0;
    const WIDTH = this.#drawer.canvasPropertiesWidth;
    const HEIGHT = this.#drawer.canvasPropertiesHeight;
    if (!PATH) throw new Error('no path');
    if (nuovaEstrazione?.elementoEstratto === undefined)
      throw new Error('no estrazione');
    let newEdizione = new Edition(
      NAME,
      PATH,
      TYPE,
      WIDTH,
      HEIGHT,
      nuovaEstrazione.elementoEstratto
    );
    this.editions = [newEdizione];
    this.editionsReport.createdEditions = this.editions;
    nuovaEstrazione.elementoEstratto.combination.forEach(
      element => (this.editionsReport.elementUsage = element.name)
    );
    return newEdizione;
  }
  creaEdizioneNVolte(volte: number, classe: IClass) {
    let servedArray = [];
    while (volte) {
      volte--;
      let newDna = this.creaEdizione(classe);
      servedArray.push(newDna);
    }
    return servedArray;
  }
  creaTutteLeEdizioni(): IEdition[] {
    let servedArray: IEdition[] = [];
    return servedArray;
  }
  #buildSistemEntities(strategy: typeof system.buildTree) {
    const index = this.#types.findIndex(e => e === this.type);
    if (!this.path) return 'no path';
    let tree = strategy(this.path);
    if (!tree) return 'no tree';
    let nodes: (ITreeNode | IFile | IFolder | IRoot)[] = tree.nodes;
    let classes: IClass[] = [];
    let layers: ILayer[] = [];
    let rarities: IRarity[] = [];
    let elements: IElement[] = [];
    let classServedObj: { [key: string]: string[] } = {};
    let layerServedObj: { [key: string]: string[] } = {};
    let rarityServObj: { [key: string]: IElement[] } = {};
    nodes.forEach(node => {
      if (node.depth === 3) rarityServObj[node.name] = [];
      if (node.depth === 2) layerServedObj[node.name] = [];
      if (node.depth === 1) classServedObj[node.name] = [];
    });
    let fileCounter = 0;
    nodes.forEach(node => {
      if (node.depth === 1) {
        let currentClass = node;
        // creo classe per ogni cartella con depth 1
        let newClass = new Class(
          currentClass.name,
          currentClass.path,
          // TODO cambiare type da number a string?
          this.type === 'Edition' ? 0 : 1,
          0,
          0
        );
        // aggiungo classe a lista
        this.#nodes.push(newClass);
        //
        if (!currentClass.figlio) throw new Error('no figlio');
        for (let layer of currentClass.figlio) {
          // TODO cambiare gli Error
          // if (!this.#drawer) throw new Error('no drawer');
          // creo i layer della classe
          let newLayer = new Layer(
            layer.name,
            layer.path,
            index,
            this.#drawer.canvasPropertiesWidth,
            this.#drawer.canvasPropertiesHeight
          );
          // aggiungo layer a lista
          this.#nodes.push(newLayer);
          if (!layer.figlio) throw new Error('no figlio');
          // controllo le rarità
          for (let rarity of layer.figlio) {
            if (!rarity.figlio) throw new Error('no figlio');
            for (let element of rarity.figlio) {
              fileCounter++;
              // controllo che sia un TreeNode di tipo IFile
              let file: IFile;
              if ('extension' in element) {
                file = element;
                if (!file.extension) throw new Error('no extension');
                if (!file.fileSize) throw new Error('no fileSize');
              } else {
                throw new Error('not a File');
              }
              layerServedObj[layer.name].push(element.name);
              // creo gli elementi per ogni rarità
              let newElement = new Element(
                file.name,
                file.path,
                index,
                this.#drawer.canvasPropertiesWidth,
                this.#drawer.canvasPropertiesHeight,
                file.extension,
                file.fileSize,
                'description',
                0
              );
              // aggiungo elemento a lista
              this.#nodes.push(newElement);
              // connetto elememto a layer
              newElement.connettiA(newLayer);
              // connetto elememto a classe
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
      let newRarity: IRarity = new Rarity(key, index);
      this.#nodes.push(newRarity);
      classes.forEach(_class => newRarity.connettiA(_class));
      rarityServObj[key].forEach(element => element.connettiA(newRarity));
      rarities.push(newRarity);
    }
    this.#classes = classes;
    this.#elements = elements;
    this.#rarities = rarities;
    this.#layers = layers;
  }
  #loadElements(): Promise<Image>[] {
    let count = 0;
    this.elements.forEach(async element => {
      let loadedImage = new LoadedImage();
      loadedImage.canvasLoadImage = this.drawer!.loadImage(element.path!);
      loadedImage.elementName = element.name;
      element.loadedImageIndex = count;
      element.loadedImage = loadedImage;
      count++;
      this.drawer!.loadedImages.push(loadedImage.canvasLoadImage!);
      element.size!.width = (await loadedImage.canvasLoadImage!).width;
      element.size!.height = (await loadedImage.canvasLoadImage!).height;
    });
    return this.drawer!.loadedImages;
  }
  #collectionPicker() {
    new Metodo('Edition', this.#metodoEdition);
    new Metodo('Element', this.#metodoElement);
    const metodo = Metodo.findMetodo(this.type);
    let strategiaDiScelta = new StrategiaDiScelta();
    if (!metodo) throw new Error('no metodo');
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
