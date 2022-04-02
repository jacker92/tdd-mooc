import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {

  shape;
  currentOrientation;
  orientations;
  orientationCount;
  constructor(shapeStr, orientationCount, orientations, currentOrientation) {
    this.shape = new RotatingShape(shapeStr.trim());
    this.orientations = orientations || [];
    this.orientationCount = orientationCount;

    if (!orientations) {
      let orientation = new RotatingShape(shapeStr.trim())
      for (let i = 0; i < orientationCount; i++) {
        this.orientations[i] = orientation;
        orientation = orientation.rotateRight();
      }
    }

    if (currentOrientation) {
      this.currentOrientation = (currentOrientation + orientationCount) % orientationCount
    } else {
      this.currentOrientation = 0
    }
  }

  rotateLeft() {
    const newShape = this.shape.rotateLeft();
    return new Tetromino(newShape.toString(), this.orientationCount, this.orientations, this.currentOrientation - 1)
  }

  rotateRight() {
    const newShape = this.shape.rotateRight();
    return new Tetromino(newShape.toString(), this.orientationCount, this.orientations, this.currentOrientation + 1);
  }

  toString() {
    return this.orientations[this.currentOrientation].toString()
  }
}

Tetromino.T_SHAPE = new Tetromino(
  `.T.
TTT
...`, 4
);

Tetromino.I_SHAPE = new Tetromino(
  `.....
     .....
     IIII.
     .....
     .....`, 2
);
