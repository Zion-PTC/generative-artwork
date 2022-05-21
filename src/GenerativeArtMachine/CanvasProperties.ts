import { Size, ISize } from './Size.js';

export type CanvasContext = '2d';
interface ICanvasProperty {
  context: CanvasContext;
  size: ISize;
}

export class CanvasProperties implements ICanvasProperty {
  context: CanvasContext;
  size: ISize;
  constructor(context: CanvasContext, width: number, height: number) {
    this.context = context;
    this.size = new Size(width, height);
  }
}
