export class Board {
  width;
  height;
  fallingBlock;
  fallingBlockRow;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(block) {
    this.fallingBlock = block;
    this.fallingBlockRow = 0;
  }

  tick() {
    this.fallingBlockRow++;
  }

  toString() {
    let result = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.fallingBlock && this.fallingBlockRow === i && j === 1) {
          result += "X";
          continue;
        }
        result += ".";
      }

      result += "\n";
    }
    return result;
  }
}
