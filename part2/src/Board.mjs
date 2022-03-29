export class Board {
  width;
  height;
  fallingBlock;
  fallingBlockRow;
  falling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(block) {
    if (this.fallingBlock) {
      throw new Error("already falling");
    }
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
    if (this.hasFalling()) {
      if (this.fallingBlockRow === this.height - 1) {
        this.falling = false;
        return;
      }
      this.fallingBlockRow++;
    }
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
