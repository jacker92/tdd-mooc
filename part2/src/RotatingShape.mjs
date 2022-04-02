export class RotatingShape {
  shape;
  rows;

  constructor(shape) {
    this.shape = shape.replaceAll(" ", "");
    this.rows = this.shape.split("\n");
  }

  rotateLeft() {
    const transposed = this.transpose90DegreesCounterclockwise(this.rows);
    return this.createNewRotatingShape(transposed);
  }

  rotateRight() {
    const transposed = this.transpose90Degrees(this.rows);
    return this.createNewRotatingShape(transposed);
  }

  transpose90Degrees(rows) {
    return rows.map((_, index) => rows.map((row) => row[index]).reverse());
  }

  transpose90DegreesCounterclockwise(rows) {
    const reversedRows = rows.map((x) => x.split("").reverse().join(""));
    return reversedRows.map((_, index) =>
      reversedRows.map((row) => row[index])
    );
  }

  createNewRotatingShape(transposed) {
    const joinedArray = this.joinTransposedArray(transposed);
    return new RotatingShape(joinedArray);
  }

  joinTransposedArray(transposed) {
    return transposed.map((x) => x.join("")).join("\n");
  }

  toString() {
    return `${this.shape}\n`;
  }
}
