/// <reference path='../node_modules/canvas/types/index.d.ts'/>

import * as Canvas from 'canvas';
type Image = Canvas.Image;

interface IAttribute {
  get trait_type(): string;
  set trait_type(trait_type: string);
  get value(): string;
  set value(value: string);
}
type Context = '2d';
interface ICanvasProperty {
  context: Context;
  size: ISize;
}
type CollectionType = 'Edition' | 'Element';
/**
 * @param id identificativo della collezione
 *
 */
interface ICollection extends ISmartContract {
  get id();
  set id(id: number);
  set type(type: CollectionType);
  get path(): string;
  set path(path: string);
  get type(): CollectionType;
  get outputPath(): string;
  set outputPath(outputPath: string);
  get drawer(): IDrawer;
  get rarities(): IRarity;
  get layers(): ILayer;
  get elements(): IElement;
  get classes(): IClass;
  get nodes(): ISystemEntity;
  get collectionPath(): string;
  get nodeNames(): string;
  get nodesIds(): number;
  get elementsByLayer(): IElement[];
  get elementsByLayerByRarity(): IElement[][];
  get possibiliDna(): IDna[];
  get possibiliDnaPerRarità(): IDna[][];
  hasDir(): boolean;
  creaDirectory(): ICollection;
  creaEdizione(classe: IClass): IEdition;
  creaEdizioneNVote(volte: number): IEdition[];
  creaTutteLeEdizioni(): IEdition[];
  //
}
interface IDna {
  get stringDna(): string;
  get dna(): IDna;
  set dna(dna: IDna);
  get dnaIds(): IDna[];
  haElemento(): boolean;
}
interface IDrawer {
  get canvasProperties(): ICanvasProperty;
  get canvas(): Canvas.Canvas;
  get loadedImages(): Image[];
  get collection(): ICollection;
  get ctx(): Canvas.CanvasRenderingContext2D;
  set canvasProperties(canvasProperties);
  set loadedImages(image);
  set collection(collection);
  randomBackground(): void;
  signImage(sig: string): void;
  loadImage(path: string): Image;
  drawImage(
    loadedImage: Buffer,
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
  getImageSize(): ISize;
  printImage();
}
interface ISize {
  get width(): number;
  get height(): number;
  set width(width: number);
  set height(height: number);
  get ratio(): number;
  get stringRatio(): string;
}
interface IPosition {
  get x(): number;
  get y(): number;
  set x(x: number);
  set y(y: number);
}
interface ISystemEntity {
  name: string;
  path: string;
  type;
  size: ISize;
  listaDiLati: ISystemEntity[];
  connettiA<T>(entity: T): T;
  trovaLatiAdiacenti<T>(): T[];
  èConnessoA<T>(entity: T): boolean;
  èConnessoAeA<T>(entity1: T, entity2: T): boolean;
}
interface IClass extends ISystemEntity {}
interface IEdition extends ISystemEntity {
  drawEdition(): void;
}
interface ILayer extends ISystemEntity {}
interface IElement extends ISystemEntity {
  extension: string;
  fileSize: number;
  position: IPosition;
  description: string;
}
interface IRarity extends ISystemEntity {
  from: number;
  to: number;
  percentage: number;
  get elementsByLayer(): IElement[];
  get possibiliDna(): IDna[];
  creaEdizione?(): IEdition;
  creaEdizioneNVolte?(): IEdition[];
  creaTutteLeEdizioni?(): IEdition[];
}
interface IName {
  get name(): string;
  get description(): string;
  get nameAndDescription(): string;
  set name(name: string);
  set description(description: string);
}
interface INft_Metadata extends IName {
  get nft_metadatas(): INft_Metadata[];
  set nft_metadatas(nft_metadatas: INft_Metadata[]);
  get image(): string;
  get external_url(): String;
  get attributes(): IAttribute[];
  set image(image: string);
  set attributes(attributes: IAttribute[]);
  èConnessoA(attributo: IAttribute): boolean;
}
/**
 * @param name Nome della collezione. Questo campo sarà il
 * campo che descrive la collezione sulla blockchain.
 * @param symbol Simbolo della collezione che verrà usato
 * per creare i token
 */
interface ISmartContract {
  name: string;
  symbol: string;
  get supply(): number;
  set supply(supply: number);
  get type(): string;
  set type(type: string);
}
interface IUser {
  createEdition();
  creaEdizioneConDnaSpecifico(dna);
  creaEdizioneSuccessiva();
  creaEdizioneSpecifica();
  creaEdizioni(from, to);
  editaEdizione(edizione);
  cercaEdizione(edizione);
  getEdizione(edizione);
  getBatchDiEdizioni();
  //
  creaCollezione(path, tipo);
  editaCollezione();
  cercaCollezione();
}
interface IUserInterface {
  makeQuestion(question);
  listenForAnswer();
  sendMessage(data, key);
}
