export class CollectionReport {
    name;
    classes;
    rarities;
    layers;
    elements;
    possibleCombinations;
    supply;
    extractableCombinations;
    constructor(name, classes, rarities, layers, elements, possibleCombinations, supply, extractableCombinations) {
        this.name = name;
        this.classes = classes;
        this.rarities = rarities;
        this.layers = layers;
        this.elements = elements;
        this.possibleCombinations = possibleCombinations;
        this.supply = supply;
        this.extractableCombinations = extractableCombinations;
    }
}
