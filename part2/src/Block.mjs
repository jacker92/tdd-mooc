import { EMPTY } from "./Board.mjs";

export class Block {
  color;
  rows;

  constructor(color) {
    this.color = color;
    const shape = `.${color}.\n...\n...`;
    this.rows = shape.split("\n");
  }

  hasCellAt(column, row) {
    return column === 1;
  }

  cellAt(row, column) {
    return (this.rows[column] && this.rows[column][row]) || EMPTY;
  }
}
