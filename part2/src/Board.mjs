export class Board {
  width;
  height;
  fallingBlock;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(block) {
    this.fallingBlock = block
  }

  toString() {
    if (this.fallingBlock) {
      return `.X.\n...\n...\n`;
    }
    return `...\n...\n...\n`;
  }
}
