import { Combinator } from './GeneratorMachine/Combinator.js';
import { Picker } from './GeneratorMachine/Picker.js';

export class GeneratorMachine {
  static Picker = Picker;
  static Combinator = Combinator;
  constructor() {}
  static color() {
    let hue = Math.floor(Math.random() * 360);
    let pastel = `hls(${hue}, 100%, 85%)`;
    return pastel;
  }
  static integerRandomNumber(intervallo) {
    return Math.floor(Math.random() * intervallo);
  }
  /**
   * Funzione che serve per generare le combinazioni di DNA
   * @param {array[][]} array riceve un array contenente gli
   * elementi di ogni layer. I layer devono essere ordinati
   * nella maniera corretta.
   * @returns un array contenente i DNA generati.
   */
}
