import MathUtils from "../../Utils/Math";

class Rotation {

    #angle: number;

    constructor(angle: number = 0, asRadian: Boolean = false) {
        this.#angle = asRadian ? angle : MathUtils.degreesToRadians(angle);
    }

    get angle() {
        return this.#angle;
    }
    set angle(angle: number) {
        this.#angle = angle;
    }

    get toRadians() {
        return this.angle;
    }
    get toDegrees() {
        return MathUtils.radiansToDegrees(this.angle);
    }

    add(rotation: Rotation) {
        return new Rotation(this.angle + rotation.angle, true);
    }

    sub(rotation: Rotation) {
        return new Rotation(this.angle - rotation.angle, true);
    }

    invert() {
        this.#angle = -this.angle;
        return this;
    }

}

export default Rotation;