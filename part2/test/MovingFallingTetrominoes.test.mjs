import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

const moveAllTheWayToTheLeft = (board) => {
  executeTenTimes(() => board.moveLeft())
};

const moveAllTheWayToTheRight = (board) => {
  executeTenTimes(() => board.moveRight())
};

const executeTenTimes = (toExecute) => {
  for (let i = 0; i < 10; i++) {
    toExecute();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveAllTheWayToTheLeft(board);

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  xit("it cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveAllTheWayToTheRight(board);

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  xit("it cannot be moved down beyond the board (will stop falling)", () => {});

  xit("it cannot be moved left through other blocks", () => {});

  xit("it cannot be moved right through other blocks", () => {});

  xit("it cannot be moved down through other blocks (will stop falling)", () => {});
});
