export class StrategiaDiScelta {
  constructor(public strategia?: Function) {}
  assegnaStrategia(metodo: Function) {
    this.strategia = metodo;
    return this;
  }
  picker() {
    if (this.strategia) return this.strategia();
  }
}
