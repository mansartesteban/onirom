import Color from "../Color";
import Map from "../Map";
import Vector2 from "../Maths/Vector2";
import Draw from "./Draw";

class Line {
  #from: Vector2;
  #to: Vector2;
  #color: Color;
  #dashes: number[] | string[];
  #thickness: number;

  constructor(
    from: Vector2 = new Vector2(),
    to: Vector2 = new Vector2(),
    color: Color = new Color(),
    thickness: number = 1,
    dashes: number[] | string[] = []
  ) {
    this.#from = from;
    this.#to = to;
    this.#color = color;
    this.#dashes = dashes;
    this.#thickness = thickness;
  }

  draw(ctx: CanvasRenderingContext2D) {
    Draw.draw(ctx, () => {
      const dashes = this.#dashes.map((dash: string | number) =>
        typeof dash === "string" ? parseInt(dash) : dash
      );
      ctx.setLineDash(dashes);
      ctx.strokeStyle = this.#color._toString;
      ctx.lineWidth = this.#thickness;

      let fromOnScreen = Map.getScreenCoordinates(this.#from);
      let toOnScreen = Map.getScreenCoordinates(this.#to);

      ctx.moveTo(fromOnScreen.x, fromOnScreen.y);
      ctx.lineTo(toOnScreen.x, toOnScreen.y);
      ctx.stroke();

      return ["strokeStyle", "setLineDash", "lineWidth"];
    });
  }
}

export default Line;
