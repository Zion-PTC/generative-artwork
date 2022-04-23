import * as IPFS from 'ipfs';
import * as IPFSCORE from 'ipfs-core';
import * as IPFSHTTP from 'ipfs-http-client';
import all from 'it-all';

// IPFS.CID;
// IPFS.CID.apply;
// IPFS.CID.asCID;
// IPFS.CID.create;
// IPFS.CID.createV0;
// IPFS.CID.createV1;
// IPFS.CID.decode;
// IPFS.CID.decodeFirst;
// IPFS.CID.inspectBytes;
// IPFS.CID.isCID;
// IPFS.CID.parse;
// IPFS.PeerId;
// IPFS.PeerId.create;
// IPFS.PeerId.createFromB58String;
// IPFS.PeerId.createFromBytes;
// IPFS.PeerId.createFromCID;
// IPFS.PeerId.createFromHexString;
// IPFS.PeerId.createFromJSON;
// IPFS.PeerId.createFromPrivKey;
// IPFS.PeerId.createFromProtobuf;
// IPFS.PeerId.createFromPubKey;
// IPFS.create;
// IPFS.crypto;
// IPFS.crypto.aes;
// IPFS.crypto.hmac;
// IPFS.crypto.keys;
// IPFS.crypto.pbkdf2;
// IPFS.crypto.randomBytes;
// IPFS.globSource;
// IPFS.isIPFS;
// IPFS.isIPFS.base32cid;
// IPFS.isIPFS.cid;
// IPFS.isIPFS.cidPath;
// IPFS.isIPFS.ipfsPath;
// IPFS.isIPFS.ipfsSubdomain;
// IPFS.isIPFS.ipfsUrl;
// IPFS.isIPFS.ipnsPath;
// IPFS.isIPFS.ipnsSubdomain;
// IPFS.isIPFS.ipnsUrl;
// IPFS.isIPFS.multiaddr;
// IPFS.isIPFS.multihash;
// IPFS.isIPFS.path;
// IPFS.isIPFS.pathGatewayPattern;
// IPFS.isIPFS.pathPattern;
// IPFS.isIPFS.peerMultiaddr;
// IPFS.isIPFS.subdomain;
// IPFS.isIPFS.subdomainGatewayPattern;
// IPFS.isIPFS.url;
// IPFS.isIPFS.urlOrPath;
// IPFS.multiaddr;
// IPFS.multiaddr.fromNodeAddress;
// IPFS.multiaddr.isMultiaddr;
// IPFS.multiaddr.isName;
// IPFS.multiaddr.protocols;
// IPFS.multiaddr.resolvers;
// IPFS.path;
// IPFS.urlSource;

// IPFSCORE.CID;
// IPFSCORE.PeerId;
// IPFSCORE.create;
// IPFSCORE.crypto;
// IPFSCORE.globSource;
// IPFSCORE.isIPFS;
// IPFSCORE.multiaddr;
// IPFSCORE.urlSource;

// IPFSHTTP.CID;
// IPFSHTTP.create;
// IPFSHTTP.globSource;
// IPFSHTTP.multiaddr;
// IPFSHTTP.urlSource;

class FileObject {
  constructor() {
    this.patht;
    this.content;
    this.mode;
    this.mtime;
  }
}
// one of the following types: Uint8Array | Blob | String |
// Iterable<Uint8Array> | Iterable<number> |
// AsyncIterable<Uint8Array> | ReadableStream<Uint8Array>
class FileContent {}

class AddOptions {
  constructor() {
    this.chunker;
    this.cidVersion;
    this.hashAlg;
    this.onlyHash;
    this.pin;
    this.progress;
    this.rawLeaves;
    this.trickle;
    this.wrapWithDirectory;
    this.timeout;
    this.signal;
  }
}

class Options {
  constructor(
    host,
    port,
    protocol,
    headers,
    timeout,
    apiPath,
    url,
    ipld,
    agent
  ) {
    this.host;
    this.port;
    this.protocol;
    this.headers;
    this.timeout;
    this.apiPath;
    this.url;
    this.ipld;
    this.agent;
  }
}

class AddResponse {
  constructor(cid, mode, mtime, path, size) {
    this.cid;
    this.mode;
    this.mtime;
    this.path;
    this.size;
  }
}

