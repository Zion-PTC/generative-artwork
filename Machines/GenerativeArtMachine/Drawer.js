import pkg from 'canvas';
import { GeneratorMachine } from '../GeneratorMachine.js';
import { CanvasProperties } from './CanvasProperties.js';
import { Size } from './Size.js';
const { createCanvas, loadImage } = pkg;
export class Drawer {
  #canvasProperties;
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
  set canvasProperties(canvasProperties) {
    return (this.#canvasProperties = canvasProperties);
  }
  set loadedImages(image) {
    return this.#loadedImages.push(image);
  }
  set collection(collection) {
    return (this.#collection = collection);
  }
  /**
   * @param {number} width : 1000; larghezza del canvas legaro al drawer
   * @param {number} heigth
   * @param {*} context
   */
  constructor(
    width = 1000,
    heigth = 1000,
    context = '2d',
    collection
  ) {
    this.#canvasProperties = new CanvasProperties(
      context,
      width,
      heigth
    );
    this.#collection = collection;
    // this.loadedElements = [];
    this.#canvas = createCanvas(width, heigth);
    this.#ctx = this.canvas.getContext(
      this.canvasProperties.context
    );
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
    this.ctx.fillRect(
      0,
      0,
      this.canvasProperties.width,
      this.canvasProperties.heigth
    );
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
    let image = loadImage(path);
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
    return this.ctx.drawImage(
      loadedImage,
      x,
      y,
      width,
      heigth
    );
  };
  async getImageSize(path) {
    let size = new Size();
    let image = await loadImage(path);
    size.width = image.width;
    size.height = image.height;
    return size;
  }
}
