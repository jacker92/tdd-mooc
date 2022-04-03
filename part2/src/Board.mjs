export const EMPTY = ".";

export class Board {
  width;
  height;
  fallingBlock;
  fallingBlockRow;
  fallingBlockColumn;
  stationary;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.stationary = this.initializeStationaryArray();
  }

  initializeStationaryArray() {
    return new Array(this.width)
      .fill(EMPTY)
      .map(() => new Array(this.height).fill(EMPTY));
  }

  drop(block) {
    if (this.fallingBlock) {
      throw new Error("already falling");
    }

    this.fallingBlock = block;
    this.fallingBlockRow = 0;
    this.fallingBlockColumn = (Math.round(this.width / 2)) -1;
  }

  hasFalling() {
    return this.fallingBlock != null;
  }

  hasReachedLastRow() {
    return this.fallingBlockRow === this.height - 1;
  }

  otherBlockStopsMovement() {
    return this.stationary[1][this.fallingBlockRow + 1] !== EMPTY;
  }

  fallingShouldStop() {
    return this.hasReachedLastRow() || this.otherBlockStopsMovement();
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    if (this.fallingShouldStop()) {
      this.stationary[1][this.fallingBlockRow] = this.fallingBlock.color;
      this.fallingBlock = null;
      return;
    }
    this.fallingBlockRow++;
  }

  isCurrentlyFallingBlock(x, y) {
    return this.fallingBlock && this.fallingBlockRow === y && this.fallingBlock.hasCellAt(x, y - this.fallingBlockRow);
  }

  toString() {
    let result = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const adjustedX = x - this.fallingBlockColumn + 1;
        if (this.isCurrentlyFallingBlock(adjustedX, y)) {
          result += this.fallingBlock.cellAt(adjustedX, y - this.fallingBlockRow);
          continue;
        }
        result += this.stationary[x][y];
      }

      result += "\n";
    }
    return result;
  }
}
