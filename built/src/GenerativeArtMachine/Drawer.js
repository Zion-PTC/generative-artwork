import * as Canvas from '@zionrepack/canvas';
import * as Generator from '@zionstate/generator';
import { CanvasProperties } from './CanvasProperties.js';
import { Size } from './Size.js';
export class LoadedImage {
    elementName;
    canvasLoadImage;
    constructor(elementName, image) {
        this.elementName = elementName;
        this.canvasLoadImage = image;
    }
}
let GeneratorMachine = Generator.default;
const { createCanvas, loadImage } = Canvas.default;
export class Drawer {
    width;
    heigth;
    context;
    #canvasProperties;
    #canvasPropertiesWidth;
    #canvasPropertiesHeight;
    #canvas;
    #ctx;
    #collection;
    #loadedImages = [];
    get canvasProperties() {
        return this.#canvasProperties;
    }
    get canvas() {
        return this.#canvas;
    }
    get loadedImages() {
        return this.#loadedImages;
    }
    get collection() {
        return this.#collection;
    }
    get ctx() {
        return this.#ctx;
    }
    get canvasPropertiesWidth() {
        return this.#canvasPropertiesWidth;
    }
    set canvasPropertiesWidth(width) {
        this.#canvasProperties.size.width = width;
    }
    get canvasPropertiesHeight() {
        return this.#canvasPropertiesHeight;
    }
    set canvasPropertiesHeight(height) {
        this.#canvasProperties.size.height = height;
    }
    set loadedImages(image) {
        this.#loadedImages.push(...image);
    }
    set collection(collection) {
        this.#collection = collection;
    }
    /**
     * @param {number} width : 1000; larghezza del canvas legaro al drawer
     * @param {number} heigth
     * @param {*} context
     */
    constructor(width = 1000, heigth = 1000, context, collection) {
        this.width = width;
        this.heigth = heigth;
        this.context = context;
        this.#canvasProperties = new CanvasProperties(context, width, heigth);
        this.#canvasPropertiesWidth = width;
        this.#canvasPropertiesHeight = heigth;
        this.#collection = collection;
        // this.loadedElements = [];
        this.#canvas = createCanvas(width, heigth, 'svg');
        this.#ctx = this.canvas.getContext(this.canvasProperties.context);
    }
    /**
     *
     * @param {Element} element - Oggetto contente le informazioni sull'elemento
     * @param {buffer} element.loadedImage -
     * @param {buffer} element.layer.position.x -
     * @param {buffer} element.layer.position.y -
     * @param {buffer} element.layer.size.width -
     * @param {buffer} element.layer.size.heigth -
     *
     */
    randomBackground() {
        this.ctx.fillStyle = GeneratorMachine.color();
        this.ctx.fillRect(0, 0, this.canvasProperties.size.width, this.canvasProperties.size.height);
    }
    signImage = (sig) => {
        this.ctx.fillStyle = '#000000';
        this.ctx.font = 'bold 30pt Courier';
        this.ctx.textBaseline = 'top';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(sig, 40, 40);
    };
    /**
     * carica l'immagine in pkg per poi imprimerla tramite ctx.drawImage()
     * @param {string} path percorso dell'immagine da caricare
     * nella memoria di pkg
     * @returns {pkg.Image} ritorna un oggetto pkg.Image
     */
    async loadImage(path) {
        let image = await loadImage(path);
        return image;
    }
    /**
     *
     * @param {Buffer} loadedImage immagine caricata da
     * disegnare nel ctx.
     * @param {number} x posizione su asse x
     * @param {number} y posizione su asse y
     * @param {number} width larghezza
     * @param {number} heigth altezza
     * @returns
     */
    drawImage = (loadedImage, x, y, width, heigth) => {
        return this.ctx.drawImage(loadedImage, x, y, width, heigth);
    };
    async getImageSize(path) {
        let size = new Size();
        let image = await loadImage(path);
        size.width = image.width;
        size.height = image.height;
        return size;
    }
    // TODO #1 fare funzione print image
    printImage() {
        return this;
    }
}
