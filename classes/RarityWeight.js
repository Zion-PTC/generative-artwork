export class RarityWeight {
  constructor(name, from, to, percentage) {
    this.name = name;
    this.from = from;
    this.to = to;
    this.percentage = percentage;
  }
}

class Rarity {
  constructor() {
    this.type;
    this.rarityWeights = [];
  }
}

class RarityById {
  constructor() {
    this.type = 'rarityById';
    this.rarityWeights = [];
  }
}

class RarityManager {
  constructor() {
    this.types = [
      'rarityById', // one rarity for all layers
      'oneRarityPerLayer', // every layer has a different rarity
      'rarityByElement', // every elements have a his own rarity
      'rarityByClass',
    ];
  }
}
