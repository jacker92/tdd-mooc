export class Board {
  width;
  height;
  block = false;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop() {
    this.block = true;
  }

  toString() {
    if (this.block) {
      return `.X.\n...\n...\n`;
    }
    return `...\n...\n...\n`;
  }
}
