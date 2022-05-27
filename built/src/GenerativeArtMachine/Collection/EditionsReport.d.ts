import { IEdition } from '../Edition';
export declare class EditionsReport {
    #private;
    collection: string;
    createdEditions: IEdition[];
    elementsReport: {
        [key: string]: number;
    };
    set elementUsage(elementUsage: string);
    get createdEditionsAmount(): number | undefined;
    get elementsReportEntries(): [string, number][];
    get alphapeticalReport(): [string, number][];
    get percentageReport(): [string, number][];
    constructor(collection: string, createdEditions?: IEdition[], elementsReport?: {
        [key: string]: number;
    });
}
