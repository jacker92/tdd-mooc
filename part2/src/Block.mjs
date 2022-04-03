export class Block {
  color;
  rows;

  constructor(color) {
    this.color = color;
    const shape = 
    `.${color}.\n...\n...`
    this.rows =  shape.split("\n");
  }

  hasCellAt(row, column) {
    return column === 1;
  }

  cellAt(row, column) {
    return this.rows[row][column]
  }


}
