import MathUtils from "../Utils/Math";

class Color {

  static Black = new Color(0, 0, 0);
  static Grey = new Color(0x7f, 0x7f, 0x7f);
  static LightGrey = new Color(0xbf, 0xbf, 0xbf);
  static DarkGrey = new Color(0x3f, 0x3f, 0x3f);
  static White = new Color(0xff, 0xff, 0xff);
  static Red = new Color(0xff, 0, 0);
  static Green = new Color(0, 0xff, 0);
  static Blue = new Color(0, 0, 0xff);
  static Yellow = new Color(0xff, 0xff, 0);
  static Cyan = new Color(0, 0xff, 0xff);
  static Fuchsia = new Color(0xff, 0, 0xff);

  #r: number = 0;
  #g: number = 0;
  #b: number = 0;

  #opacity: number = 255;

  constructor(r: number = 0, g: number = 0, b: number = 0, opacity: number = 255) {
    this.#r = r;
    this.#g = g;
    this.#b = b;
    this.#opacity = opacity;
  }

  get r() {
    return this.#r;
  }

  set r(r: number) {
    this.#r = MathUtils.clamp(r, 0, 255);
  }

  get g() {
    return this.#g;
  }

  set g(g: number) {
    this.#g = MathUtils.clamp(g, 0, 255);
  }

  get b() {
    return this.#b;
  }

  set b(b: number) {
    this.#b = MathUtils.clamp(b, 0, 255);
  }

  get opacity() {
    return this.#opacity;
  }

  set opacity(opacity: number) {
    this.#opacity = MathUtils.clamp(opacity, 0, 255);
  }

  get rgba() {
    return [this.r, this.g, this.b, this.opacity];
  }

  get html(): string { return `rgb(${this.r},${this.g},${this.b})`; };

  get _toString(): string {

    return "#" + parseInt(this.r.toFixed(0)).toString(16).padStart(2, "0") + parseInt(this.g.toFixed(0)).toString(16).padStart(2, "0") + parseInt(this.b.toFixed(0)).toString(16).padStart(2, "0") + parseInt(this.opacity.toFixed(0)).toString(16).padStart(2, "0");
  }

  add(c: number | Color) {
    if (c instanceof Color) {
      return new Color(this.r + c.r, this.g + c.g, this.b + c.b);
    } else if (typeof (c) === "number") {
      return new Color(this.r + c, this.g + c, this.b + c);
    } else {
      throw "Unable to compute a addition on the type '" + typeof (c) + "'. It should be a number or a Color";
    }
  }

  multiply(c: number | Color) {
    if (c instanceof Color) {
      return new Color(Math.floor(this.r * c.r / 0xff), Math.floor(this.g * c.g / 0xff), Math.floor(this.b * c.b / 0xff));
    } else if (typeof (c) === "number") {
      return new Color(this.r * c, this.g * c, this.b * c);
    } else {
      throw "Unable to compute a multiplication on the type '" + typeof (c) + "'. It should be a number or a Color";
    }
  }


  lerped(color: Color, amt: number): Color {
    return new Color(
      (1 - amt) * this.r + amt * color.r,
      (1 - amt) * this.g + amt * color.g,
      (1 - amt) * this.b + amt * color.b,
    );
  }

  lerp(color: Color, amt: number): this {
    this.r = this.lerped(color, amt).r;
    this.g = this.lerped(color, amt).g;
    this.b = this.lerped(color, amt).b;
    return this;
  }

}

export default Color;