import { System } from '../System/System.js';
import { Rarity } from './Rarity.js';
import { Element } from './Element.js';
import { Layer } from './Layer.js';
import { zionUtil } from '/Users/WAW/Documents/Projects/telegram-bots/Classes/Utils.js';

export class Class {
  constructor(name, path, collection) {
    this.name = name;
    this.path = path;
    this.collection = collection;
    this.layers = [];
    this.rarities = [];
    this.elements = [];
    this.createLayers();
    this.createRarities(path);
    this.createElements();
  }
  // CLASS
  classExists() {}
  // LAYERS
  createLayers() {
    let layersName = System.arrayOfFoldersInDirectory(
      this.path
    );
    layersName.forEach((layerName) => {
      let newLayer = new Layer(
        layerName,
        `${this.path}/${layerName}`,
        this.collection
      );
      return this.layers.push(newLayer);
    });
  }
  // RARITIES
  createRarities(path) {
    let raritiesByLayers = [];
    this.layers.forEach((layer) => {
      let newRarityNames = System.arrayOfFoldersInDirectory(
        `${this.path}/${layer.name}`
      );
      newRarityNames.forEach((rarityName) => {
        let newRarity = new Rarity(
          rarityName,
          `${path}/${layer.name}/${rarityName}`,
          this.collection,
          this,
          layer
        );
        return this.rarities.push(newRarity);
      });
      return raritiesByLayers.push(newRarityNames);
    });
    if (this.haveAllLayersSameRarities(raritiesByLayers)) {
    } else {
      console.log(
        'Layers do not have the same Rarity Folders'
      );
    }
  }
  // ELEMENTS
  createElements() {
    this.rarities.forEach((rarity) => {
      let elements = System.arrayOfNamesOfFilesInFolder(
        `${this.path}/${rarity.layer.name}/${rarity.name}`
      );
      elements.forEach((element) => {
        this.elements.push(
          new Element(
            element.name,
            element.path,
            this.collection,
            this.name,
            rarity.layer,
            rarity.name
          )
        );
        return;
      });
      return;
    });
  }
  // CONTROL
  haveAllLayersSameRarities(arrayOfArrays) {
    let results = [];
    for (
      let index = 0;
      index < arrayOfArrays.length - 1;
      index++
    ) {
      const array = arrayOfArrays[index];
      const nextArray = arrayOfArrays[index + 1];

      if (zionUtil.checkArraysContent(array, nextArray)) {
        return results.push(true);
      } else {
        return results.push(false);
      }
    }
    if (!results.includes(false)) {
      return true;
    } else {
      return false;
    }
  }
  // GETTERS
  get raritiesSortedByLayer() {
    let obj = [];
    this.layers.forEach((layer) => {
      let layerObj = {};
      layerObj['name'] = layer.name;
      this.rarities
        .filter((rarity) => {
          return rarity.layer.name === layer.name;
        })
        .forEach((rarityOfLayer) => {
          return (layerObj[rarityOfLayer.name] =
            rarityOfLayer.elementCounts);
        });
      return obj.push(layerObj);
    });
    return obj;
  }
  get raritySet() {
    let raritySet = new Set();
    this.rarities.forEach((rarity) => {
      return raritySet.add(rarity.name);
    });
    return raritySet;
  }
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
  get possibleCombinationsOfClass() {
    let array = [];
    let obj = this.possibleCombinationsPerRarity;
    this.raritySet.forEach((rarity) => {
      let value = obj[rarity];
      return array.push(value);
    });
    array = array.reduce((p, c) => p + c);
    return array;
  }
}
