import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {}

Tetromino.T_SHAPE = new RotatingShape(
  `.T.
     TTT
     ...`
);

Tetromino.I_SHAPE = new RotatingShape(
  `.....
     .....
     IIII.
     .....
     .....`,
  2
);
