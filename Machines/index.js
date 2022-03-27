import { GenerativeArtMachine } from './GenerativeArtMachine/GenerativeArtMachine.js';

let gotekMachine = new GenerativeArtMachine(
  'Gotek GenArt Machine',
  'This is my first GenArt Machine',
  'https://gotek.znft.tech',
  '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/input'
);

let propaganda = gotekMachine.createNewCollection(
  'Propaganga',
  ['basic']
);
console.log(propaganda.arrayOfClasses);

// console.log(
//   gotekMachine.collections[0].classes[0]
//     .raritiesSortedByLayer
// );
// console.log(
//   gotekMachine.collections[0].classes[0]
//     .elementCountsByRarity
// );
// console.log(
//   gotekMachine.collections[0].classes[0]
//     .possibleCombinationsPerRarity
// );
// console.log(
//   gotekMachine.collections[0].classes[0]
//     .possibleCombinationsOfClass
// );
