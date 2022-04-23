import * as IPFS from 'ipfs';
import * as IPFSCORE from 'ipfs-core';
import * as IPFSHTTP from 'ipfs-http-client';
import all from 'it-all';

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
    let res = await (await this.ipfs).id(); // /ip4/192.168.1.23/udp/4001/quic/p2p/12D3KooWDoCMiUv6m3rEV6cBP3eBqrpP1hyhLaot5einSUtCeQki

    return res;
  }
}
// https://ipfs.io/ipfs/QmZV4Yg9HyX5EnHJfi5KJxEy4MjdYQ9y2i8u8uxm721bWN?filename=QmZV4Yg9HyX5EnHJfi5KJxEy4MjdYQ9y2i8u8uxm721bWN
