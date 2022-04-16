import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { GeneratorMachine } from '../../Machines/GeneratorMachine.js';

const testRunner = new Mocha({ slow: 1000 });
testRunner.suite.emit(
  'pre-require',
  global,
  'nofile',
  testRunner
);
var suiteRun = testRunner.run();
process.on('exit', (code) => {
  process.exit(suiteRun.stats.failures > 0);
});
let log = zionUtil.debuglog('log');

let arrayOfArrays = [
  [1, 2, 3, 4, 5, 6],
  [2, 4, 5, 3, 5, 9],
  [3, 3, 6, 5, 4, 10],
  [3, 3, 6, 6, 8],
  [3, 3, 6, 6, 8],
  [3, 3, 6, 6, 8],
  [3, 4, 6, 6, 8],
];

function areEqual(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every((element, index) => {
      if (element === array2[index]) {
        return true;
      }

      return false;
    });
  }

  return false;
}

function areEqualNoOrder(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every((element) => {
      if (array2.includes(element)) {
        return true;
      }

      return false;
    });
  }

  return false;
}
let joinArraysToString = (A = [], B = []) => {
  let arr = [];
  let aToString = `${A.toString()}`;
  let bToString = `${B.toString()}`;
  let string = `[${aToString},${bToString}]`;
  arr.push(string);
  return arr;
};

let arrayOfArrayElementsToString = (arrayOfArrays = []) => {
  let jointArrays = [];
  arrayOfArrays.forEach((e) => {
    e.reduce((p, c) => {
      return jointArrays.push(joinArraysToString(p, c));
    });
  });
  return jointArrays;
};

export let GeneratorMachineTest =
  describe(`GENERATOR MACHINE`, () => {
    describe(`COMBINATOR CLASS`, () => {
      describe(`Method changePosition()`, () => {
        let testArray = [];
        Object.assign(testArray, arrayOfArrays[0]);
        let sourceIndex = 0;
        let sourceElement = testArray[sourceIndex];
        let targetIndex = 1;
        let targetElement = testArray[targetIndex];
        let changePositionExpectedResult = [
          2, 1, 3, 4, 5, 6,
        ];
        let array =
          it(`Dato l'array: [${testArray}] dovrebbe spostare l'elemento che: ${sourceElement} che occupa la posizini ${sourceIndex}, al posto dell'elemento ${targetElement}, che si trova alla posizione ${targetIndex}. Il risultato atteso è: [${changePositionExpectedResult}].`, () => {
            let arrayBefore = [];
            Object.assign(arrayBefore, testArray);
            GeneratorMachine.Combinator.changePosition(
              testArray,
              sourceIndex,
              targetIndex
            );
            let arrayAfter = testArray;
            log(arrayBefore);
            log(arrayAfter);
            expect(
              areEqual(arrayBefore, arrayAfter)
            ).to.be.equal(false);
            expect(
              areEqual(
                changePositionExpectedResult,
                arrayAfter
              )
            ).to.be.equal(true);
          });
      });
      describe(`Method popFirst()`, () => {
        let testArray = [];
        Object.assign(testArray, arrayOfArrays[0]);
        let sourceIndex = 0;
        let sourceElement = testArray[sourceIndex];
        let popFirstExpectedResult = [2, 3, 4, 5, 6];
        it(`Dato l'array: [${testArray}] dovrebbe tagliare il primo elemento: ${sourceElement} che occupa la posizion ${sourceIndex}, il cui risultato atteso è: [${popFirstExpectedResult}]`, () => {
          let arrayBefore = [];
          Object.assign(arrayBefore, testArray);
          log(arrayBefore);
          GeneratorMachine.Combinator.popFirst(testArray);
          log(testArray);
          expect(
            areEqual(testArray, popFirstExpectedResult)
          ).to.be.equal(true);
        });
      });
      describe(`Method combineArrays()`, () => {
        let A = [1, 2];
        let B = [1, 2];
        let combineArraysExpectedResult = [
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
        ];
        it(`Dato l'array A: [${A}], e l'array B: [${B}], dovrebbe ritornare un array con tutte le combinzazioni possibili fra ogni elemento di A e ogni elemento di B: ${arrayOfArrayElementsToString(
          combineArraysExpectedResult
        )}`, () => {
          let combined =
            GeneratorMachine.Combinator.combineArrays(A, B);
          log(combined);
          log(combineArraysExpectedResult);
          let responses = combined.map((element, index) => {
            if (
              areEqual(
                element,
                combineArraysExpectedResult[index]
              )
            ) {
              return true;
            } else {
              return false;
            }
          });
          log(responses);
          expect(responses.includes(false)).to.be.equal(
            false
          );
        });
      });
      describe(`Method generateCombinations()`, () => {
        let expectedNOfCombinations = 135000;
        it(`task description`, () => {
          let expectedCombinations = (() => {
            let arrayOfLenghts = [];
            arrayOfArrays.forEach((e) => {
              arrayOfLenghts.push(e.length);
            });
            log(arrayOfLenghts);
            let res = arrayOfLenghts.reduce(
              (p, c) => p * c
            );
            return res;
          })();
          log(expectedCombinations);
          let combinations =
            GeneratorMachine.Combinator.generateCombinations(
              arrayOfArrays
            );
          expect(combinations.length).to.be.equal(
            expectedNOfCombinations
          );
        });
      });
    });
  });
