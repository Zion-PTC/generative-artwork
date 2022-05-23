import { system, } from '@zionstate/system';
import { SmartContract } from './SmartContract.js';
import { Drawer } from './Drawer.js';
import { zionUtil } from '@zionstate_node/zion-util';
import { Rarity } from './Rarity.js';
import { Layer } from './Layer.js';
import { Element } from './Element.js';
import { Class } from './Class.js';
import * as Generator from '@zionstate/generator';
import { Dna } from './Dna.js';
import { Edition } from './Edition.js';
// import { TreeNode } from '@zionstate/system/built/src/TreeNode';
let GeneratorMachine = Generator.default;
const Combinator = GeneratorMachine.Combinator;
const Picker = GeneratorMachine.Picker;
const Estrazione = GeneratorMachine.Picker.Estrazione;
export class Collection extends SmartContract {
    // STATIC \\
    static #collections = [];
    // PROPERTIES \\
    static get collections() {
        let servedArray = [];
        Collection.#collections.forEach(el => servedArray.push(el));
        Object.freeze(servedArray);
        return servedArray;
    }
    // METHODS \\
    static collectionExists(name) {
        return Collection.#collections.some(collection => collection.name === name);
    }
    static deleteCollection(name) {
        // cerca l'indice della collezione tramite il nome
        const indiceDellaCollezione = Collection.#collections.findIndex(element => element.name === name);
        // se non c'è lancia errore
        if (indiceDellaCollezione <= -1) {
            throw new Error('non esiste una collezione con quel nome');
        }
        // se c'è cancella l'elemento
        if (indiceDellaCollezione + 1 !== Collection.#collections.length) {
            zionUtil.changePosition(Collection.#collections, indiceDellaCollezione, Collection.#collections.length - 1);
        }
        Collection.#collections.pop();
        return Collection.#collections;
    }
    // INFOS
    // #strategy:Function;
    // newPicker: IPicker<IDna>;
    picker;
    // GRAPH
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
        if (!this.#type)
            this.#type = 'Edition';
        return this.#type;
    }
    set type(type) {
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
    /**
     * @returns {Class[]}
     */
    get classes() {
        return this.#classes;
    }
    #nodes = [];
    get nodes() {
        return this.#nodes;
    }
    set nodes(nodes) {
        this.#nodes.push(...nodes);
    }
    get nodeNames() {
        let servedArray = [];
        this.nodes.forEach(node => servedArray.push(node.name));
        return servedArray;
    }
    get nodesIds() {
        let servedArray = [];
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
            if (!array)
                throw new Error('no array');
            for (let layer of array) {
                let elementsOfLayerByRarity = [];
                for (let element of layer) {
                    if (element.èConnessoA(rarity)) {
                        elementsOfLayerByRarity.push(element);
                    }
                }
                rarityLayers.push(elementsOfLayerByRarity);
            }
            result.push(rarityLayers);
        }
        return result;
    }
    get possibiliDna() {
        if (!this.elementsByLayer)
            throw new Error('no elements by layer');
        let combinations = Combinator.generateCombinations(this.elementsByLayer);
        let servedArray = combinations.map(e => new Dna(e, 'name'));
        return servedArray;
    }
    get possibiliDnaPerRarità() {
        let result = [], combinations;
        const creaEAggiungi = function (elementsByLayer) {
            combinations = Combinator.generateCombinations(elementsByLayer);
            let servedArray = combinations.map(e => new Dna(e, 'name'));
            result.push(servedArray);
        };
        if (this.elementsByLayerByRarity)
            this.elementsByLayerByRarity.forEach(creaEAggiungi);
        return result;
    }
    /**
     * @param {string} name nome della collezione
     * @param {string} path percorso della cartella contenente i dati della collezione
     * @param {string} baseUri percorso base per gli oggetti della collezione. Questo dato è quello che apparirà nei metadata degli NFT.
     */
    constructor(name, symbol = 'simbolo della collezione che verrà usato per creare i token', supply = 1000, baseURI, description = 'descrizione della collezione che apparirà sulla blockchain', path = 'percorso del root della collezione', type = 'Edition', outputPath = '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/GenerativeArtMachine/Machines', width = 1000, height = 1000) {
        if (!Collection.collectionExists(name)) {
            super(name, symbol, supply, baseURI, description);
            let drawer = new Drawer(width, height, '2d', this);
            this.#path = path;
            this.#type = type;
            this.#outputPath = outputPath;
            this.#drawer = drawer;
            Collection.#collections.push(this);
            this.#id = Collection.#collections.length;
            this.#buildSistemEntities(system.buildTree);
            this.#loadElements();
            // this.newPicker = this.#collectionPicker();
            if (this.possibiliDna)
                this.picker = new Picker(this.possibiliDna);
        }
    }
    hasDir() {
        // controllare nel path se esiste una cartella
        if (!this.outputPath)
            return;
        const folders = system.arrayOfFoldersInDirectory(this.outputPath);
        return folders.some(element => element.name === this.name);
    }
    creaDirectory() {
        if (this.hasDir())
            throw Error('Non è stato possibile');
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
    creaEdizione(classe) {
        let strategy = classe, nuovaEstrazione, PATH;
        if (this.picker)
            nuovaEstrazione = this.picker.scegliACasoETogliElementoDaArray();
        const NAME = 'name';
        if (this.outputPath)
            PATH = this.outputPath;
        const TYPE = 0;
        const WIDTH = 0;
        const HEIGHT = 0;
        if (!PATH)
            throw new Error('no path');
        if (nuovaEstrazione?.elementoEstratto === undefined)
            throw new Error('no estrazione');
        let newEdizione = new Edition(NAME, PATH, TYPE, WIDTH, HEIGHT, nuovaEstrazione.elementoEstratto);
        return newEdizione;
    }
    creaEdizioneNVolte(volte, classe) {
        let servedArray = [];
        while (volte) {
            volte--;
            let newDna = this.creaEdizione(classe);
            servedArray.push(newDna);
        }
        return servedArray;
    }
    creaTutteLeEdizioni() {
        let serveArray = [];
    }
    #buildSistemEntities(strategy) {
        if (!this.path)
            return 'no path';
        let tree = strategy(this.path);
        if (!tree)
            return 'no tree';
        let nodes = tree.nodes;
        console.log(nodes.length);
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
        nodes.forEach(node => {
            if (node.depth === 1) {
                let currentClass = node;
                let newClass = new Class(currentClass.name, currentClass.path, this.type === 'Edition' ? 0 : 1, 0, 0);
                this.#nodes.push(newClass);
                if (!currentClass.figlio)
                    throw new Error('no figlio');
                for (let layer of currentClass.figlio) {
                    // TODO cambiare gli Error
                    if (!this.#drawer)
                        throw new Error('no drawer');
                    let newLayer = new Layer(layer.name, layer.path, this.#types.findIndex(e => e === this.type), this.#drawer.canvasPropertiesWidth, this.#drawer.canvasPropertiesHeight);
                    this.#nodes.push(newLayer);
                    if (!layer.figlio)
                        throw new Error('no figlio');
                    for (let rarity of layer.figlio) {
                        if (!rarity.figlio)
                            throw new Error('no figlio');
                        for (let element of rarity.figlio) {
                            let file;
                            if ('extension' in element) {
                                file = element;
                                if (!file.extension)
                                    throw new Error('no exetension');
                                if (!file.fileSize)
                                    throw new Error('no fileSize');
                            }
                            else {
                                throw new Error('not a File');
                            }
                            layerServedObj[layer.name].push(element.name);
                            // qui potrei creare gli elementi
                            let newElement = new Element(file.name, file.path, this.#types.findIndex(e => e === this.type), this.#drawer.canvasPropertiesWidth, this.#drawer.canvasPropertiesHeight, file.extension, file.fileSize, 'description', 0);
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
            let newRarity = new Rarity(key, this.#types.findIndex(e => e === this.type));
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
        if (!this.drawer)
            throw new Error('no drawer');
        let count = 0;
        this.elements.forEach(async (element) => {
            class LoadedImage {
                elementName;
                canvasLoadImage;
                constructor(elementName, image) {
                    this.elementName = elementName;
                    this.canvasLoadImage = image;
                }
            }
            let loadedImage = new LoadedImage();
            if (!this.drawer)
                throw new Error('no drawer');
            if (!element.size)
                throw new Error('no size');
            if (element.path)
                loadedImage.canvasLoadImage = this.drawer.loadImage(element.path);
            loadedImage.elementName = element.name;
            element.loadedImageIndex = count;
            count++;
            this.drawer.loadedImages.push(loadedImage.canvasLoadImage);
            element.size.width = (await loadedImage.canvasLoadImage).width;
            element.size.height = (await loadedImage.canvasLoadImage).height;
        });
        return this.drawer.loadedImages;
    }
    #collectionPicker() {
        class Metodo {
            name;
            metodo;
            static #metodi = [];
            static get metodi() {
                return Metodo.#metodi;
            }
            static findMetodo(name) {
                if (!Metodo.#metodi)
                    throw new Error('no metodi');
                return Metodo.#metodi.find(metodo => metodo.name === name);
            }
            constructor(name, metodo) {
                this.name = name;
                this.metodo = metodo;
                Metodo.#metodi.push(this);
            }
        }
        class StrategiaDiScelta {
            strategia;
            constructor(strategia) {
                this.strategia = strategia;
            }
            assegnaStrategia(metodo) {
                return (this.strategia = metodo.metodo);
            }
            picker() {
                if (this.strategia)
                    return this.strategia();
            }
        }
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
}
