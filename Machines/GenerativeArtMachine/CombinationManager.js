export class CombinationManager {
  constructor() {
    this.possibili;
    this.possibleCombinations;
  }
  //__Controls
  haveAllLayersSameRarities() {}

  pickRandomPossibility() {}
  pickSpecificPossibility() {}
  calculatePossibleCombinations() {}
  get elementCountsByRarity() {
    let setOfRarities = this.raritySet;
    let array = [];
    this.rarities.forEach((rarity) => {
      return setOfRarities.add(rarity.name);
    });
    setOfRarities.forEach((rarity) => {
      let obj = {};
      obj['name'] = rarity;
      this.raritiesSortedByLayer.filter((layer) => {
        obj[layer.name] = layer[rarity];
      });
      return array.push(obj);
    });
    return array;
  }
  get possibleCombinationsPerRarity() {
    let rarityObj = {};
    this.elementCountsByRarity.forEach((rarity) => {
      rarityObj[rarity.name] = [];
      this.layers.forEach((layer) => {
        rarityObj[rarity.name].push(rarity[layer.name]);
      });
      return (rarityObj[rarity.name] = rarityObj[
        rarity.name
      ].reduce((p, c) => p * c));
    });
    return rarityObj;
  }
}
