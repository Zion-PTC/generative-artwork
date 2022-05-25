export interface ISize {
    get width(): number;
    get height(): number;
    set width(width: number);
    set height(height: number);
    get ratio(): string;
    get stringRatio(): string;
}
export declare class Size implements ISize {
    #private;
    static get sizes(): Size[];
    get width(): number;
    set width(width: number);
    get height(): number;
    set height(height: number);
    get ratio(): string;
    get stringRatio(): string;
    constructor(width?: number, height?: number);
}
