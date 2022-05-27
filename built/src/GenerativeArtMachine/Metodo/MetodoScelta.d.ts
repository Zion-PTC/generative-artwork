export declare class MetodoScelta {
    #private;
    name?: string | undefined;
    metodoScelta?: Function | undefined;
    static get metodiScelta(): MetodoScelta[];
    static scegliMetodo(type: 'Edition' | 'Element'): MetodoScelta | undefined;
    constructor(name?: string | undefined, metodoScelta?: Function | undefined);
    assegnaMetodoScelta(metodo: Function): void;
    scegliElemento(): any;
}
