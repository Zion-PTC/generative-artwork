/// <reference types="node" />
import * as Canvas from '@zionrepack/canvas';
import { CanvasProperties, CanvasContext } from './CanvasProperties.js';
import { Collection } from './Collection';
import { ISize } from './Size.js';
declare type Image = Canvas.Image;
export declare type drawImage = {
    (loadedImage: Buffer, x: number, y: number, width: number, height: number): IDrawer;
};
export interface ICanvasProperty {
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
    drawImage: drawImage;
    getImageSize(path: String): Promise<ISize>;
    printImage(): IDrawer;
}
export declare class LoadedImage {
    elementName: string | undefined;
    canvasLoadImage: Promise<import("canvas").Image> | undefined;
    constructor(elementName?: string, image?: Promise<Image>);
}
export declare class Drawer implements IDrawer {
    #private;
    width: number;
    heigth: number;
    context: CanvasContext;
    get canvasProperties(): CanvasProperties;
    get canvas(): import("canvas").Canvas;
    get loadedImages(): Promise<Canvas.Image>[];
    set loadedImages(image: Promise<Canvas.Image>[]);
    get collection(): Collection;
    set collection(collection: Collection);
    get ctx(): import("canvas").CanvasRenderingContext2D;
    get canvasPropertiesWidth(): number;
    set canvasPropertiesWidth(width: number);
    get canvasPropertiesHeight(): number;
    set canvasPropertiesHeight(height: number);
    /**
     * @param {number} width : 1000; larghezza del canvas legaro al drawer
     * @param {number} heigth
     * @param {*} context
     */
    constructor(width: number, heigth: number, context: CanvasContext, collection: Collection);
    randomBackground(): void;
    signImage: (sig: string) => void;
    /**
     * Carica l'immagine in pkg per poi imprimerla tramite ctx.drawImage()
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
    drawImage: (loadedImage: Buffer, x: number, y: number, width: number, heigth: number) => this;
    getImageSize(path: string): Promise<ISize>;
    printImage(): this;
}
export {};
