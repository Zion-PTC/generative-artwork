export class StrategiaDiScelta {
    strategia;
    constructor(strategia) {
        this.strategia = strategia;
    }
    assegnaStrategia(metodo) {
        this.strategia = metodo;
        return this;
    }
    picker() {
        if (this.strategia)
            return this.strategia();
    }
}
