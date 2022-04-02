export class RotatingShape {
  shape;
  rows;
  columns

  constructor(shape) {
    this.shape = shape.replaceAll(" ", "");
    this.rows = this.shape.split("\n");
    this.columns = this.createColumns();
  }

  createColumns() {
   let columns = new Array(this.rows.length).fill('');
    this.rows.map(x => {
      for (let i = 0; i < x.length; i++) {
        const element = x[i];
        columns[i] += element + '\n';
      }
    });

    return columns;
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
