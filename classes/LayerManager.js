import { System } from './System.js';

export class LayerManager {
  constructor(
    importMetaUrl,
    width,
    heigth,
    sourceFolderName
  ) {
    this.sourcePath = `${System.pathOfFileFromImportMetaUrl(
      importMetaUrl
    )}/${sourceFolderName}`;

    this.layersName = System.arrayOfFoldersInDirectory(
      this.sourcePath
    );
    this.width = width;
    this.heigth = heigth;
    this.layers = this.layersName.map((layerName) => {
      return this.makeLayer(layerName);
    });
  }
  makeLayer = (layer) => {
    let foldersInLayerFolder =
      System.arrayOfFoldersInDirectory(
        `${this.sourcePath}/${layer}`
      );
    let elements = {};
    foldersInLayerFolder.forEach((folderInLayerFolder) => {
      elements[folderInLayerFolder] =
        System.arrayOfNamesOfFilesInFolder(
          `${this.sourcePath}/${layer}/${folderInLayerFolder}`
        );
    });
    return {
      elements,
      position: { x: 0, y: 0 },
      size: {
        width: this.width,
        heigth: this.heigth,
      },
    };
  };
}
