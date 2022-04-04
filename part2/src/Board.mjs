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

    this.initializeFallingBlockValues(block);
  }

  moveLeft() {
    if (!this.hasBlockOnLeft()) {
      this.fallingBlockColumn--;
    }
  }

  moveRight() {
    if(!this.hasBlockOnRight()) {
      this.fallingBlockColumn++;
    }
  }

  moveDown() {
    this.tick();
  }

  hasBlockOnLeft() {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (!this.fallingBlock.hasCellAt(x, y)) {
          continue;
        }
        const cX = x - 1 + this.fallingBlockColumn;
        const cY = y + this.fallingBlockRow;
        if (this.hasStationaryPieceAt(cX, cY)) {
          return true;
        }

        const hasFallingBlockPiece = this.fallingBlock.hasCellAt(cX, cY);
        const newMoveWillBeOutOfBounds = cX - 1 < 0;

        if (hasFallingBlockPiece && newMoveWillBeOutOfBounds) {
          return true;
        }
      }
    }
    return false;
  }

  hasBlockOnRight() {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (!this.fallingBlock.hasCellAt(x, y)) {
          continue;
        }
        const cX = x + 1 + this.fallingBlockColumn;
        const cY = y + this.fallingBlockRow;

        if (this.hasStationaryPieceAt(cX, cY)) {
          return true;
        }

        const hasFallingBlockPiece = this.fallingBlock.hasCellAt(x, y);
        const newMoveWillBeOutOfBounds = cX + 1 > this.width + 1;

        if (hasFallingBlockPiece && newMoveWillBeOutOfBounds) {
          return true;
        }
      }
    }
    return false;
  }

  hasStationaryPieceAt(x, y) {
    if(!this.stationary[x]) {
      return false
    }
    return this.stationary[x][y] !== EMPTY;
  }

  initializeFallingBlockValues(block) {
    this.fallingBlock = block;
    this.fallingBlockRow = 0;
    this.fallingBlockColumn = Math.round(this.width / 2) - 1;
  }

  hasFalling() {
    return this.fallingBlock != null;
  }

  hasReachedLastRow() {
    return this.fallingBlockRow === this.height - 1;
  }

  fallingShouldStop() {
    return (
      this.hasReachedLastRow() ||
      this.hasStationaryPieceAt(
        this.fallingBlockColumn,
        this.fallingBlockRow + 1
      )
    );
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }

    if (this.fallingShouldStop()) {
      this.setStationaryValues();
    }

    this.fallingBlockRow++;
  }

  setStationaryValues() {
    for (let y = -1; y < this.fallingBlock.size(); y++) {
      for (let x = 0; x < this.width; x++) {
        const adjustedX = this.calculateXInGrid(x);
        const adjustedY = this.calculateYInGrid(y);
        const cell = this.fallingBlock.cellAt(adjustedX, adjustedY);
        if (cell !== EMPTY) {
          this.stationary[x][this.fallingBlockRow + y] = cell;
        }
      }
    }
    this.fallingBlock = null;
  }

  isCurrentlyFallingBlock(x, y) {
    return (
      this.fallingBlock &&
      this.fallingBlock.hasCellAt(x, y - this.fallingBlockRow)
    );
  }

  calculateXInGrid(x) {
    return x - this.fallingBlockColumn + 1;
  }

  calculateYInGrid(y) {
    return y + this.fallingBlock.size() - 1;
  }

  toString() {
    let result = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const adjustedX = this.calculateXInGrid(x);
        if (
          !this.hasStationaryPieceAt(x, y) &&
          this.isCurrentlyFallingBlock(adjustedX, y)
        ) {
          result += this.fallingBlock.cellAt(
            adjustedX,
            y - this.fallingBlockRow
          );
          continue;
        }
        result += this.stationary[x][y];
      }

      result += "\n";
    }
    return result;
  }
}
