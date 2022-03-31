import { expect } from 'chai';
import { describe, it } from 'mocha';
import { GenerativeArtMachine } from '../../Machines/GenerativeArtMachine/GenerativeArtMachine.js';

let PROVA = 'prova';
let DESCRIZIONE = 'descrizione';
let URL = 'url';
let PATH =
  '/Users/WAW/Documents/Projects/zion-GenerativeArtMachine/input';

let prova = new GenerativeArtMachine(
  PROVA,
  DESCRIZIONE,
  URL,
  PATH
);

export let generativeArtMachine =
  describe('GenerativeArtMachine', () => {
    it('shall go', () => {
      console.log(prova);
    });
  });
