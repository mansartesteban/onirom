import Engine from "@gameengine/Core/Engine";
import Map from "@gameengine/Core/Map";
import Vector2 from "@gameengine/Lib/Geometry/Vector2";

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

        return Mouse.getMapCoordinates();
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

    /**
     * Transform a coordinates on map to match screen display
     * @param coordinates To coordinates to be converted
     * @returns The converted coordinates
     */
    static getScreenCoordinates(): Vector2 {
        Map.isInitilized();
        return this.#position;
    }

    /**
     * Transform a coordinates on screen display to match map
     * @param coordinates To coordinates to be converted
     * @returns The converted coordinates
     */
    static getMapCoordinates(): Vector2 {
        Map.isInitilized();
        return this.#position
            .copy()
            .sub(new Vector2(Engine.datas.canvas.clientWidth / 2, Engine.datas.canvas.clientHeight / 2))
            .add(Map.origin);
    }

}

export default Mouse;