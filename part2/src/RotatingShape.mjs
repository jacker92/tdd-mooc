export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape.replaceAll(" ", "");
  }

  rotateRight() {
    const transposed = this.transpose90Degrees();
    const transposedString = this.joinTransposedArray(transposed);

    return new RotatingShape(transposedString);
  }

  joinTransposedArray(transposed) {
    return transposed.map((x) => x.join("")).join("\n");
  }

  transpose90Degrees() {
    const splitted = this.shape.split("\n");

    return splitted[0]
      .split("")
      .map((_, index) => splitted.map((row) => row[index]).reverse());
  }

  toString() {
    return `${this.shape}\n`;
  }
}
