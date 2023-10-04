import { _Drawable } from "../..";
import Color from "../Color";
import Rotation from "../Maths/Rotation";
import Vector2 from "../Maths/Vector2";
import Draw from "./Draw";

class Circle implements _Drawable {

    #position: Vector2;
    #radius: number;
    #color: Color;
    #angle: Rotation;
    #direction: Vector2;

    constructor(position: Vector2 = new Vector2(), radius: number = 1, color: Color = new Color(), angle: Rotation = new Rotation(Math.PI * 2, true), direction: Vector2 = new Vector2()) {
        this.#position = position;
        this.#radius = radius;
        this.#color = color;
        this.#angle = angle;
        this.#direction = direction;
    }

    get position() {
        return this.#position;
    }

    get radius() {
        return this.#radius;
    }

    get color() {
        return this.#color;
    }

    get angle() {
        return this.#angle;
    }

    get direction() {
        return this.#direction;
    }

    set position(position: Vector2) {
        this.#position = position;
    };
    set radius(radius: number) {
        this.#radius = radius;
    };
    set color(color: Color) {
        this.#color = color;
    };
    set angle(angle: Rotation) {
        this.#angle = angle;
    };
    set direction(direction: Vector2) {
        this.#direction = direction;
    }


    draw(ctx: CanvasRenderingContext2D) {

        Draw.draw(ctx, () => {

            ctx.fillStyle = this.#color._toString;

            ctx.arc(
                this.position.x,
                this.position.y,
                this.#radius,
                this.#direction.rotation.angle - this.#angle.angle / 2,
                this.#direction.rotation.angle + this.#angle.angle / 2,
            );
            if (this.#angle.angle % (2 * Math.PI) !== 0) {
                ctx.lineTo(this.position.x, this.position.y);
            }

            ctx.fill();
            return ["fillStyle"];
        });

    }
}

export default Circle;