import { IClass } from './Class.js';
import { LoadedImage } from './Drawer.js';
import { ILayer } from './Layer.js';
import { Position, IPosition } from './Position.js';
import { IRarity, Rarity } from './Rarity.js';
import { SystemEntity, ISystemEntity } from './SystemEntity.js';
export interface IElement extends ISystemEntity<IElement | IRarity | ILayer | IClass> {
    extension: string;
    fileSize: number;
    position: IPosition;
    loadedImageIndex: number;
    description: string;
    loadedImage?: LoadedImage;
}
export declare class Element extends SystemEntity<Element | Rarity | ILayer | IClass> implements IElement {
    position: Position;
    loadedImageIndex: number;
    extension: string;
    fileSize: number;
    description: string;
    loadedImage?: LoadedImage;
    constructor(name: string, path: string, type: number, width: number, height: number, extension: string, fileSize: number, description: string, loadedImageIndex: number);
}
