import Grid from "@gameengine/Lib/Grid";
import Vector2 from "@gameengine/Lib/Geometry/Vector2";

type _MapOptions = {
  size?: Vector2;
  tileSize?: number;
};

class Map {
  static #size: Vector2 = new Vector2();
  static #origin: Vector2 = new Vector2();
  static offset: Vector2 = new Vector2();
  static zoom: number = 1;
  static initialized: Boolean = false;

  static displayed: Boolean = false;
  static canvasContext: CanvasRenderingContext2D;

  static grid: Grid = new Grid();

  static isInitilized() {
    if (!Map.initialized) {
      throw "Map class has not been initialized";
    }
  }

  static initialize(
    canvasContext: CanvasRenderingContext2D,
    options: _MapOptions
  ) {
    if (options.size) {
      Map.#size = options.size;
      Map.#origin = new Vector2();
    }
    Map.canvasContext = canvasContext;
    Map.grid.size = Map.size.copy();
    Map.grid.tileSize = options.tileSize || 15;
    Map.initialized = true;
  }

  static get size() {
    return Map.#size;
  }

  static set size(size: Vector2) {
    Map.#size = size;
    Map.grid.size = size;
  }

  static get origin() {
    return Map.#origin;
  }

  static set origin(origin: Vector2) {
    Map.#origin = origin;
    Map.grid.origin = origin;
  }

  /**
   * Get the maximum x coordinate displayed on screen
   */
  static get xMax(): number {
    Map.isInitilized();
    return (Map.size.x - this.origin.x) / 2;
  }
  /**
   * Get the maximum y coordinate displayed on screen
   */
  static get yMax(): number {
    Map.isInitilized();
    return (Map.size.y - this.origin.y) / 2;
  }

  /**
   * Get the minimum x coordinate displayed on screen
   */
  static get xMin(): number {
    Map.isInitilized();
    return -(Map.size.x + this.origin.x) / 2;
  }
  /**
   * Get the minimum y coordinate displayed on screen
   */
  static get yMin(): number {
    Map.isInitilized();
    return -(Map.size.y + this.origin.y) / 2;
  }

  /**
   * Display a grid helper with (0,0) origin (center of the screen)
   * @param ctx CanvasRenderingContext2D
   */
  static displayGrid(state: Boolean = true) {
    Map.isInitilized();
    Map.displayed = state;
  }

  static drawGrid() {
    Map.isInitilized();
    Map.grid.draw(Map.canvasContext);
  }

  static update() {
    Map.isInitilized();
    if (Map.displayed) {
      Map.drawGrid();
    }
  }

}

export default Map;
