import { Position } from '../Classes/Position';
import { Size } from '../Classes/Size';

export class CanvasProperties {
  constructor(context) {
    this.context = context;
    this.position = new Position();
    this.size = new Size();
  }
}
