export class Metodo {
  name: string;
  metodo: Function;
  static #metodi: Metodo[] = [];
  static get metodi() {
    return Metodo.#metodi;
  }
  static findMetodo(name: string): Function {
    if (!Metodo.#metodi) throw new Error('no metodi');
    let res: Metodo | undefined = Metodo.#metodi.find(
      metodo => metodo.name === name
    );
    if (!res) throw new Error('no match');
    return res.metodo;
  }
  constructor(name: string, metodo: Function) {
    this.name = name;
    this.metodo = metodo;
    Metodo.#metodi.push(this);
  }
}
