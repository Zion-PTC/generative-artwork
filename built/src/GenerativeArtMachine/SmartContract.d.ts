export interface ISmartContract {
    name: string;
    symbol: string;
    get supply(): number;
    set supply(supply: number);
    get type(): string;
    set type(type: string);
}
export declare class SmartContract {
    #private;
    name: string;
    symbol: string;
    baseURI: URL;
    description: string;
    get supply(): number;
    set supply(supply: number);
    get type(): string | undefined;
    set type(type: string | undefined);
    constructor(name: string, symbol: string, supply: number, baseURI: URL, description: string);
}
