export class CollectionManagers {
  constructor() {}
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
}
