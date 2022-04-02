import { RotatingShape } from "../src/RotatingShape.mjs";

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
