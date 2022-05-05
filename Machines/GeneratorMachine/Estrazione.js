export class Estrazione {
  constructor(arrayOriginale = []) {
    this.arrayOriginale = arrayOriginale;
    this.elementoEstratto = undefined;
    this.elementiRimanenti = this.#copiaArray();
    this.elementiEstratti = [];
  }
  #copiaArray() {
    let servedArray = [];
    this.arrayOriginale.forEach((element) =>
      servedArray.push(element)
    );
    return servedArray;
  }
}
