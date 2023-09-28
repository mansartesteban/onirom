import Vector2 from "../Engine/Maths/Vector2";
import Entity from "./Entity";

class Body extends Entity {

    #position: Vector2;
    #velocity: Vector2;

    constructor(position: Vector2 = new Vector2(), velocity: Vector2 = new Vector2()) {
        super();
        this.#position = position;
        this.#velocity = velocity;
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

export default Body;