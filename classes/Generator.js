export class Generator {
  static color() {
    let hue = Math.floor(Math.random() * 360);
    let pastel = `hls(${hue}, 100%, 85%)`;
    return pastel;
  }
  static integerRandomNumber(intervallo) {
    return Math.floor(Math.random() * intervallo);
  }
}
