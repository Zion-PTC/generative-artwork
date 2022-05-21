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
    constructor(width?: number, height?: number);
    static get sizes(): Size[];
    get width(): number;
    get height(): number;
    set width(width: number);
    set height(height: number);
    get ratio(): string;
    get stringRatio(): string;
}
