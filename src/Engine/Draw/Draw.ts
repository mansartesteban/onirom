import Color from "../Color";
import Vector2 from "../Maths/Vector2";

const defaultsAttributes = {
  strokeStyle: "#000",
  lineWidth: "1",
  fillStyle: "#000",
};
const defaultsMethods = {
  setLineDash: [],
};

class Draw {
  static draw(ctx: CanvasRenderingContext2D, callback: Function) {
    ctx.beginPath();
    let toReset = callback();
    ctx.closePath();

    if (toReset) {
      Draw.reset(ctx, toReset);
    }
  }

  static strokeRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: Color = Color.Green) {

    let p = new Vector2(x, y);
    let thickness = 1;
    ctx.fillStyle = c._toString || "#ff0000";
    ctx.fillRect(p.x, p.y, w, h);
    ctx.fillStyle = '#000000';
    ctx.fillRect(p.x + thickness, p.y + thickness, w - thickness * 2, h - thickness * 2);
  }

  static reset(ctx: CanvasRenderingContext2D, properties: string[] = []) {
    if (properties.length === 0) {
      properties = Object.keys(defaultsAttributes).concat(
        Object.keys(defaultsMethods)
      );
    }

    properties.forEach((property: string) => {
      if (Object.keys(defaultsAttributes).indexOf(property) !== -1) {
        ctx[property] = defaultsAttributes[property];
      } else if (Object.keys(defaultsMethods).indexOf(property) !== -1) {
        ctx[property](defaultsMethods[property]);
      }
    });
  }
}
export default Draw;
