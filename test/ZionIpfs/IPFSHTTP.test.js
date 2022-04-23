import { expect } from 'chai';
import Mocha from 'mocha';
import { zionUtil } from '../../../telegram-bots/Classes/_Node Standard Modules/zionUtil.js';
import * as IPFSHTTP from 'ipfs-http-client';
import all from 'it-all';

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

const DOCKER = 'http://127.0.0.1:5002';
const PORT = '5001';

describe(`IPFSHTTP`, () => {
  it(`IPFSHTTP`, () => {
    log(IPFSHTTP);
  });
  describe(`IPFSHTTP.CID`, () => {
    it(`IPFSHTTP.CID`, () => {
      log(IPFSHTTP.CID);
    });
  });
  describe(`IPFSHTTP.create()`, () => {
    const HOST = 'http://127.0.0.1:5001';
    let wawipfs = IPFSHTTP.create(HOST);
    it(`crea un oggetto che rappresenta il nodo al quale ci si connette`, async () => {
      log(wawipfs);
    });
    let addedStringCID;
    let peerId;
    const add = wawipfs.add;
    const addAll = wawipfs.addAll;
    const bases = wawipfs.bases;
    const bitswap = wawipfs.bitswap;
    const block = wawipfs.block;
    const bootstrap = wawipfs.bootstrap;
    const cat = wawipfs.cat;
    const codecs = wawipfs.codecs;
    const commands = wawipfs.commands;
    const config = wawipfs.config;
    const dag = wawipfs.dag;
    const dht = wawipfs.dht;
    const diag = wawipfs.diag;
    const dns = wawipfs.dns;
    const files = wawipfs.files;
    const get = wawipfs.get;
    const getEndpointConfig = wawipfs.getEndpointConfig;
    const hashers = wawipfs.hashers;
    const id = wawipfs.id;
    const isOnline = wawipfs.isOnline;
    const key = wawipfs.key;
    const ipfslog = wawipfs.log;
    const ls = wawipfs.ls;
    const nout = wawipfs.mount;
    const name = wawipfs.name;
    const object = wawipfs.object;
    const pin = wawipfs.pin;
    const ping = wawipfs.ping;
    const refs = wawipfs.refs;
    const repo = wawipfs.repo;
    const resolve = wawipfs.resolve;
    const start = wawipfs.start;
    const stats = wawipfs.stats;
    const stop = wawipfs.stop;
    const swarm = wawipfs.swarm;
    const version = wawipfs.version;
    describe(`Method add()`, () => {
      it(`crea un CID Ipfs a partire dal dato fornito`, async () => {
        const STRING =
          'questa strina arriva di test effettuati da ZION su IPFS';
        let res = await add(STRING);
        addedStringCID = res;
        log(res);
      });
    });
    describe(`Method addAll()`, () => {
      it(`aggiunge un array di dati`, () => {
        // wawipfs.addAll()
      });
    });
    describe(`Property bases`, () => {
      const { getBase, listBases } = bases;
      it(`bases?`, () => {
        log(bases);
      });
    });
    describe(`Property bitswap`, () => {
      const { stat, unwant, wantlist, wantlistForPeer } =
        bitswap;
      it(`bitswap`, () => {
        log(bitswap);
      });
    });
    describe(`Property block`, () => {
      const { get, put, rm, stat } = block;
      it(`block`, () => {
        log(block);
      });
    });
    describe(`Property bootstrap`, async () => {
      const { add, clear, list, reset, rm } = bootstrap;
      it(`bootstrap`, async () => {
        log(bootstrap);
      });
    });
    describe(`Method cat()`, () => {
      it(`ritorna una lista di chunks in un Buffer`, async () => {
        let path = addedStringCID.path;
        let res = await all(cat(path));
        log(res);
      });
    });
    describe(`Property codecs`, () => {
      it(`ritorna un oggetto multicodecs contente una lista di codecs`, () => {
        const { getCodec, listCodecs } = codecs;
        log(codecs);
      });
    });
    describe(`Method commands()`, () => {
      it(`ritorna un oggetto contenente i comandi e i subcomandi di un'istanza di ipfs`, async () => {
        let res = await commands();
        log(res);
      });
    });
    describe(`Property config`, () => {
      it(`config`, () => {
        const {
          get,
          getAll,
          profiles: { apply, list },
          replace,
          set,
        } = config;
      });
    });
    describe(`Property dag`, () => {
      it(`dag`, () => {
        const {
          export: exportDag,
          get,
          import: importDag,
          put,
          resolve,
        } = dag;
      });
    });
    describe(`Property dht`, () => {
      it(`dht`, () => {
        const {
          findPeer,
          findProvs,
          get,
          provide,
          put,
          query,
        } = dht;
      });
    });
    describe(`Property diag`, () => {
      it(`diag`, () => {
        const { cmds, net, sys } = diag;
      });
    });
    describe(`Method dns()`, () => {
      it(`dns(), si aspetta un domain name`, async () => {
        // let res = await dns();
        // log(res);
      });
    });
    describe(`Property files`, () => {
      it(`files`, () => {
        const {
          chmod,
          cp,
          flush,
          ls,
          mkdir,
          mv,
          read,
          rm,
          stat,
          touch,
          write,
        } = files;
      });
    });
    describe(`Method get`, () => {
      it(`ritorna un Buffer`, async () => {
        let res = await all(get(addedStringCID.path));
        log(res);
      });
    });
    describe(`Method getEndpointConfig`, () => {
      it(`endpointConfig`, () => {
        let res = getEndpointConfig();
        const { host, port, pathname, protocol } = res;
        log(res);
      });
    });
    describe(`Property hashers`, () => {
      it(`hasers`, () => {
        const { getHasher, listHashers } = hashers;
      });
    });
    describe(`Method id()`, () => {
      it(`id()`, async () => {
        let res = await id();
        const {
          addresses,
          agentVersion,
          id: idId,
          protocolVersion,
          protocols,
          publicKey,
        } = res;
        peerId = idId;
        log(res);
      });
    });
    describe(`Method isOnline`, () => {
      it(`isOnline`, async () => {
        let res = await isOnline();
        log(res);
      });
    });
    describe(`Property key`, () => {
      it(`key`, () => {
        const {
          export: exportKey,
          gen,
          import: importKey,
          info,
          list,
          rename,
          rm,
        } = key;
      });
    });
    describe(`Property log`, () => {
      it(`ipflog`, () => {
        const { level, ls, tail } = ipfslog;
      });
    });
    describe(`Method ls()`, () => {
      it(`ls()`, async () => {
        let res = await all(ls(addedStringCID.path));
        const { name, path, size, cid, type } = res[0];
        log(res);
      });
    });
    describe(`Property name`, () => {
      it(`name`, () => {
        const { publish, pubsub, resolve } = name;
      });
    });
    describe(`Method nout()`, () => {
      it(`nout(), requires domain name`, async () => {
        // let res = await nout();
        // log(res);
      });
    });
    describe(`Property object`, () => {
      it(`object`, () => {
        const {
          data,
          get,
          links,
          new: newObject,
          patch: { addLink, appendData, rmLink, setData },
          put,
          stat,
        } = object;
      });
    });
    describe(`Property pin`, () => {
      it(`pin`, () => {
        const {
          add,
          addAll,
          ls,
          remote: {
            add: addRemote,
            ls: lsRemore,
            rm: rmRemote,
            rmAll: rmAllRemote,
            service: {
              add: addService,
              rm: rmService,
              ls: lsService,
            },
          },
          rm,
          rmAll,
        } = pin;
      });
    });
    describe(`Method ping()`, () => {
      it(`ping(), fa un ping su un altro peer, ci impiega almeno 12sec.`, async () => {
        //   const wawPeerId =
        //     '12D3KooWEcgWd4v59k2qMBdQPdnQYFP7hW4uRZTEzZ1yMTpi71Xh';
        //   const res = await all(ping(wawPeerId));
        //   log(res);
      }).timeout(12000);
    });
    describe(`Property refs`, () => {
      it(`refs`, async () => {
        const { local } = refs;
        const res = await all(local());
        log(res);
      });
    });
    describe(`Property repo`, () => {
      it(`repo`, () => {
        const { gc, stat, version } = repo;
      });
    });
    describe(`Method resolve()`, () => {
      it(`resolve(), requires name`, async () => {
        // let res = await resolve();
        // log(res);
      });
    });
    describe(`Method start()`, () => {
      it(`start(), non implementata`, async () => {
        // let res = await start();
        // log(res);
      });
    });
    describe(`Property stats`, () => {
      it(`stats`, () => {
        const { bitswap, bw, repo } = stats;
      });
    });
    describe(`Method stop()`, () => {
      it(`stop(), funziona perfettamente, ma la funzione start non è implementata`, async () => {
        // let res = await stop();
        // log(res);
      });
    });
    describe(`Property swarm`, () => {
      it(`swarm`, () => {
        const {
          addrs,
          connect,
          disconnect,
          localAddrs,
          peers,
        } = swarm;
      });
    });
    describe(`Method version()`, () => {
      it(`version()`, async () => {
        let res = await version();
        log(res);
      });
    });
  });
  describe(`IPFSHTTP.globSource()`, () => {
    const globSource = IPFSHTTP.globSource;
    it(`IPFSHTTP.globSource, richiede cwd, patter e options`, async () => {
      // const cwd = 'cwd';
      // const pattern = 'pattern';
      // const options = {};
      // let res = await all(
      //   globSource(cwd, pattern, options)
      // );
      // log(res);
    });
  });
  describe(`class multiaddr`, () => {
    it(`classe con cui creare un multiaddr`, () => {
      const multiaddr = IPFSHTTP.multiaddr;
      const {
        protocols: {
          lengthPrefixedVarSize,
          V,
          table,
          names,
          codes,
          object,
        },
        resolvers,
      } = multiaddr;
      let newMulti = new multiaddr(
        '/ip4/127.0.0.1/tcp/4001'
      );
      log(multiaddr);
      log(newMulti);
      const {
        bytes: {
          BYTES_PER_ELEMENT,
          at,
          buffer,
          byteLength,
          byteOffset,
          copyWithin,
          entries,
          every,
          subarray,
        },
        decapsulate,
        decapsulateCode,
        encapsulate,
        equals,
        getPath,
        getPeerId,
        inspect,
        isThinWaistAddress,
        nodeAddress,
        protoCodes,
        protoNames,
        protos,
        resolve,
        stringTuples,
        toJSON,
        toOptions,
        toString,
        tuples,
      } = newMulti;
    });
  });
  describe(`Method urlSource`, () => {
    it(`urlSource`, () => {
      // richiede un input URL
      const res = IPFSHTTP.urlSource(DOCKER);
      const { content, path } = res;
      log(res);
    });
  });
});
