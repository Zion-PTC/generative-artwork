import { IDna } from '../Dna.js';

export class CollectionReport {
  constructor(
    public name: string,
    public classes: [number, string][],
    public rarities: [number, string][],
    public layers: [number, string][],
    public elements: [number, string][],
    public possibleCombinations: {
      perRarity: { [key: string]: number };
      totali: number;
    },
    public supply: number,
    public extractableCombinations: IDna[]
  ) {}
}
