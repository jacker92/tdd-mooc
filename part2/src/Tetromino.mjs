import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {

  shape;
  constructor(shapeStr) {
    this.shape = new RotatingShape(shapeStr.trim());
  }

  rotateLeft() {
    const newShape = this.shape.rotateLeft();
    return new Tetromino(newShape.toString())
  }

  rotateRight() {
    const newShape = this.shape.rotateRight();
    return new Tetromino(newShape.toString());
  }

  toString() {
    return this.shape.toString()
  }
}

Tetromino.T_SHAPE = new Tetromino(
`.T.
TTT
...`
);

Tetromino.I_SHAPE = new Tetromino(
    `.....
     .....
     IIII.
     .....
     .....`
);
