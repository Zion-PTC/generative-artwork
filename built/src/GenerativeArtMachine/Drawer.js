import * as Canvas from '@zionrepack/canvas';
import * as Generator from '@zionstate/generator';
import { CanvasProperties } from './CanvasProperties.js';
import { Size } from './Size.js';
let GeneratorMachine = Generator.default;
const { createCanvas, loadImage } = Canvas.default;
export class LoadedImage {
    elementName;
    canvasLoadImage;
    constructor(elementName, image) {
        this.elementName = elementName;
        this.canvasLoadImage = image;
    }
}
export class Drawer {
    width;
    heigth;
    context;
    #canvasProperties;
    get canvasProperties() {
        return this.#canvasProperties;
    }
    #canvas;
    get canvas() {
        return this.#canvas;
    }
    #loadedImages = [];
    get loadedImages() {
        return this.#loadedImages;
    }
    set loadedImages(image) {
        this.#loadedImages.push(...image);
    }
    #collection;
    get collection() {
        return this.#collection;
    }
    set collection(collection) {
        this.#collection = collection;
    }
    #ctx;
    get ctx() {
        return this.#ctx;
    }
    #canvasPropertiesWidth;
    get canvasPropertiesWidth() {
        return this.#canvasPropertiesWidth;
    }
    set canvasPropertiesWidth(width) {
        this.#canvasProperties.size.width = width;
    }
    #canvasPropertiesHeight;
    get canvasPropertiesHeight() {
        return this.#canvasPropertiesHeight;
    }
    set canvasPropertiesHeight(height) {
        this.#canvasProperties.size.height = height;
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
        this.#canvas = createCanvas(width, heigth, 'svg');
        this.#ctx = this.canvas.getContext(this.canvasProperties.context);
    }
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
     * Carica l'immagine in pkg per poi imprimerla tramite ctx.drawImage()
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
        this.ctx.drawImage(loadedImage, x, y, width, heigth);
        return this;
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
