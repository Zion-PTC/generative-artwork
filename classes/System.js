import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as readline from 'readline';
let terminalInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
terminalInterface.close();
// console.log(terminalInterface);
// terminalInterface.question(`What's your name?`, (name) => {
//   console.log(`Hi ${name}!`);
//   terminalInterface.close();
// });

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
  /**
   * @title createNestedDir
   * @note funzione per creare una serie di cartelle
   * @param {String} dir
   */
  static createNestedDir(dir) {
    //example './tmp/but/then/nested';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}
