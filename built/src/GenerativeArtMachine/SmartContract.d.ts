export interface ISmartContract {
    name: string;
    symbol: string;
    get supply(): number;
    set supply(supply: number);
    get type(): number;
    set type(type: number);
}
export declare class SmartContract {
    #private;
    name: string;
    symbol: string;
    baseURI: URL;
    description: string;
    constructor(name: string, symbol: string, supply: number, baseURI: URL, description: string);
    get supply(): number;
    set supply(supply: number);
    get type(): unknown;
    set type(type: unknown);
}
