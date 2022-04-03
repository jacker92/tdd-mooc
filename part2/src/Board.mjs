export const EMPTY = ".";

export class Board {
  width;
  height;
  fallingBlock;
  fallingBlockRow;
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
    return this.fallingBlock && this.fallingBlockRow === x && this.fallingBlock.hasCellAt(x - this.fallingBlockRow,y);
  }

  toString() {
    let result = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.isCurrentlyFallingBlock(i, j)) {
          result += this.fallingBlock.cellAt(i - this.fallingBlockRow, j);
          continue;
        }
        result += this.stationary[j][i];
      }

      result += "\n";
    }
    return result;
  }
}
