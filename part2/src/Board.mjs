export class Board {
  width;
  height;
  fallingBlock;
  fallingBlockRow;
  stationary;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.stationary = new Array(width)
      .fill(".")
      .map(() => new Array(height).fill("."));
  }

  drop(block) {
    if (this.fallingBlock) {
      throw new Error("already falling");
    }

    this.fallingBlock = block;
    this.fallingBlockRow = 0;
  }

  hasFalling() {
      return this.fallingBlock != null;
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    if (this.fallingBlockRow === this.height - 1) {
      this.stationary[1][this.fallingBlockRow] = this.fallingBlock.color;
      this.fallingBlock = null
      return;
    }
    this.fallingBlockRow++;
  }

  isCurrentlyFallingBlock(i, j) {
    return this.fallingBlock && this.fallingBlockRow === i && j === 1;
  }

  toString() {
    let result = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.isCurrentlyFallingBlock(i, j)) {
          result += this.fallingBlock.color;
          continue;
        }
        result += this.stationary[j][i];
      }

      result += "\n";
    }
    return result;
  }
}
