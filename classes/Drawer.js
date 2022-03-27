import pkg from 'canvas';
import { Generator } from './Generator.js';
const { createCanvas, loadImage } = pkg;

export class Drawer {
  constructor(width = 1000, heigth = 1000, context = '2d') {
    this.canvasProperties = {
      context: context,
      width: width,
      heigth: heigth,
    };
    this._prova = 2;
    this.loadedElements = [];
    this.canvas = createCanvas(width, heigth);
    this.ctx = this.canvas.getContext(
      this.canvasProperties.context
    );
  }
  get prova() {
    return this._prova;
  }
  drawElement = (element) => {
    this.ctx.drawImage(
      element.loadedImage,
      element.layer.position.x,
      element.layer.position.x,
      element.layer.size.width,
      element.layer.size.heigth
    );
  };
  randomBackground() {
    this.ctx.fillStyle = Generator.color();
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
  async loadLayerImage(layer) {
    return new Promise(async (res, rej) => {
      const image = await loadImage(
        `${layer.selectedElement.path}`
      );
      res({ layer, loadedImage: image });
    });
  }
  loadElements = async (results) => {
    let arrayOfPromise = [];
    results.forEach((layer) => {
      arrayOfPromise.push(this.loadLayerImage(layer));
    });
    let array = await Promise.all(arrayOfPromise);
    return array;
  };
}
