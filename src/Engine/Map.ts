import { _EngineDatasTransport, _Updatable } from "..";
import Color from "./Color";
import Line from "./Draw/Line";
import Vector2 from "./Maths/Vector2";

type _MapOptions = {
    size?: Vector2;
};

class Map {

    static size: Vector2 = new Vector2();
    static origin: Vector2 = new Vector2();
    static offset: Vector2 = new Vector2();
    static zoom: number = 1;
    static initialized: Boolean = false;

    static displayed: Boolean = false;
    static canvasContext: CanvasRenderingContext2D;

    static isInitilized() {
        if (!Map.initialized) {
            throw "Map class has not been initialized";
        }
    }

    static initialize(canvasContext: CanvasRenderingContext2D, options: _MapOptions) {
        if (options.size) {
            Map.size = options.size;
            Map.origin = Map.size.copy().divide(2);
        }
        Map.canvasContext = canvasContext;
        Map.initialized = true;
    }

    /**
     * Get the maximum x coordinate displayed on screen
     */
    static get xMax(): number {
        Map.isInitilized();
        return Map.size.x / 2;
    }
    /**
     * Get the maximum y coordinate displayed on screen
     */
    static get yMax(): number {
        Map.isInitilized();
        return Map.size.y / 2;
    }

    /**
     * Get the minimum x coordinate displayed on screen
     */
    static get xMin(): number {
        Map.isInitilized();
        return -Map.size.x / 2;
    }
    /**
     * Get the minimum y coordinate displayed on screen
     */
    static get yMin(): number {
        Map.isInitilized();
        return -Map.size.y / 2;
    }

    /**
     * Display a grid helper with (0,0) origin (center of the screen)
     * @param ctx CanvasRenderingContext2D
     */
    static displayGrid() {
        Map.isInitilized();
        Map.displayed = true;
    }

    static drawGrid() {
        Map.isInitilized();

        let originX = new Vector2(Map.xMin, 0);
        let toX = new Vector2(Map.xMax, 0);

        let lineX = new Line(originX, toX, Color.DarkGrey, [2, 4]);
        lineX.draw(Map.canvasContext);

        let originY = new Vector2(0, Map.yMin);
        let toY = new Vector2(0, Map.yMax);

        let lineY = new Line(originY, toY, Color.DarkGrey, [2, 4]);
        lineY.draw(Map.canvasContext);
    }

    static update() {
        Map.isInitilized();
        if (Map.displayed) {
            Map.drawGrid();
        }
    }

    /**
     * Transform a coordinates on map to match screen display
     * @param coordinates To coordinates to be converted
     * @returns The converted coordinates
     */
    static getScreenCoordinates(coordinates: Vector2 = new Vector2()): Vector2 {
        Map.isInitilized();
        return coordinates.copy().multiply(new Vector2(1, -1)).add(Map.size.copy().divide(2));
    }

    /**
     * Transform a coordinates on screen display to match map 
     * @param coordinates To coordinates to be converted
     * @returns The converted coordinates
     */
    static getMapCoordinates(coordinates: Vector2 = new Vector2()): Vector2 {
        Map.isInitilized();
        return coordinates.copy().sub(Map.size.copy().divide(2)).multiply(new Vector2(1, -1));
    }

}

export default Map;