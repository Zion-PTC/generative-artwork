export class Size {
  #width;
  #height;
  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }
  get width() {
    return this.#width;
  }
  get height() {
    return this.#height;
  }
  set width(width) {
    return (this.#width = width);
  }
  set height(height) {
    return (this.#height = height);
  }
}
