export class Board {
  width;
  height;
  fallingBlock;
  fallingBlockRow;
  falling;
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

    block.fallingBlockRow = 0;
    this.fallingBlock = block;
    this.fallingBlockRow = 0;
    this.falling = true;
  }

  hasFalling() {
    if (this.falling) {
      return true;
    }
    return false;
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    if (this.fallingBlockRow === this.height - 1) {
      this.falling = false;
      this.stationary[1][this.fallingBlockRow] = this.fallingBlock.color;
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
