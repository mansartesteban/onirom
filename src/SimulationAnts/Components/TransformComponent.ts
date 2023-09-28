import Vector2 from "../../Engine/Maths/Vector2";
import Component from "../Components";

class TransformComponent extends Component {

    #position: Vector2 = new Vector2();
    #velocity: Vector2 = new Vector2();

    constructor(options?: Record<string, any>) {
        super();
        this.#position = options?.position;
        this.#velocity = options?.velocity;
    }

    get position() {
        return this.#position
    }

    set position(position) {
        this.#position = position;
    }

    get velocity() {
        return this.#velocity
    }

    set velocity(velocity) {
        this.#velocity = velocity;
    }
}

export default TransformComponent;