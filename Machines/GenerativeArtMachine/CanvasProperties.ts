import { Size, ISize } from './Size.js';

type Context = '2d';
interface ICanvasProperty {
  context: Context;
  size: ISize;
}

export class CanvasProperties implements ICanvasProperty {
  context: Context;
  size: ISize;
  constructor(context: Context, width: number, height: number) {
    this.context = context;
    this.size = new Size(width, height);
  }
}
