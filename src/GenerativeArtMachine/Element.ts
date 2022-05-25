import { Canvas, Image } from '@zionrepack/canvas';
import { IClass } from './Class.js';
import { LoadedImage } from './Drawer.js';
import { ILayer } from './Layer.js';
import { Position, IPosition } from './Position.js';
import { IRarity, Rarity } from './Rarity.js';
import { SystemEntity, ISystemEntity } from './SystemEntity.js';

export interface IElement
  extends ISystemEntity<IElement | IRarity | ILayer | IClass> {
  extension: string;
  fileSize: number;
  position: IPosition;
  loadedImageIndex: number;
  description: string;
  loadedImage?: LoadedImage;
}

// se il tipo di collezion ha tipologia di posizionamento ad
// elemento vuol dire che ogni elemento puo avere una sua
// posizione nel canvas.
// se il tipo di collezione ha tipologia di posizionamento a
// layer, vuol dire che il posizionamento dell'elemento è
// uguale a quello del layer.
export class Element
  extends SystemEntity<Element | Rarity | ILayer | IClass>
  implements IElement
{
  position: Position;
  loadedImageIndex: number;
  extension: string;
  fileSize: number;
  description: string;
  loadedImage?: LoadedImage;
  constructor(
    name: string,
    path: string,
    type: number,
    width: number,
    height: number,
    extension: string,
    fileSize: number,
    description: string,
    loadedImageIndex: number
  ) {
    super(name, path, type, width, height);
    this.position = new Position(0, 0);

    this.loadedImageIndex = loadedImageIndex;
    this.extension = extension;
    this.fileSize = fileSize;

    this.description = description;
  }
}
