import { Metodo } from './Metodo';

export class MetodoScelta {
  static #metodiScelta: MetodoScelta[] = [];
  static get metodiScelta() {
    let copiedArray = [];
    this.#metodiScelta.forEach(metodo => copiedArray.push(metodo));
    return this.#metodiScelta;
  }
  static scegliMetodo(type: 'Edition' | 'Element') {
    return MetodoScelta.metodiScelta.find(metodo => metodo.name === type);
  }
  constructor(public name?: string, public metodoScelta?: Function) {
    MetodoScelta.#metodiScelta.push(this);
  }
  assegnaMetodoScelta(metodo: Function) {
    this.metodoScelta = metodo;
  }
  scegliElemento() {
    if (!this.metodoScelta) throw new Error('no method');
    return this.metodoScelta();
  }
}
const metodoScelta = new MetodoScelta();
function metodoEdition() {}
function metodoElemento() {}
metodoScelta.assegnaMetodoScelta(metodoEdition);
metodoScelta.assegnaMetodoScelta(metodoElemento);

// TODO eliminare
const collectionPicker = function (type: string) {
  const metodo = Metodo.findMetodo(type);
  metodoScelta.assegnaMetodoScelta(metodo);
  return metodo;
};
