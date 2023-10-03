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

        let tileSize = 22;
        let horizontalTileSize = Math.floor(Map.size.x / tileSize - 1);
        let veritcalTileSize = Math.floor(Map.size.y / tileSize - 1);

        for (let i = -horizontalTileSize / 2;i < horizontalTileSize / 2 + 1;i++) {
            let color = Color.Grey;
            color.opacity = 0.2;
            if (i % 5 === 0) {
                color.opacity = .5;
            }
            if (i === horizontalTileSize / 2 - horizontalTileSize / 2) {
                color.opacity = 1;
            }
            let line = new Line(new Vector2(i * tileSize, this.yMin), new Vector2(i * tileSize, this.yMax), color, []);
            line.draw(Map.canvasContext);
        }
        for (let i = -veritcalTileSize / 2;i < veritcalTileSize / 2 + 1;i++) {
            console.log("i", i);
            let color = Color.Grey;
            color.opacity = .2;
            if (i % 5 === 0) {
                color.opacity = .5;
            }
            if (i === 0) {
                color.opacity = 1;
            }
            let line = new Line(new Vector2(this.xMin, i * tileSize), new Vector2(this.xMax, i * tileSize), color, []);
            line.draw(Map.canvasContext);
        }

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