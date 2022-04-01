export class RotatingShape {
  shape;
  rows;
  distinctOrientations;

  constructor(shape, distinctOrientations = 4) {
    this.shape = shape.replaceAll(" ", "");
    this.rows = this.shape.split("\n");
    this.distinctOrientations = distinctOrientations
  }

  rotateLeft() {
    if(this.distinctOrientations === 2) {
     return this.rotateRight();
    }

    const transposed = this.transpose90DegreesCounterclockwise(this.rows);
    return this.createNewRotatingShape(transposed);
  }

  rotateRight() {
     const transposed = this.transpose90Degrees(this.rows)
      return this.createNewRotatingShape(transposed)
  }

  transpose90Degrees(rows) {
  return  rows.map((_, index) =>
      rows.map((row) => row[index]).reverse()
    );
  }

  transpose90DegreesCounterclockwise(rows) {
    const reversedRows = rows.map((x) => x.split("").reverse().join(""));
    return reversedRows.map((_, index) =>
      reversedRows.map((row) => row[index])
    );
  }

  createNewRotatingShape(transposed) {
    const joinedArray = this.joinTransposedArray(transposed)
    return new RotatingShape(joinedArray);
  }

  joinTransposedArray(transposed) {
    return transposed.map((x) => x.join("")).join("\n");
  }

  toString() {
    return `${this.shape}\n`;
  }
}
