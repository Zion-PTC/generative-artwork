import { System } from '../Machines/System/System.js';

class Element {
  constructor() {
    this.name;
    this.path;
  }
}

class Rarity {
  constructor() {
    this.name;
    this.elements = [];
  }
}

class Layer {
  constructor() {
    this.name;
    this.path;
    this.rarities = [];
  }
}

class Class {
  constructor() {
    this.name;
    this.layers = [];
  }
}

export class LayerManager {
  constructor(
    width,
    heigth,
    importMetaUrl,
    sourceFolderName
  ) {
    this.width = width;
    this.heigth = heigth;
    this.sourcePath = this.makeSourcePath(
      importMetaUrl,
      sourceFolderName
    );
    this.layersName = System.arrayOfFoldersInDirectory(
      this.sourcePath
    );
    this.layers = this.layersName.map((layerName) => {
      return this.makeLayer(layerName);
    });
  }
  makeLayer = (layer) => {
    let raritiesOfLayer = System.arrayOfFoldersInDirectory(
      `${this.sourcePath}/${layer}`
    );
    let elementsByRarityOfLayer = {};
    raritiesOfLayer.forEach((folderInLayerFolder) => {
      elementsByRarityOfLayer[folderInLayerFolder] =
        System.arrayOfNamesOfFilesInFolder(
          `${this.sourcePath}/${layer}/${folderInLayerFolder}`
        );
    });
    return {
      elements: elementsByRarityOfLayer,
      position: { x: 0, y: 0 },
      size: {
        width: this.width,
        heigth: this.heigth,
      },
    };
  };
  makeSourcePath(importMetaUrl, sourceFolderName) {
    return `${System.pathOfFileFromImportMetaUrl(
      importMetaUrl
    )}/${sourceFolderName}`;
  }
}
