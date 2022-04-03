import pkg from 'canvas';
import { GeneratorMachine } from '../GeneratorMachine/GeneratorMachine.js';
const { createCanvas, loadImage } = pkg;

class Layer {
  constructor() {
    this.positionX;
    this.position.x;
    this.size.width;
    this.size.heigth;
  }
}

class Element {
  constructor(width, heigth, context) {
    this.loadedImage;
    this.layer = new Layer();
  }
}

export class Drawer {
  /**
   *
   * @param {number} width : 1000; larghezza del canvas legaro al drawer
   * @param {number} heigth
   * @param {*} context
   */
  constructor(width = 1000, heigth = 1000, context = '2d') {
    this.canvasProperties = {
      context: context,
      width: width,
      heigth: heigth,
    };
    this.loadedElements = [];
    this.canvas = createCanvas(width, heigth);
    this.ctx = this.canvas.getContext(
      this.canvasProperties.context
    );
  }
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
    this.ctx.fillStyle = GeneratorMachine.color();
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
