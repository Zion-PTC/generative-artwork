import { system, ITreeNode, IFile, IFolder, IRoot } from '@zionstate/system';
import { SmartContract, ISmartContract } from './SmartContract.js';
import { Drawer, IDrawer, LoadedImage } from './Drawer.js';
import { zionUtil } from '@zionstate_node/zion-util';
import { Rarity, IRarity } from './Rarity.js';
import { Layer, ILayer } from './Layer.js';
import { Element, IElement } from './Element.js';
import { Class, IClass } from './Class.js';
import * as Generator from '@zionstate/generator';
import { IPicker } from '@zionstate/generator';
import { Dna, IDna } from './Dna.js';
import { Edition, IEdition } from './Edition.js';
import { ISystemEntity } from './SystemEntity.js';
import { Image } from '@zionrepack/canvas';
import { CollectionReport } from './Collection/CollectionReport.js';
import { EditionsReport } from './Collection/EditionsReport.js';

let GeneratorMachine = Generator.default;

const Combinator = GeneratorMachine.Combinator;
const Picker = GeneratorMachine.Picker;

type SystemEntities = IClass | IElement | IEdition | ILayer;

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
  get possibiliDna(): IDna[];
  get gruppiDna(): [string[], IDna[], number][];
  get gruppiDnaPuri(): [string[], IDna[], number][];
  get gruppiDnaImpuri(): [string[], IDna[], number][];
  get report(): CollectionReport;
  hasDir(): boolean;
  creaDirectory(): Collection;
  creaEdizione(classe: IClass): IEdition;
  creaEdizioni(volte: number, classe: IClass): IEdition[];
  creaTutteLeEdizioni(): IEdition[];
  stampaEdizione(edizione: IEdition): Promise<ICollection>;
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
    const ERROR = 'non esiste una collezione con quel nome';
    const collections = Collection.#collections;
    const collIndex = collections.findIndex(element => element.name === name);
    const changePosition = zionUtil.changePosition;
    const last = collections.length - 1;
    const check1 = collIndex <= -1;
    const check2 = collIndex + 1 !== collections.length;
    if (check1) throw new Error(ERROR);
    if (check2) changePosition(collections, collIndex, last);
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
    const ERROR1 = 'No argument given',
      ERROR2 = 'Il tipo selezionato non esiste';
    if (!type) throw new Error(ERROR1);
    if (!this.#types.includes(type)) throw new Error(ERROR2);
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
  #editionsReport: EditionsReport;
  get editionsReport(): EditionsReport {
    return this.#editionsReport;
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
  get classes(): IClass[] {
    return this.#classes;
  }
  /**
   * @returns Una lista con i nomi dei nodi inclusi nella
   * collezione (Elementi, Layers, Rarità, Dna). I nodi sono
   * elementi di una classe che estende SystemEntity
   */
  get nodeNames() {
    let servedArray: string[] = [];
    this.nodes.forEach(node => servedArray.push(node.name));
    return servedArray;
  }
  // TODO eliminare?
  /**
   * @returns Una lista contenente gli id dei nodi
   */
  get nodesIds() {
    let servedArray: (string | number)[] = [];
    this.nodes.forEach(node => servedArray.push(node.id));
    return servedArray;
  }
  /**
   *
   */
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
    let result: IElement[][] = [],
      layersStack: SystemEntities[] = [];
    this.layers.forEach(layer => layersStack.push(layer));
    while (layersStack.length) {
      const currentLayer = layersStack.shift();
      let elementsOfArray: IElement[] = [];
      for (let element of this.elements) {
        if (!currentLayer) throw new Error('No Current Layer');
        if (element.èConnessoA(currentLayer)) elementsOfArray.push(element);
      }
      result.push(elementsOfArray);
    }
    return result;
  }
  #possibiliDna: IDna[] = [];
  /**
   * @returns Una lista dei possibili dna
   */
  get possibiliDna(): IDna[] {
    let combinations: IElement[][], servedArray: IDna[], name: string;
    const creaDna = this.#creaDna;
    if (!this.elementsByLayer) throw new Error('no elements by layer');
    if (this.#possibiliDna.length !== 0) return this.#possibiliDna;
    combinations = Combinator.generateCombinations(this.elementsByLayer);
    servedArray = combinations.map(creaDna);
    this.#possibiliDna = servedArray;
    return this.#possibiliDna;
  }
  /**
   * @returns Ritorna una lista di tuple
   */
  get gruppiDna(): [string[], IDna[], number][] {
    const rarities = this.rarities,
      layers = this.layers,
      possibiliDnaPerLayer = this.#possibiliDnaPerLayer,
      generateCombos = Combinator.generateCombinations;
    let response: [string[], IDna[], number][] = [],
      layersRarities: IRarity[][] = [];
    layers.forEach(() => layersRarities.push(rarities));
    let rarityLayersCombinations = generateCombos(layersRarities);
    rarityLayersCombinations.forEach(e =>
      this.#possibiliDnaLayer(e, possibiliDnaPerLayer, response)
    );
    return response;
  }
  /**
   * @returns Ritorna una lista contenente un gruppo di DNA
   */
  get gruppiDnaPuri(): [string[], IDna[], number][] {
    const controllaPuri = this.#controllaPuri;
    let res: [string[], IDna[], number][] = [];
    this.gruppiDna.forEach(gruppoDna => controllaPuri(gruppoDna, res));
    return res;
  }
  /**
   * @returns Ritorna una lista di tuple dei gruppi
   * contentente il nome del gruppo (il nome delle rarità
   * che lo compongono), la lista dei dna che appartengono
   * al gruppo e il numero di elementi nel gruppo
   */
  get gruppiDnaImpuri(): [string[], IDna[], number][] {
    const controllaPuri = this.#controllaPuri;
    let res: [string[], IDna[], number][] = [];
    this.gruppiDna.forEach(gruppoDna => controllaPuri(gruppoDna, res, true));
    return res;
  }
  /**
   * @returns Ritorna un report dettagliato della collezione.
   */
  get report(): CollectionReport {
    let report: CollectionReport,
      servedRarityObj: { [key: string]: number } = {},
      perRarityCount: number = 0;
    // TODO cambiare la funzione da possibiliDna.. a gruppiDnaPuri
    this.gruppiDnaPuri.forEach(
      (tuple, index) => (servedRarityObj[index.toString()] = tuple[2])
    );
    for (let key in servedRarityObj) {
      perRarityCount = perRarityCount + servedRarityObj[key];
    }
    servedRarityObj.somma = perRarityCount;
    report = new CollectionReport(
      this.name,
      this.classes.map((classe, index) => [index, classe.name]),
      this.rarities.map((rarity, index) => [index, rarity.name]),
      this.layers.map((layer, index) => [index, layer.name]),
      this.elements.map((element, index) => [index, element.name]),
      { perRarity: servedRarityObj, totali: this.possibiliDna.length },
      this.supply,
      this.picker.estrazione.elementiRimanenti
    );
    return report;
  }
  picker: IPicker<IDna>;
  /**
   *
   * @param name Nome della collezione.
   * @param symbol Symbolo della collezione (ticker blockchain).
   * @param supply Quantità di token.
   * @param baseURI Base URI per la collezione (URL)
   * @param description Descrizione della collezione-
   * @param path Percorso dei files.
   * @param type Tipo di collezione.
   * @param outputPath percorso dove vengono renderizzati i files.
   * @param width Larghezza dell'immagine.
   * @param height Altezza dell'immagine.
   */
  constructor(
    name: string,
    symbol: string,
    supply: number,
    baseURI: URL,
    description: string,
    path: string,
    type: 'Edition' | 'Element',
    outputPath: string,
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
    this.#editionsReport = new EditionsReport(this.name + 'Report');

    // this.newPicker = this.#collectionPicker();
  }
  hasDir(): boolean {
    const folders = system.arrayOfFoldersInDirectory(this.outputPath);
    return folders.some(element => element.name === this.name);
  }
  /**
   * crea una directory
   * @returns {Collection}
   */
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
  creaEdizioni(volte: number, classe: IClass) {
    let servedArray = [];
    while (volte) {
      volte--;
      let newDna = this.creaEdizione(classe);
      servedArray.push(newDna);
    }
    return servedArray;
  }
  // TODO fare creaTutteLeEdizioni()
  creaTutteLeEdizioni(): IEdition[] {
    let servedArray: IEdition[] = [];
    return servedArray;
  }
  async stampaEdizione(edizione: IEdition): Promise<ICollection> {
    this.drawer.printImage(edizione);
    return this;
  }
  /**
   *
   */
  #possibiliDnaPerLayer = (rarities: IRarity[]): IDna[] => {
    let res: IDna[] = [];
    let checkRaritiesByLayer = (dna: IDna) => {
      let resArray: boolean[] = [];
      rarities.forEach((rarity, index) => {
        const evaluedElement = dna.combination[index];
        const eConnesso: boolean = evaluedElement.èConnessoA(rarity);
        resArray.push(eConnesso);
      });
      if (!resArray.some(e => e === false)) res.push(dna);
    };
    this.possibiliDna.forEach(checkRaritiesByLayer);
    return res;
  };
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
  #controllaPuri(
    gruppo: [string[], IDna[], number],
    res: [string[], IDna[], number][] = [],
    negative: boolean = false
  ) {
    let set = new Set(),
      condizione: boolean;
    gruppo[0].forEach(name => set.add(name));
    if (!negative) condizione = set.size === 1;
    else condizione = set.size !== 1;

    if (condizione) res.push(gruppo);
  }
  #possibiliDnaLayer(
    rarityLayersCombination: IRarity[],
    possibiliDnaPerLayer: Function,
    response: [string[], IDna[], number][]
  ) {
    let res = possibiliDnaPerLayer(rarityLayersCombination);
    let tuple: [string[], IDna[], number] = [[], [], 0];
    let names: string[] = [];
    rarityLayersCombination.forEach(rarity => names.push(rarity.name));
    tuple[0] = names;
    tuple[1] = res;
    tuple[2] = res.length;
    response.push(tuple);
  }
  #creaDna(e: IElement[]): IDna {
    let names: string[] = e.map(e => e.name);
    const concatted = names.join(', ');
    return new Dna(e, concatted);
  }
}
