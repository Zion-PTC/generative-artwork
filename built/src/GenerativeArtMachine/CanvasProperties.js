import { Size } from './Size.js';
export class CanvasProperties {
    context;
    size;
    constructor(context, width, height) {
        this.context = context;
        this.size = new Size(width, height);
    }
}