export class ZionIpfs {
  constructor() {
    this.id = `I'm going to be coool`;
    this.ipfs = this.#createIpfs();
  }
  async #createIpfs() {
    return IPFSHTTP.create({
      host: '192.168.1.23',
      port: '5001',
    });
  }
  async getCID(entry) {
    // let {
    //   add,
    //   addAll,
    //   bases,
    //   bitswap,
    //   block,
    //   bootstrap,
    //   cat,
    //   codecs,
    //   commands,
    //   config,
    //   dag,
    //   dht,
    //   diag,
    //   dns,
    //   files,
    //   get,
    //   hashers,
    //   id,
    //   ipns,
    //   isOnline,
    //   key,
    //   log,
    //   ls,
    //   mount,
    //   name,
    //   object,
    //   pin,
    //   ping,
    //   preload,
    //   pubsub,
    //   refs,
    //   repo,
    //   resolve,
    //   start,
    //   stats,
    //   stop,
    //   swarm,
    //   version,
    // } = await this.ipfs;
    // let {} = await dns().
    // let { cid, mode, mtime, path, size } = await add();
    // let {} = addAll();
    // let {
    //   at,
    //   charAt,
    //   charCodeAt,
    //   codePointAt,
    //   concat,
    //   endsWith,
    //   includes,
    //   indexOf,
    //   lastIndexOf,
    //   localeCompare,
    //   match,
    //   matchAll,
    //   normalize,
    //   padEnd,
    //   padStart,
    //   repeat,
    //   replace: replaceDns,
    //   search,
    //   slice,
    //   split,
    //   startsWith,
    //   substring,
    //   toLocaleLowerCase,
    //   toLocaleUpperCase,
    //   toLowerCase,
    //   toString,
    //   toUpperCase,
    //   trim,
    //   trimEnd,
    //   trimStart,
    //   valueOf,
    // } = await dns();
    // let {} = get()
    // let {
    //   addresses,
    //   agentVersion,
    //   id: idId,
    //   protocolVersion,
    //   protocols,
    //   publicKey,
    // } = await id();
    // let {} = isOnline();
    // let {} = ls()
    // let {} = await mount()
    // let {} = ping();
    // let {
    //   at,
    //   charAt,
    //   charCodeAt,
    //   codePointAt,
    //   concat,
    //   endsWith,
    //   includes,
    //   indexOf,
    //   lastIndexOf,
    //   localeCompare,
    //   match,
    //   matchAll,
    //   normalize,
    //   padEnd,
    //   padStart,
    //   repeat,
    //   replace: replaceResolve,
    //   search,
    //   slice,
    //   split,
    //   startsWith,
    //   substring,
    //   toLocaleLowerCase,
    //   toLocaleUpperCase,
    //   toLowerCase,
    //   toString,
    //   toUpperCase,
    //   trim,
    //   trimEnd,
    //   trimStart,
    //   valueOf,
    // } = await resolve();
    // let {} = await start()
    // let {} = await stop()
    // let
    // {commit,golang,repo,system,version,"interface-ipfs-core","ipfs-core","ipfs-http-client"}=await
    // version()
    // let {} = dht;
    // let {} = diag;
    // let {} = files;
    // let {} = hashers;
    // let {} = ipns;
    // // let {export,gen:genKey,import:imporrtKey,info,list:listKey,rename,rm:rmKey} = key;
    // let {} = log;
    // let {} = name;
    // let {} = object;
    // let {} = preload;
    // let {} = pubsub;
    // let {} = refs;
    // let {} = repo;
    // let {} = stats;
    // let {} = swarm;
    // let {
    //   addBase,
    //   _basesByName,
    //   _basesByPrefix,
    //   _loadBase,
    //   getBase,
    //   listBases,
    //   removeBase,
    // } = bases;
    // let { stat, unwant, wantlist, wantlistForPeer } =
    //   bitswap;
    // let {
    //   get: getBlock,
    //   put,
    //   rm: rmBlock,
    //   stat: blockBlock,
    // } = block;
    // let {
    //   add: addBootstrap,
    //   clear,
    //   list,
    //   reset,
    //   rm: rmBootstrap,
    // } = bootstrap;
    // let {
    //   addCodec,
    //   getCodec,
    //   listCodecs,
    //   removeCodec,
    //   _codecsByCode,
    //   _codecsByName,
    //   _loadCodec,
    // } = codecs;
    // let {
    //   get: getConfig,
    //   getAll,
    //   profiles,
    //   replace,
    //   set,
    // } = config;
    // let {
    //   export: exportDag,
    //   get: getDag,
    //   put: putDat,
    //   resolve: resolveDag,
    // } = dag;
    // let {
    //   add: pinAdd,
    //   addAll: pinAddAll,
    //   ls: pinLs,
    //   remote,
    //   rm,
    //   rmAll,
    // } = pin;
    // let CID = (await this.ipfs).add(
    //   'This is the first CID on ZION/TNL Server'
    // );
    // const res = await getAll();
    // let pinRes = await (
    //   await this.ipfs
    // ).pin.add(
    //   'QmWHajrrRF4ktRkC4GouAcoa7ijPAiczDhUiZaJ8m34nB8'
    // );
    // let res = all((await this.ipfs).pin.ls());
    // let res = (await this.ipfs).swarm.peers();
    // let res = await (await this.ipfs).pin.ls();
    // let res = (await this.ipfs).cat(
    //   'ipfs://QmWHajrrRF4ktRkC4GouAcoa7ijPAiczDhUiZaJ8m34nB8'
    // );
    let res = await (await this.ipfs).id(); // /ip4/192.168.1.23/udp/4001/quic/p2p/12D3KooWDoCMiUv6m3rEV6cBP3eBqrpP1hyhLaot5einSUtCeQki

    return res;
  }
}
// https://ipfs.io/ipfs/QmZV4Yg9HyX5EnHJfi5KJxEy4MjdYQ9y2i8u8uxm721bWN?filename=QmZV4Yg9HyX5EnHJfi5KJxEy4MjdYQ9y2i8u8uxm721bWN
