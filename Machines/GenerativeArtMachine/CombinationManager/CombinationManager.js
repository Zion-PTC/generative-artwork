import { System } from '../../../classes/System.js';
import { Layer } from '../Collection/Edition/Class/Layer/Layer.js';
import { Rarity } from '../Collection/Rarity/Rarity.js';

export class CombinationManager {
  constructor() {
    this.rarities = [];
    this.possibleCombinations = [];
  }
  //System
  getLayers() {
    return System.arrayOfFoldersInDirectory(path);
  }
  getRaritiesOfLayers() {}
  //__Controls
  haveAllLayersSameRarities() {}

  pickRandomPossibility() {}
  pickSpecificPossibility() {}
  calculatePossibleCombinations() {}
}
