export interface IAttribute {
    get trait_type(): string;
    set trait_type(trait_type: string);
    get value(): string;
    set value(value: string);
}
export declare class Attribute implements IAttribute {
    #private;
    constructor(trait_type: string, value: string);
    get trait_type(): string;
    get value(): string;
    set trait_type(trait_type: string);
    set value(value: string);
}
