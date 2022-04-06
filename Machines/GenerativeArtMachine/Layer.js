// probabilmente basta creare i veri elementi durante lo

import { Size } from '../Classes/Size';

// scandaglio del folder, durante la creazione della folder structure.
export class Layer {
  constructor(name, path, collection) {
    this.name = name;
    this.path = path;
    this.collection = collection;
    this.class;
    this.size = new Size();
  }
  // copiato da versione precedente dovrebbe servire per
  // creare un elemento con le informazioni per il drawer:
  // posizione e size del canvas
  static makeLayer = (layer) => {
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
}
