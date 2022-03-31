export class RotatingShape {
  shape;
  rows;

  constructor(shape) {
    this.shape = shape.replaceAll(" ", "");
    this.rows = this.shape.split("\n")
  }

  rotateLeft() {
    const transposed = this.transpose90DegreesCounterclockwise();
    return this.createNewRotatingShape(transposed)
  }

  rotateRight() {
    const transposed = this.transpose90Degrees();
    return this.createNewRotatingShape(transposed);
  }

  transpose90Degrees() {
    return this.rows.map((_, index) => this.rows.map((row) => row[index]).reverse());
  }

  transpose90DegreesCounterclockwise() {
    const reversedRows = this.rows.map(x => x.split("").reverse().join(''))
    return reversedRows.map((_, index) => reversedRows.map((row) => row[index]));
  }

  createNewRotatingShape(transposed) {
    const transposedString = this.joinTransposedArray(transposed);
    return new RotatingShape(transposedString);
  }

  joinTransposedArray(transposed) {
    return transposed.map((x) => x.join("")).join("\n");
  }

  toString() {
    return `${this.shape}\n`;
  }
}
