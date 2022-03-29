import _ from 'lodash'

export class RotatingShape {
  shape;
  
  constructor(shape) {
    this.shape = shape;
  }

  rotateRight() {
    const s = this.shape.replaceAll(" ", "");
    const splitted = s.split("\n")
    let result = new Array(3).fill('.').map(() => new Array(3).fill('.'));
    for (let y = 0; y < splitted.length; y++) {
        for (let x = 0; x < splitted[y].length; x++) {
            result[x][y] = splitted[x][y]
        }
    }

    const transposed = result[0].map((_, index) => result.map(row => row[index]).reverse())
    const r = transposed.map(x => x.join('')).join('\n')

      return new RotatingShape(r)
  }

  toString() {
    return `${this.shape.replaceAll(" ", "")}\n`;
  }
}
