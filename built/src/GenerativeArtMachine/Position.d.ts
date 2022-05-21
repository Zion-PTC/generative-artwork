export interface IPosition {
    get x(): number;
    get y(): number;
    set x(x: number);
    set y(y: number);
}
export declare class Position {
    #private;
    constructor(x: number, y: number);
    static get positions(): Position[];
    get x(): number;
    get y(): number;
    set x(x: number);
    set y(y: number);
}
