import { Combinator } from './Combinator.js';
import { Picker } from './Picker.js';

export class GeneratorMachine {
  constructor() {}
  static Combinator = Combinator;
  static Picker = Picker;
  static color() {
    let hue = Math.floor(Math.random() * 360);
    let pastel = `hls(${hue}, 100%, 85%)`;
    return pastel;
  }
  static integerRandomNumber(intervallo) {
    return Math.floor(Math.random() * intervallo);
  }
}
