import MathUtils from "@gameengine/Lib/Math";
import Color from "@gameengine/Lib/Color";
import Line from "@gameengine/Draw/Line";
import Text from "@gameengine/Draw/Text";
import Vector2 from "@gameengine/Lib/Geometry/Vector2";

type _GridOptions = {
  tileSize?: number;
  color?: Color;
  showCoordinates?: Boolean;
};

class Grid {
  #origin: Vector2;
  #size: Vector2;
  #tileSize: number;
  #zoom: number;
  #color: Color;
  showCoordinates: Boolean;

  constructor(
    origin: Vector2 = new Vector2(),
    size: Vector2 = new Vector2(),
    gridOptions: _GridOptions = {}
  ) {
    this.#origin = origin;
    this.#size = size;
    this.#tileSize = gridOptions.tileSize || 0;
    this.#color = gridOptions.color || Color.Grey;
    this.showCoordinates = gridOptions.showCoordinates || false;
    this.#zoom = 1;
  }

  get size() {
    return this.#size;
  }

  set size(size: Vector2) {
    this.#size = size;
  }

  get color() {
    return this.#color;
  }

  set color(color: Color) {
    this.#color = color;
  }

  get tileSize() {
    return this.#tileSize;
  }

  set tileSize(tileSize: number) {
    this.#tileSize = tileSize;
  }

  get origin() {
    return this.#origin;
  }

  set origin(origin: Vector2) {
    this.#origin = origin;
  }

  get width() {
    return this.#size.x;
  }

  set width(width: number) {
    this.#size.x = width;
  }

  get height() {
    return this.#size.y;
  }

  set height(height: number) {
    this.#size.y = height;
  }

  get zoom() {
    return this.#zoom;
  }

  set zoom(zoom: number) {
    this.#zoom = MathUtils.clamp(Math.round(zoom * 10) / 10, .1, 10);
  }

  /**
 * Get the maximum x coordinate displayed on screen
 */
  get xMax(): number {
    return this.width / 2;
  }
  /**
   * Get the maximum y coordinate displayed on screen
   */
  get yMax(): number {
    return this.height / 2;
  }

  /**
   * Get the minimum x coordinate displayed on screen
   */
  get xMin(): number {
    return -this.width / 2;
  }
  /**
   * Get the minimum y coordinate displayed on screen
   */
  get yMin(): number {
    return -this.height / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawHorizontaLines(ctx);
    this.drawVerticalLines(ctx);
  }

  drawHorizontaLines(ctx: CanvasRenderingContext2D) {

    let line = new Line(new Vector2(), new Vector2(), this.color, 1);
    let coordinatesDisplay = new Text("", new Vector2(), this.color);
    let drawCoordinates = false;

    let min = this.xMin + (this.origin.x - this.xMin) % (this.tileSize * this.zoom);
    for (let i = min;i < this.xMax;i += (this.tileSize * this.zoom)) {
      if (MathUtils.isBetween(i, this.xMin, this.xMax)) {
        i = MathUtils.num(i);
        line.from = new Vector2(i, this.yMin);
        line.to = new Vector2(i, this.yMax);

        coordinatesDisplay.text = MathUtils.num((i - this.origin.x) * (1 / this.zoom)).toString();
        coordinatesDisplay.position = line.from.copy().add(new Vector2(0, 12));
        drawCoordinates = false;

        // Origin axes
        if ((i - this.origin.x) === 0) {
          line.color.opacity = 1;
          drawCoordinates = true;
        }

        // Every 5 lines
        else if ((i - this.origin.x) % (5 * this.tileSize * this.zoom) === 0) {
          line.color.opacity = .5;
          drawCoordinates = true;
        }

        // Default
        else {
          line.color.opacity = .3;
        }

        this.showCoordinates && drawCoordinates && coordinatesDisplay.draw(ctx);
        line.draw(ctx);
      }
    }

  }

  drawVerticalLines(ctx: CanvasRenderingContext2D) {
    let line = new Line(new Vector2(), new Vector2(), this.color, 1);
    let coordinatesDisplay = new Text("", new Vector2(), this.color);
    let drawCoordinates = false;

    let min = this.yMin + (this.origin.y - this.yMin) % (this.tileSize * this.zoom);
    for (let i = min;i < this.yMax;i += (this.tileSize * this.zoom)) {
      if (MathUtils.isBetween(i, this.yMin, this.yMax)) {
        i = MathUtils.num(i);
        line.from = new Vector2(this.xMin, i);
        line.to = new Vector2(this.xMax, i);

        coordinatesDisplay.text = MathUtils.num((i - this.origin.y) * (1 / this.zoom)).toString();
        coordinatesDisplay.position = line.from.copy().add(new Vector2(30, 0));
        drawCoordinates = false;

        // Origin axes
        if ((i - this.origin.y) === 0) {
          line.color.opacity = 1;
          drawCoordinates = true;
        }

        // Every 5 lines
        else if ((i - this.origin.y) % (5 * this.tileSize * this.zoom) === 0) {
          line.color.opacity = .5;
          drawCoordinates = true;
        }

        // Default
        else {
          line.color.opacity = .3;
        }

        this.showCoordinates && drawCoordinates && coordinatesDisplay.draw(ctx);
        line.draw(ctx);
      }
    }
  }
}
export default Grid;
