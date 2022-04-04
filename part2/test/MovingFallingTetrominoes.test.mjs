import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

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

    xit("a falling tetromino can be moved right", () => {
        
    });

    xit("a falling tetromino can be moved down", () => {
        
    });

    xit("it cannot be moved left beyond the board", () => {
        
    });

    xit("it cannot be moved right beyond the board", () => {
        
    });

    xit("it cannot be moved down beyond the board (will stop falling)", () => {
        
    });

    xit("it cannot be moved left through other blocks", () => {
        
    });

    xit("it cannot be moved right through other blocks", () => {
        
    });

    xit("it cannot be moved down through other blocks (will stop falling)", () => {
        
    });

});