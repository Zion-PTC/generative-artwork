/// <reference types="node" />
import * as Canvas from '@zionrepack/canvas';
import { CanvasProperties, CanvasContext } from './CanvasProperties.js';
import { Collection } from './Collection';
import { ISize } from './Size.js';
interface ICanvasProperty {
    context: CanvasContext;
    size: ISize;
}
export interface IDrawer {
    get canvasProperties(): ICanvasProperty;
    set canvasProperties(canvasProperties: ICanvasProperty);
    get canvasPropertiesWidth(): number;
    set canvasPropertiesWidth(width: number);
    get canvasPropertiesHeight(): number;
    set canvasPropertiesHeight(height: number);
    get canvas(): Canvas.Canvas;
    get loadedImages(): Promise<Canvas.Image>[];
    set loadedImages(image: Promise<Canvas.Image>[]);
    get collection(): Collection;
    set collection(collection: Collection);
    get ctx(): Canvas.CanvasRenderingContext2D;
    randomBackground(): void;
    signImage(sig: string): void;
    loadImage(path: string): Promise<Canvas.Image>;
    drawImage(loadedImage: Buffer, x: number, y: number, width: number, height: number): void;
    getImageSize(path: String): Promise<ISize>;
    printImage(): IDrawer;
}
export declare class Drawer implements IDrawer {
    #private;
    get canvasProperties(): CanvasProperties;
    get canvas(): import("canvas").Canvas;
    get loadedImages(): Promise<Canvas.Image>[];
    get collection(): Collection;
    get ctx(): import("canvas").CanvasRenderingContext2D;
    get canvasPropertiesWidth(): number;
    set canvasPropertiesWidth(width: number);
    get canvasPropertiesHeight(): number;
    set canvasPropertiesHeight(height: number);
    set loadedImages(image: Promise<Canvas.Image>[]);
    set collection(collection: Collection);
    /**
     * @param {number} width : 1000; larghezza del canvas legaro al drawer
     * @param {number} heigth
     * @param {*} context
     */
    constructor(width: number | undefined, heigth: number | undefined, context: CanvasContext, collection: Collection);
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
    randomBackground(): void;
    signImage: (sig: string) => void;
    /**
     * carica l'immagine in pkg per poi imprimerla tramite ctx.drawImage()
     * @param {string} path percorso dell'immagine da caricare
     * nella memoria di pkg
     * @returns {pkg.Image} ritorna un oggetto pkg.Image
     */
    loadImage(path: string): Promise<Canvas.Image>;
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
    drawImage: (loadedImage: Buffer, x: number, y: number, width: number, heigth: number) => void;
    getImageSize(path: string): Promise<ISize>;
    printImage(): this;
}
export {};
