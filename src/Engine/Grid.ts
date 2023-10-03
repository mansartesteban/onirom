import Color from "./Color";
import Line from "./Draw/Line";
import Vector2 from "./Maths/Vector2";

class Grid {
  #size: Vector2;
  #tileSize: number;
  #color: Color;

  constructor(
    size: Vector2 = new Vector2(),
    tileSize: number = 0,
    color: Color = Color.Grey
  ) {
    this.#size = size;
    this.#tileSize = tileSize;
    this.#color = color;
  }

  get width() {
    return this.#size.x;
  }

  set width(witdh: number) {
    this.#size.x = witdh;
  }

  get height() {
    return this.#size.y;
  }

  set height(height: number) {
    this.#size.y = height;
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

  get tilesOnX() {
    let tilesOnX = this.width / this.#tileSize;
    return Math.ceil(tilesOnX - (tilesOnX % 2));
  }

  get tilesOnY() {
    let tilesOnY = this.height / this.#tileSize;
    return Math.ceil(tilesOnY - (tilesOnY % 2));
  }

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
    for (let i = -this.tilesOnX / 2; i < this.tilesOnX / 2 + 1; i++) {
      this.color.opacity = 0.3;
      if (i % 5 === 0) {
        this.color.opacity = 0.5;
      }
      if (i === 0) {
        this.color.opacity = 1;
      }
      let line = new Line(
        new Vector2(i * this.tileSize, this.yMin),
        new Vector2(i * this.tileSize, this.yMax),
        this.color
      );
      line.draw(ctx);
    }
  }

  drawVerticalLines(ctx: CanvasRenderingContext2D) {
    for (let i = -this.tilesOnY / 2; i < this.tilesOnY / 2 + 1; i++) {
      this.color.opacity = 0.3;
      if (i % 5 === 0) {
        this.color.opacity = 0.5;
      }
      if (i === 0) {
        this.color.opacity = 1;
      }
      let line = new Line(
        new Vector2(this.xMin, i * this.tileSize),
        new Vector2(this.xMax, i * this.tileSize),
        this.color
      );
      line.draw(ctx);
    }
  }
}

export default Grid;
