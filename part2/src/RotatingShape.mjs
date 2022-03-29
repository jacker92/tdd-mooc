export class RotatingShape {

    shape;
    constructor(shape) {
        console.log(shape )
this.shape = shape;
    }

    toString() {
        return `${this.shape.replaceAll(' ', '')}\n`
    }
}