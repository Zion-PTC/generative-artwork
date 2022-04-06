import { Size } from './Size.js';

export class CanvasProperties {
  constructor(context, width, height) {
    this.context = context;
    this.size = new Size(width, height);
  }
}
