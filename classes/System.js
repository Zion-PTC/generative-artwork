import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export class System {
  static arrayOfFoldersInDirectory = (path) => {
    return fs
      .readdirSync(path, {
        withFileTypes: true,
      })
      .filter((directoryEntity) =>
        directoryEntity.isDirectory()
      )
      .map((directoryEntity) => directoryEntity.name);
  };
  static arrayOfNamesOfFilesInFolder = (path) => {
    return fs
      .readdirSync(path)
      .filter((item) => !/(^|\/)\.['\/\.]/g.test(item))
      .map((fileName) => {
        return {
          name: fileName.slice(0, -4),
          path: `${path}/${fileName}`,
        };
      });
  };
  static pathOfFileFromImportMetaUrl = (importMetaUrl) => {
    return `${dirname(fileURLToPath(importMetaUrl))}`;
  };
  static writeJson(targetPath, data) {
    fs.writeFileSync(targetPath, data);
  }
  static writePng(path, data) {
    return fs.writeFileSync(path, data);
  }
}
