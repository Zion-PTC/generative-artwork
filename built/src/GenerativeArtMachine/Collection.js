import { system } from '@zionstate/system';
import { SmartContract } from './SmartContract.js';
import { Drawer, LoadedImage } from './Drawer.js';
import { zionUtil } from '@zionstate_node/zion-util';
import { Rarity } from './Rarity.js';
import { Layer } from './Layer.js';
import { Element } from './Element.js';
import { Class } from './Class.js';
import * as Generator from '@zionstate/generator';
import { Dna } from './Dna.js';
import { Edition } from './Edition.js';
import { CollectionReport } from './Collection/CollectionReport.js';
import { EditionsReport } from './Collection/EditionsReport.js';
import { Metodo } from './Metodo/Metodo.js';
import { StrategiaDiScelta } from './Metodo/StratediDiScelta.js';
let GeneratorMachine = Generator.default;
const Combinator = GeneratorMachine.Combinator;
const Picker = GeneratorMachine.Picker;
export class Collection extends SmartContract {
    static #collections = [];
    static get collections() {
        let servedArray = [];
        Collection.#collections.forEach(el => servedArray.push(el));
        Object.freeze(servedArray);
        return servedArray;
    }
    static collectionExists(name) {
        return Collection.#collections.some(collection => collection.name === name);
    }
    static deleteCollection(name) {
        const ERROR = 'non esiste una collezione con quel nome';
        const collections = Collection.#collections;
        const collIndex = collections.findIndex(element => element.name === name);
        const changePosition = zionUtil.changePosition;
        const last = collections.length - 1;
        const check1 = collIndex <= -1;
        const check2 = collIndex + 1 !== collections.length;
        if (check1)
            throw new Error(ERROR);
        if (check2)
            changePosition(collections, collIndex, last);
        Collection.#collections.pop();
        return Collection.#collections;
    }
    #id;
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
    #type;
    get type() {
        return this.#type;
    }
    set type(type) {
        const ERROR1 = 'No argument given', ERROR2 = 'Il tipo selezionato non esiste';
        if (!type)
            throw new Error(ERROR1);
        if (!this.#types.includes(type))
            throw new Error(ERROR2);
        this.#type = type;
    }
    #outputPath;
    get outputPath() {
        return this.#outputPath;
    }
    set outputPath(outputPath) {
        this.#outputPath = outputPath;
    }
    #editions = [];
    get editions() {
        return this.#editions;
    }
    set editions(editions) {
        this.#editions.push(...editions);
    }
    #nodes = [];
    get nodes() {
        return this.#nodes;
    }
    set nodes(nodes) {
        this.#nodes.push(...nodes);
    }
    #editionsReport;
    get editionsReport() {
        return this.#editionsReport;
    }
    set editionsReport(editionReport) {
        this.#editionsReport = editionReport;
    }
    #drawer;
    get drawer() {
        return this.#drawer;
    }
    #rarities = [];
    get rarities() {
        return this.#rarities;
    }
    #layers = [];
    get layers() {
        return this.#layers;
    }
    #elements = [];
    get elements() {
        return this.#elements;
    }
    #classes = [];
    get classes() {
        return this.#classes;
    }
    /**
     *
     */
    get nodeNames() {
        let servedArray = [];
        this.nodes.forEach(node => servedArray.push(node.name));
        return servedArray;
    }
    /**
     *
     */
    get nodesIds() {
        let servedArray = [];
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
    get elementsByLayer() {
        let result = [];
        let layersStack = [];
        const aggiungiALayersStack = function (layer) {
            layersStack.push(layer);
        };
        this.layers.forEach(aggiungiALayersStack);
        while (layersStack.length) {
            let elementsOfArray = [];
            const currentLayer = layersStack.shift();
            for (let element of this.elements) {
                if (!currentLayer)
                    throw new Error('No Current Layer');
                if (element.èConnessoA(currentLayer))
                    elementsOfArray.push(element);
            }
            result.push(elementsOfArray);
        }
        return result;
    }
    // TODO spostare la creazione dei DNA nel costruttore
    /**
     *
     */
    get possibiliDna() {
        if (!this.elementsByLayer)
            throw new Error('no elements by layer');
        let combinations = Combinator.generateCombinations(this.elementsByLayer);
        let servedArray = combinations.map(e => new Dna(e, 'name'));
        return servedArray;
    }
    /**
     * @returns Ritorna una lista di tuple
     */
    get gruppiDna() {
        const rarities = this.rarities, layers = this.layers, possibiliDnaPerLayer = this.possibiliDnaPerLayer, generateCombos = Combinator.generateCombinations;
        let response = [], layersRarities = [];
        layers.forEach(() => layersRarities.push(rarities));
        let rarityLayersCombinations = generateCombos(layersRarities);
        rarityLayersCombinations.forEach(e => this.#possibiliDnaLayer(e, possibiliDnaPerLayer, response));
        return response;
    }
    /**
     * @returns Ritorna una lista contenente un gruppo di DNA
     */
    get gruppiDnaPuri() {
        const controllaPuri = this.#controllaPuri;
        let res = [];
        this.gruppiDna.forEach(gruppoDna => controllaPuri(gruppoDna, res));
        return res;
    }
    /**
     *
     */
    get gruppiDnaImpuri() {
        const controllaPuri = this.#controllaPuri;
        let res = [];
        this.gruppiDna.forEach(gruppoDna => controllaPuri(gruppoDna, res, true));
        return res;
    }
    /**
     *
     */
    get report() {
        let report, servedRarityObj = {}, perRarityCount = 0;
        // TODO cambiare la funzione da possibiliDna.. a gruppiDnaPuri
        this.gruppiDnaPuri.forEach((tuple, index) => (servedRarityObj[index.toString()] = tuple[2]));
        for (let key in servedRarityObj) {
            perRarityCount = perRarityCount + servedRarityObj[key];
        }
        servedRarityObj.somma = perRarityCount;
        report = new CollectionReport(this.name, this.classes.map((classe, index) => [index, classe.name]), this.rarities.map((rarity, index) => [index, rarity.name]), this.layers.map((layer, index) => [index, layer.name]), this.elements.map((element, index) => [index, element.name]), { perRarity: servedRarityObj, totali: this.possibiliDna.length }, this.supply, this.picker.estrazione.elementiRimanenti);
        return report;
    }
    picker;
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
    constructor(name, symbol, supply, baseURI, description, path, type, outputPath, width = 1000, height = 1000) {
        if (Collection.collectionExists(name))
            throw new Error('already exists');
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
        this.picker = new Picker(this.possibiliDna);
        this.#editionsReport = new EditionsReport(this.name + 'Report');
        // this.newPicker = this.#collectionPicker();
    }
    hasDir() {
        const folders = system.arrayOfFoldersInDirectory(this.outputPath);
        return folders.some(element => element.name === this.name);
    }
    /**
     * crea una directory
     * @returns {Collection}
     */
    creaDirectory() {
        if (this.hasDir())
            throw Error('Non è stato possibile');
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
    creaEdizione(classe) {
        let strategy = classe, nuovaEstrazione, PATH;
        if (this.picker)
            nuovaEstrazione = this.picker.scegliACasoETogliElementoDaArray();
        const NAME = 'name';
        if (this.outputPath)
            PATH = this.outputPath;
        const TYPE = 0;
        const WIDTH = this.#drawer.canvasPropertiesWidth;
        const HEIGHT = this.#drawer.canvasPropertiesHeight;
        if (!PATH)
            throw new Error('no path');
        if (nuovaEstrazione?.elementoEstratto === undefined)
            throw new Error('no estrazione');
        let newEdizione = new Edition(NAME, PATH, TYPE, WIDTH, HEIGHT, nuovaEstrazione.elementoEstratto);
        this.editions = [newEdizione];
        this.editionsReport.createdEditions = this.editions;
        nuovaEstrazione.elementoEstratto.combination.forEach(element => (this.editionsReport.elementUsage = element.name));
        return newEdizione;
    }
    creaEdizioni(volte, classe) {
        let servedArray = [];
        while (volte) {
            volte--;
            let newDna = this.creaEdizione(classe);
            servedArray.push(newDna);
        }
        return servedArray;
    }
    // TODO fare creaTutteLeEdizioni()
    creaTutteLeEdizioni() {
        let servedArray = [];
        return servedArray;
    }
    async stampaEdizione(edizione) {
        this.drawer.printImage(edizione);
        return this;
    }
    /**
     *
     */
    possibiliDnaPerLayer = (rarities) => {
        let res = [];
        let checkRaritiesByLayer = (dna) => {
            let resArray = [];
            rarities.forEach((rarity, index) => {
                const evaluedElement = dna.combination[index];
                const eConnesso = evaluedElement.èConnessoA(rarity);
                resArray.push(eConnesso);
            });
            if (!resArray.some(e => e === false))
                res.push(dna);
        };
        this.possibiliDna.forEach(checkRaritiesByLayer);
        return res;
    };
    #buildSistemEntities(strategy) {
        const index = this.#types.findIndex(e => e === this.type);
        if (!this.path)
            return 'no path';
        let tree = strategy(this.path);
        if (!tree)
            return 'no tree';
        let nodes = tree.nodes;
        let classes = [];
        let layers = [];
        let rarities = [];
        let elements = [];
        let classServedObj = {};
        let layerServedObj = {};
        let rarityServObj = {};
        nodes.forEach(node => {
            if (node.depth === 3)
                rarityServObj[node.name] = [];
            if (node.depth === 2)
                layerServedObj[node.name] = [];
            if (node.depth === 1)
                classServedObj[node.name] = [];
        });
        let fileCounter = 0;
        nodes.forEach(node => {
            if (node.depth === 1) {
                let currentClass = node;
                // creo classe per ogni cartella con depth 1
                let newClass = new Class(currentClass.name, currentClass.path, 
                // TODO cambiare type da number a string?
                this.type === 'Edition' ? 0 : 1, 0, 0);
                // aggiungo classe a lista
                this.#nodes.push(newClass);
                //
                if (!currentClass.figlio)
                    throw new Error('no figlio');
                for (let layer of currentClass.figlio) {
                    // TODO cambiare gli Error
                    // if (!this.#drawer) throw new Error('no drawer');
                    // creo i layer della classe
                    let newLayer = new Layer(layer.name, layer.path, index, this.#drawer.canvasPropertiesWidth, this.#drawer.canvasPropertiesHeight);
                    // aggiungo layer a lista
                    this.#nodes.push(newLayer);
                    if (!layer.figlio)
                        throw new Error('no figlio');
                    // controllo le rarità
                    for (let rarity of layer.figlio) {
                        if (!rarity.figlio)
                            throw new Error('no figlio');
                        for (let element of rarity.figlio) {
                            fileCounter++;
                            // controllo che sia un TreeNode di tipo IFile
                            let file;
                            if ('extension' in element) {
                                file = element;
                                if (!file.extension)
                                    throw new Error('no extension');
                                if (!file.fileSize)
                                    throw new Error('no fileSize');
                            }
                            else {
                                throw new Error('not a File');
                            }
                            layerServedObj[layer.name].push(element.name);
                            // creo gli elementi per ogni rarità
                            let newElement = new Element(file.name, file.path, index, this.#drawer.canvasPropertiesWidth, this.#drawer.canvasPropertiesHeight, file.extension, file.fileSize, 'description', 0);
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
            let newRarity = new Rarity(key, index);
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
    #loadElements() {
        let count = 0;
        this.elements.forEach(async (element) => {
            let loadedImage = new LoadedImage();
            loadedImage.canvasLoadImage = this.drawer.loadImage(element.path);
            loadedImage.elementName = element.name;
            element.loadedImageIndex = count;
            element.loadedImage = loadedImage;
            count++;
            this.drawer.loadedImages.push(loadedImage.canvasLoadImage);
            element.size.width = (await loadedImage.canvasLoadImage).width;
            element.size.height = (await loadedImage.canvasLoadImage).height;
        });
        return this.drawer.loadedImages;
    }
    // TODO eliminare #collectionPicker?
    #collectionPicker() {
        new Metodo('Edition', this.#metodoEdition);
        new Metodo('Element', this.#metodoElement);
        const metodo = Metodo.findMetodo(this.type);
        let strategiaDiScelta = new StrategiaDiScelta();
        if (!metodo)
            throw new Error('no metodo');
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
    #controllaPuri(gruppo, res = [], negative = false) {
        let set = new Set(), condizione;
        gruppo[0].forEach(name => set.add(name));
        if (!negative)
            condizione = set.size === 1;
        else
            condizione = set.size !== 1;
        if (condizione)
            res.push(gruppo);
    }
    #possibiliDnaLayer(rarityLayersCombination, possibiliDnaPerLayer, response) {
        let res = possibiliDnaPerLayer(rarityLayersCombination);
        let tuple = [[], [], 0];
        let names = [];
        rarityLayersCombination.forEach(rarity => names.push(rarity.name));
        tuple[0] = names;
        tuple[1] = res;
        tuple[2] = res.length;
        response.push(tuple);
    }
}
