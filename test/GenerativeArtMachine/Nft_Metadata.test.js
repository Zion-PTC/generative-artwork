import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import { Nft_Metadata } from '../../Machines/GenerativeArtMachine/Nft_Metadata.js';
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

let name, description, image, external_url, attributes;
name = 'prova name';
description = 'nuova descrizione';
image = '/path/to/file';
external_url = 'http://external.url.com';
attributes = [];

const newNft_Metadata = new Nft_Metadata(
  name,
  description,
  image,
  external_url,
  attributes
);

describe(`Nft_Metadata Class`, () => {
  describe(`CONSTRUCTOR`, () => {
    it(`Dovrebbe avere una proprietà name: '${name}'`, () => {
      expect(newNft_Metadata.name).to.be.equal(name);
    });
    it(`Dovrebbe avere una proprietà description: '${description}'`, () => {
      expect(newNft_Metadata.description).to.be.equal(
        description
      );
    });
    it(`Dovrebbe avere una proprietà image: '${image}'`, () => {
      expect(newNft_Metadata.image).to.be.equal(image);
    });
    it(`Dovrebbe avere una proprietà external_url: '${external_url}'`, () => {
      expect(newNft_Metadata.external_url).to.be.equal(
        external_url
      );
    });
    it(`Dovrebbe avere una proprietà attributes: ${JSON.stringify(
      attributes
    )} che è un array vuoto.`, () => {
      expect(Array.isArray(attributes)).to.be.true;
      expect(attributes.length).to.be.equal(0);
    });
    it(`Dovrebbe tornare un array contenente un elemento, chiamando la static property nft_metadatas`, () => {
      expect(Nft_Metadata.nft_metadatas.length).to.be.equal(
        1
      );
    });
  });
  describe(`STATIC PROPERTIES`, () => {
    describe(`Property property name`, () => {
      it(`task description`, () => {});
    });
  });
  describe(`STATIC METHODS}`, () => {
    describe(`Method methodName`, () => {
      it(`task description`, () => {});
    });
  });
  describe(`INSTANCE PROPERTIES`, () => {
    describe(`Property property name`, () => {
      it(`task description`, () => {});
    });
  });
  describe(`INSTANCE METHODS}`, () => {
    describe(`Method methodName`, () => {
      it(`task description`, () => {});
    });
  });
});
