import Color from "./Color";
import Draw from "./Draw/Draw";
import Line from "./Draw/Line";
import Vector2 from "./Maths/Vector2";

type _GridOptions = {
  tileSize?: number,
  color?: Color;
};

class Grid {
  #origin: Vector2;
  #size: Vector2;
  #tileSize: number;
  #color: Color;

  constructor(origin: Vector2 = new Vector2(), size: Vector2 = new Vector2(), gridOptions: _GridOptions = {}) {
    this.#origin = origin;
    this.#size = size;
    this.#tileSize = gridOptions.tileSize || 0;
    this.#color = gridOptions.color || Color.Grey;
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

  // get tilesOnX() {
  //   let tilesOnX = this.width / this.#tileSize;
  //   return Math.ceil(tilesOnX - (tilesOnX % 2));
  // }

  // get tilesOnY() {
  //   let tilesOnY = this.height / this.#tileSize;
  //   return Math.ceil(tilesOnY - (tilesOnY % 2));
  // }

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
    this.drawBorders(ctx);
    this.drawHorizontaLines(ctx);
    this.drawVerticalLines(ctx);
  }


  drawBorders(ctx: CanvasRenderingContext2D) {

    let x = this.xMin;
    let y = this.yMin;
    let width = this.size.x;
    let height = this.size.y;

    Draw.strokeRect(ctx, x, y, width, height, Color.Red);
  }

  drawHorizontaLines(ctx: CanvasRenderingContext2D) {

    let lineCount = 0;
    for (let i = 0 + this.origin.x;i < this.xMax;i += this.tileSize) {
      this.color.opacity = .2;
      if (lineCount % 5 === 0) {
        this.color.opacity = 0.5;
      }
      if (lineCount === 0) {
        this.color.opacity = 1;
      }
      let line = new Line(
        new Vector2(i, this.yMin),
        new Vector2(i, this.yMax),
        this.color
      );
      line.draw(ctx);
      lineCount++;
    }
    lineCount = 1;
    for (let i = -this.tileSize + this.origin.x;i > this.xMin;i -= this.tileSize) {
      this.color.opacity = .2;
      if (lineCount % 5 === 0) {
        this.color.opacity = 0.5;
      }
      if (lineCount === 0) {
        this.color.opacity = 1;
      }
      let line = new Line(
        new Vector2(i, this.yMin),
        new Vector2(i, this.yMax),
        this.color
      );
      line.draw(ctx);
      lineCount++;
    }

  }

  drawVerticalLines(ctx: CanvasRenderingContext2D) {
    let lineCount = 0;
    for (let i = 0 + this.origin.y;i < this.yMax;i += this.tileSize) {
      this.color.opacity = .2;
      if (lineCount % 5 === 0) {
        this.color.opacity = 0.5;
      }
      if (lineCount === 0) {
        this.color.opacity = 1;
      }
      let line = new Line(
        new Vector2(this.xMin, i),
        new Vector2(this.xMax, i),
        this.color
      );
      line.draw(ctx);
      lineCount++;
    }
    lineCount = 1;
    for (let i = -this.tileSize + this.origin.y;i > this.yMin;i -= this.tileSize) {
      this.color.opacity = .2;
      if (lineCount % 5 === 0) {
        this.color.opacity = 0.5;
      }
      if (lineCount === 0) {
        this.color.opacity = 1;
      }
      let line = new Line(
        new Vector2(this.xMin, i),
        new Vector2(this.xMax, i),
        this.color
      );
      line.draw(ctx);
      lineCount++;
    }
  }
}

export default Grid;
