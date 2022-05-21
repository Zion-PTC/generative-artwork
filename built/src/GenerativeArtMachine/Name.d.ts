export interface IName {
    get name(): string;
    get description(): string;
    get nameAndDescription(): string;
    set name(name: string);
    set description(description: string);
}
export declare class Name {
    #private;
    constructor(name: string, description: string);
    get name(): string;
    get description(): string;
    get nameAndDescription(): string;
    set name(name: string);
    set description(description: string);
}
