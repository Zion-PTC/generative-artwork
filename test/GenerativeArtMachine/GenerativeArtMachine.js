import { expect } from 'chai';
import { describe, it } from 'mocha';
import { GenerativeArtMachine } from '../../Machines/GenerativeArtMachine/GenerativeArtMachine.js';
import { log } from '../../Machines/index.js';
import { System } from '../../Machines/System/System.js';

import { zionUtil } from '../../telegram-bots/Classes/Utils.js';
import { GenerativeArtMachine } from './GenerativeArtMachine/GenerativeArtMachine.js';

let PROVA = 'prova';
let DESCRIZIONE = 'descrizione';
let URL = 'url';
let PATH =
  '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/input';
let MACHINESPATH =
  '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/Machines/GenerativeArtMachine/Machines';

let log = zionUtil.debuglog('log');

// let prova = new GenerativeArtMachine(
//   PROVA,
//   DESCRIZIONE,
//   URL,
//   PATH
// );

export let generativeArtMachine =
  describe('GenerativeArtMachine', async () => {
    // CREAZIONE MACHINE E COLLEZIONE
    describe('CREAZIONE MACHINE E COLLEZIONE', () => {
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
      log(gotekMachine.collections[0]);
    });

    // describe('machineExists()', () => {
    //   it('ciao', () => {
    //     let contentOfMachinesPath =
    //       System.arrayOfFoldersInDirectory(MACHINESPATH);
    //     console.log(contentOfMachinesPath);
    //   });
    // });
  });
