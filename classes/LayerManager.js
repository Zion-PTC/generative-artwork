import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

export class LayerManager {
  constructor(
    importMetaUrl,
    width,
    heigth,
    sourceFolderName
  ) {
    this.sourcePath =
      `${dirname(
        fileURLToPath(importMetaUrl)
      )}/${sourceFolderName}`
    this.layersName =
      fs.readdirSync(
        this.sourcePath,
        { withFileTypes: true }
      )
        .filter(
          directoryEntity => directoryEntity.isDirectory()
        )
        .map(
          directoryEntity => directoryEntity.name
        )
    this.width = width
    this.heigth = heigth
    this.layers = this.layersName.map(layerName => {
      return this.makeLayer(layerName)
    })
  }
  getElements = (path) => {
    return fs
      .readdirSync(path)
      .filter((item) => !/(^|\/)\.['\/\.]/g.test(item))
      .map(fileName => {
        return {
          name: fileName.slice(0, -4),
          path: `${path}/${fileName}`
        }
      })
  }
  makeLayer = (layer) => {
    return {
      elements: {
        original: this.getElements(`${this.sourcePath}/${layer}/original`),
        rare: this.getElements(`${this.sourcePath}/${layer}/rare`),
        super_rare: this.getElements(`${this.sourcePath}/${layer}/super_rare`),
      },
      position: { x: 0, y: 0 },
      size: { width: this.width, heigth: this.heigth }
    }
  }
}