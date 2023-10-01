import Rotation from "../../Engine/Maths/Rotation";
import Vector2 from "../../Engine/Maths/Vector2";
import Component from "../Components";

class TransformComponent extends Component {

    #position: Vector2 = new Vector2();
    #velocity: Vector2 = new Vector2();
    #rotation: Rotation = new Rotation();

    constructor(options?: Record<string, any>) {
        super();
        this.#position = options?.position || new Vector2();
        this.#velocity = options?.velocity || new Vector2();
        this.#rotation = options?.rotation || new Rotation();
    }

    get position() {
        return this.#position;
    }

    set position(position: Vector2) {
        this.#position = position;
    }

    get velocity() {
        return this.#velocity;
    }

    set velocity(velocity: Vector2) {
        this.#velocity = velocity;
    }

    get rotation() {
        return this.#rotation;
    }

    set rotation(rotation: Rotation) {
        this.#rotation = rotation;
    }

    update() {
        this.position.add(this.velocity);
    }
}

export default TransformComponent;