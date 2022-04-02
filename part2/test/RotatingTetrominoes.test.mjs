import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateLeft();
  }
  console.log("Distinct orientations: ", distinct);
  return distinct;
}

describe("The T shape", () => {
  const shape = Tetromino.T_SHAPE;

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.T.
       TTT
       ...`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T.
       .TT
       .T.`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T.
       TT.
       .T.`
    );
  });

  it("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});

describe("The I shape", () => {
  const shape = Tetromino.I_SHAPE;

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.....
       .....
       IIII.
       .....
       .....`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..I..
       ..I..
       ..I..
       ..I..
       .....`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..I..
       ..I..
       ..I..
       ..I..
       .....`
    );
  });

  it("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});

describe("The O shape", () => {
  const shape = Tetromino.O_SHAPE;

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});

describe("The L shape", () => {
  const shape = Tetromino.L_SHAPE;

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
    `...
     LLL
     L..`
    );
  });

  xit("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  xit("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});

describe("The J shape", () => {
  const shape = Tetromino.J_SHAPE;

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
    `...
     JJJ
     ..J`
    );
  });

  xit("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  xit("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});

describe("The S shape", () => {
  const shape = Tetromino.S_SHAPE;

  xit("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
    `...
     JJJ
     ..J`
    );
  });

  xit("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  xit("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});


describe("The Z shape", () => {
  const shape = Tetromino.Z_SHAPE;

  xit("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
    `...
     JJJ
     ..J`
    );
  });

  xit("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  xit("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  it("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});