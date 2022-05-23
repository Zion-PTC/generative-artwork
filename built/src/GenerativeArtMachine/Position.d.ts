export interface IPosition {
    get x(): number;
    get y(): number;
    set x(x: number);
    set y(y: number);
}
export declare class Position implements IPosition {
    #private;
    constructor(x: number, y: number);
    static get positions(): IPosition[];
    get x(): number;
    get y(): number;
    set x(x: number);
    set y(y: number);
}
