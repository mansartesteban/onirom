import MathUtils from "../Utils/Math";

/**
 * A helper class to handle colors with rgba channels
 */
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

  #opacity: number = 1;

  /**
   * @param r The red value of this color from 0 to 255
   * @param g The green value of this color from 0 to 255
   * @param b The blue value of this color from 0 to 255
   * @param opacity The opacity value of this color from 0 to 1
   */
  constructor(r: number = 0, g: number = 0, b: number = 0, opacity: number = 1) {
    this.#r = r;
    this.#g = g;
    this.#b = b;
    this.#opacity = opacity;
  }

  /**
   * Returns the red channel from 0 to 255
   */
  get r() {
    return this.#r;
  }

  /**
   * Sets the red channel from 0 to 255
   */
  set r(r: number) {
    this.#r = MathUtils.clamp(r, 0, 255);
  }

  /**
   * Returns the green channel from 0 to 255
   */
  get g() {
    return this.#g;
  }

  /**
   * Sets the green channel from 0 to 255
   */
  set g(g: number) {
    this.#g = MathUtils.clamp(g, 0, 255);
  }

  /**
  * Returns the blue channel from 0 to 255
  */
  get b() {
    return this.#b;
  }

  /**
   * Sets the blue channel from 0 to 255
   */
  set b(b: number) {
    this.#b = MathUtils.clamp(b, 0, 255);
  }

  /**
  * Returns the opacity channel from 0 to 1
  */
  get opacity() {
    return this.#opacity;
  }

  /**
   * Sets the opacity channel from 0 to 1
   */
  set opacity(opacity: number) {
    this.#opacity = MathUtils.clamp(opacity, 0, 1);
  }

  /**
   * Returns an array with splitted rgba channels
   */
  get rgba() {
    return [this.r, this.g, this.b, this.opacity];
  }

  /**
   * Returns the hexadecimal representation of this color on 8 bits
   */
  get _toString(): string {
    return "#" + parseInt(this.r.toFixed(0)).toString(16).padStart(2, "0") + parseInt(this.g.toFixed(0)).toString(16).padStart(2, "0") + parseInt(this.b.toFixed(0)).toString(16).padStart(2, "0") + parseInt(MathUtils.mapRange(this.opacity, 0, 1, 0, 255).toFixed(0)).toString(16).padStart(2, "0");
  }

  /**
   * Returns a new Color which is the addition of this color with an other
   * @param color The color to add to this color
   * @returns Color
   */
  add(color: number | Color) {
    if (color instanceof Color) {
      return new Color(this.r + color.r, this.g + color.g, this.b + color.b, this.opacity + color.opacity);
    } else if (typeof (color) === "number") {
      return new Color(this.r + color, this.g + color, this.b + color, this.opacity + color);
    } else {
      throw "Unable to compute a addition on the type '" + typeof (color) + "'. It should be a number or a Color";
    }
  }

  /**
   * Returns a new Color which is the multiplication of this color with an other
   * @param color The color to multiply by this color
   * @returns Color
   */
  multiply(color: number | Color) {
    if (color instanceof Color) {
      return new Color(Math.floor(this.r * color.r / 0xff), Math.floor(this.g * color.g / 0xff), Math.floor(this.b * color.b / 0xff), Math.floor(this.opacity * color.opacity));
    } else if (typeof (color) === "number") {
      return new Color(this.r * color, this.g * color, this.b * color, this.opacity * color);
    } else {
      throw "Unable to compute a multiplication on the type '" + typeof (color) + "'. It should be a number or a Color";
    }
  }


  /**
   * Interpolates (linearly) this color to an other color. Calculates a value between those two colors at weight position
   * @param color The other color to interpolate with
   * @param weight The weight of the second vector in the computation. For exemple :
   * 0 => returns the current color, 
   * 1 => returns the target color, 
   * 0.33 => returns the value of a new color at 33% between this color and the color parameter
   * @returns this Returns this for methods chaining
   */
  lerp(color: Color, weight: number, withOpacity: Boolean = true): this {
    this.r = (1 - weight) * this.r + weight * color.r;
    this.g = (1 - weight) * this.g + weight * color.g;
    this.b = (1 - weight) * this.b + weight * color.b;
    if (withOpacity) {
      this.opacity = (1 - weight) * this.opacity + weight * color.opacity;
    }
    return this;
  }

}

export default Color;