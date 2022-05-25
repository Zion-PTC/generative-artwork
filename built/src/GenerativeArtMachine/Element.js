import { Position } from './Position.js';
import { SystemEntity } from './SystemEntity.js';
// se il tipo di collezion ha tipologia di posizionamento ad
// elemento vuol dire che ogni elemento puo avere una sua
// posizione nel canvas.
// se il tipo di collezione ha tipologia di posizionamento a
// layer, vuol dire che il posizionamento dell'elemento è
// uguale a quello del layer.
export class Element extends SystemEntity {
    position;
    loadedImageIndex;
    extension;
    fileSize;
    description;
    loadedImage;
    constructor(name, path, type, width, height, extension, fileSize, description, loadedImageIndex) {
        super(name, path, type, width, height);
        this.position = new Position(0, 0);
        this.loadedImageIndex = loadedImageIndex;
        this.extension = extension;
        this.fileSize = fileSize;
        this.description = description;
    }
}
