import Map from "../Map";
import Vector2 from "../Maths/Vector2";

/**
 * A helper class which handle the mouse positioning on screen or map
 */
class Mouse {

    static #position: Vector2;
    static #initialized: Boolean = false;

    static #onMoveCallbacks: Function[] = [];
    static #onClickCallbacks: Function[] = [];

    static initialize() {
        Mouse.#position = new Vector2();
        window.addEventListener("mousemove", (e) => {
            Mouse.#position.x = e.x;
            Mouse.#position.y = e.y;
            Mouse.#onMoveCallbacks.forEach((element: Function) => element(e));
        });
        window.addEventListener("click", (e) => {
            Mouse.#onClickCallbacks.forEach((element: Function) => element(e));
        });
        Mouse.#initialized = true;
    }

    static isInitialized() {
        if (!Mouse.#initialized) {
            throw "Mouse class has not been initialized";
        }
    }

    /**
     * Returns the current position of the mouse on the map
     */
    static get position(): Vector2 {
        Mouse.isInitialized();

        return Map.getMapCoordinates(Mouse.#position);
    }

    /**
     * Returns the position of the mouse on the screen
     */
    static get getScreenPosition(): Vector2 {
        return Mouse.#position;
    }

    /**
     * Returns the current x position of the mouse on the map
     */
    static get x(): number {
        Mouse.isInitialized();

        return Mouse.position.x;
    }

    /**
     * Returns the current y position of the mouse on the map
     */
    static get y(): number {
        Mouse.isInitialized();

        return Mouse.position.y;
    }

    /**
     * Apply a callback when the mousemove event is tiggered
     * @param callback The callback to execute on trigger
     */
    static onMove(callback: Function) {
        Mouse.isInitialized();

        Mouse.#onMoveCallbacks.push(callback);
    }

    static onClick(callback: Function) {
        Mouse.isInitialized();

        Mouse.#onClickCallbacks.push(callback);
    }

}

export default Mouse;