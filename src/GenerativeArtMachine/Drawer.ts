import * as Canvas from '@zionrepack/canvas';
import * as Generator from '@zionstate/generator';
import { CanvasProperties, CanvasContext } from './CanvasProperties.js';
import { Collection, ICollection } from './Collection';
import { Size, ISize } from './Size.js';

type Image = Canvas.Image;
let GeneratorMachine = Generator.default;
const { createCanvas, loadImage } = Canvas.default;

export type drawImage = {
  (
    loadedImage: Buffer,
    x: number,
    y: number,
    width: number,
    height: number
  ): IDrawer;
};

export interface ICanvasProperty {
  context: CanvasContext;
  size: ISize;
}

export interface IDrawer {
  get canvasProperties(): ICanvasProperty;
  set canvasProperties(canvasProperties);
  get canvasPropertiesWidth(): number;
  set canvasPropertiesWidth(width: number);
  get canvasPropertiesHeight(): number;
  set canvasPropertiesHeight(height: number);
  get canvas(): Canvas.Canvas;
  get loadedImages(): Promise<Canvas.Image>[];
  set loadedImages(image: Promise<Canvas.Image>[]);
  get collection(): Collection;
  set collection(collection);
  get ctx(): Canvas.CanvasRenderingContext2D;
  randomBackground(): void;
  signImage(sig: string): void;
  loadImage(path: string): Promise<Canvas.Image>;
  drawImage: drawImage;
  getImageSize(path: String): Promise<ISize>;
  printImage(): IDrawer;
}

export class LoadedImage {
  elementName;
  canvasLoadImage;
  constructor(elementName?: string, image?: Promise<Image>) {
    this.elementName = elementName;
    this.canvasLoadImage = image;
  }
}

export class Drawer implements IDrawer {
  #canvasProperties: CanvasProperties;
  get canvasProperties() {
    return this.#canvasProperties;
  }
  #canvas: Canvas.Canvas;
  get canvas() {
    return this.#canvas;
  }
  #loadedImages: Promise<Canvas.Image>[] = [];
  get loadedImages() {
    return this.#loadedImages;
  }
  set loadedImages(image: Promise<Canvas.Image>[]) {
    this.#loadedImages.push(...image);
  }
  #collection: Collection;
  get collection() {
    return this.#collection;
  }
  set collection(collection) {
    this.#collection = collection;
  }
  #ctx: Canvas.CanvasRenderingContext2D;
  get ctx() {
    return this.#ctx;
  }
  #canvasPropertiesWidth: number;
  get canvasPropertiesWidth() {
    return this.#canvasPropertiesWidth;
  }
  set canvasPropertiesWidth(width: number) {
    this.#canvasProperties.size.width = width;
  }
  #canvasPropertiesHeight: number;
  get canvasPropertiesHeight() {
    return this.#canvasPropertiesHeight;
  }
  set canvasPropertiesHeight(height: number) {
    this.#canvasProperties.size.height = height;
  }
  /**
   * @param {number} width : 1000; larghezza del canvas legaro al drawer
   * @param {number} heigth
   * @param {*} context
   */
  constructor(
    public width: number = 1000,
    public heigth: number = 1000,
    public context: CanvasContext,
    collection: Collection
  ) {
    this.#canvasProperties = new CanvasProperties(context, width, heigth);
    this.#canvasPropertiesWidth = width;
    this.#canvasPropertiesHeight = heigth;
    this.#collection = collection;
    this.#canvas = createCanvas(width, heigth, 'svg');
    this.#ctx = this.canvas.getContext(this.canvasProperties.context);
  }
  randomBackground() {
    this.ctx.fillStyle = GeneratorMachine.color();
    this.ctx.fillRect(
      0,
      0,
      this.canvasProperties.size.width,
      this.canvasProperties.size.height
    );
  }
  signImage = (sig: string) => {
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
  async loadImage(path: string): Promise<Canvas.Image> {
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
  drawImage = (
    loadedImage: Buffer,
    x: number,
    y: number,
    width: number,
    heigth: number
  ) => {
    this.ctx.drawImage(loadedImage, x, y, width, heigth);
    return this;
  };
  async getImageSize(path: string): Promise<ISize> {
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
