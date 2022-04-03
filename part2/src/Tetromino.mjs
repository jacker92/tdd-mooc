import { RotatingShape } from "../src/RotatingShape.mjs";
import { EMPTY } from "./Board.mjs";

export class Tetromino {
  currentOrientation;
  orientations;
  orientationCount;
  constructor(
    shapeStr,
    orientationCount,
    orientations,
    currentOrientation = 0
  ) {
    this.orientations = orientations || [];
    this.orientationCount = orientationCount;

    if (!orientations) {
      this.initializeOrientations(shapeStr, orientationCount);
    }

    this.currentOrientation =
      (currentOrientation + orientationCount) % orientationCount;
  }

  initializeOrientations(shapeStr, orientationCount) {
    let orientation = new RotatingShape(shapeStr.trim());
    for (let i = 0; i < orientationCount; i++) {
      this.orientations[i] = orientation;
      orientation = orientation.rotateRight();
    }
  }

  rotateLeft() {
    return new Tetromino(
      this.toString(),
      this.orientationCount,
      this.orientations,
      this.currentOrientation - 1
    );
  }

  rotateRight() {
    return new Tetromino(
      this.toString(),
      this.orientationCount,
      this.orientations,
      this.currentOrientation + 1
    );
  }

  hasCellAt(row, column) {
    return this.rows()[column] && this.rows()[column][row] && this.rows()[column][row] !== EMPTY;
  }

  cellAt(row, column) {
    console.log("Cell at", row, column, this.rows()[column][row])
    return this.rows()[column] && this.rows()[column][row] || EMPTY;
  }

  rows() {
    return this.orientations[this.currentOrientation].rows;
  }

  columns() {
    return this.orientations[this.currentOrientation].colums;
  }

  toString() {
    return this.orientations[this.currentOrientation].toString();
  }
}

Tetromino.T_SHAPE = new Tetromino(
  `.T.
TTT
...`,
  4
);

Tetromino.I_SHAPE = new Tetromino(
  `.....
     .....
     IIII.
     .....
     .....`,
  2
);

Tetromino.O_SHAPE = new Tetromino(
  `.OO
  .OO
  ...`,
  1
);

Tetromino.L_SHAPE = new Tetromino(
  `...
     LLL
     L..`,
  4
);

Tetromino.J_SHAPE = new Tetromino(
  `...
  JJJ
  ..J`,
  4
);

Tetromino.S_SHAPE = new Tetromino(
  `...
  .SS
  SS.`,
  2
);

Tetromino.Z_SHAPE = new Tetromino(
  `...
  ZZ.
  .ZZ`,
  2
);
