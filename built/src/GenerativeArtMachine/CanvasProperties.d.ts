import { ISize } from './Size.js';
export declare type CanvasContext = '2d';
interface ICanvasProperty {
    context: CanvasContext;
    size: ISize;
}
export declare class CanvasProperties implements ICanvasProperty {
    context: CanvasContext;
    size: ISize;
    constructor(context: CanvasContext, width: number, height: number);
}
export {};
