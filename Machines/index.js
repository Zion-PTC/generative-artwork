import { zionUtil } from '../../telegram-bots/Classes/Utils.js';
import { GenerativeArtMachine } from './GenerativeArtMachine/GenerativeArtMachine.js';

export let log = zionUtil.debuglog('log');

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
