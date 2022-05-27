import * as Canvas from '@zionrepack/canvas';
import * as Generator from '@zionstate/generator';
import { system } from '@zionstate/system';
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
    // #ctx: Canvas.CanvasRenderingContext2D;
    // get ctx() {
    //   return this.#ctx;
    // }
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
    ctx;
    constructor(width = 1000, heigth = 1000, context = '2d', collection) {
        this.width = width;
        this.heigth = heigth;
        this.context = context;
        this.#canvasProperties = new CanvasProperties(context, width, heigth);
        this.#canvasPropertiesWidth = width;
        this.#canvasPropertiesHeight = heigth;
        this.#collection = collection;
        this.#canvas = createCanvas(width, heigth);
        this.ctx = this.canvas.getContext(this.canvasProperties.context);
    }
    /**
     * @param {Buffer} loadedImage immagine caricata da
     * disegnare nel ctx.
     * @param {number} dx posizione su asse x
     * @param {number} dy posizione su asse y
     * @param {number} dw larghezza
     * @param {number} dh altezza
     * @returns
     */
    drawImage = (loadedImage, dx, dy) => {
        console.log();
        let ctx = this.canvas.getContext('2d');
        ctx.drawImage(loadedImage, dx, dy);
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
    async printImage(edizione) {
        try {
            let path, loadedImages;
            const drawImage = this.drawImage;
            if (!edizione.path)
                return;
            path = edizione.path + '/' + edizione.id + '.png';
            loadedImages = await edizione.dna.layeredImages;
            function draw(image) {
                if (!image)
                    return;
                drawImage(image, 0, 0);
            }
            loadedImages.forEach(draw);
            system.writePng(path, this.canvas.toBuffer('image/png'));
            console.log('printed', path);
        }
        catch (error) {
            console.log(error);
        }
        return this;
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
}
