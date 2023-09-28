class Vector2 {

  static X: Vector2 = new Vector2(1, 0);
  static Y: Vector2 = new Vector2(0, 1);
  static O: Vector2 = new Vector2(0, 0);

  #x: number = 0;
  #y: number = 0;
  #length: number | null = null;
  #squid: number | null = null;

  constructor(x: number = 0, y: number = 0) {
    this.#x = x;
    this.#y = y;
  }

  get x(): number {
    return this.#x;
  }

  get y(): number {
    return this.#y;
  }

  set x(x) {
    this.#x = x;
  }

  set y(y) {
    this.#y = y;
  }

  get length(): number {
    return this.#length ??= Math.sqrt(this.squid);
  }

  get squid(): number {
    return this.#squid ??= this.x * this.x + this.y * this.y;
  }

  get normalized(): Vector2 {
    return this.divide(this.length);
  }

  dot(v: Vector2) {
    if (!(v instanceof Vector2)) throw "Unable to compute a dot product on non Vector2 object";
    return this.x * v.x + this.y * v.y;
  }

  add(v: number | Vector2): Vector2 {
    if (v instanceof Vector2) {
      return new Vector2(this.x + v.x, this.y + v.y);
    } else if (typeof (v) === "number") {
      return new Vector2(this.x + v, this.y + v);
    } else {
      throw "Unable to compute a addition on the type '" + typeof (v) + "'. It should be a number or a Vector2";
    }
  }

  sub(v: number | Vector2): Vector2 {
    if (v instanceof Vector2) {
      return new Vector2(this.x - v.x, this.y - v.y);
    } else if (typeof (v) === "number") {
      return new Vector2(this.x - v, this.y - v);
    } else {
      throw "Unable to compute a subsraction on the type '" + typeof (v) + "'. It should be a number or a Vector2";
    }
  }

  divide(v: number | Vector2): Vector2 {
    if (v instanceof Vector2) {
      return new Vector2(this.x / v.x, this.y / v.y);
    } else if (typeof (v) === "number") {
      return new Vector2(this.x / v, this.y / v);
    } else {
      throw "Unable to compute a division on the type '" + typeof (v) + "'. It should be a number or a Vector2";
    }
  }

  multiply(v: number | Vector2): Vector2 {
    if (v instanceof Vector2) {
      return new Vector2(this.x * v.x, this.y * v.y);
    } else if (typeof (v) === "number") {
      return new Vector2(this.x * v, this.y * v);
    } else {
      throw "Unable to compute a multiplication on the type '" + typeof (v) + "'. It should be a number or a Vector2";
    }
  }

  normalize(): this {
    this.x = this.normalized.x;
    this.y = this.normalized.y;
    return this;
  }

  clamp() {

  }

  lerp() {

  }

  invert(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }

  static from(origin: Vector2): { to: Function } {
    return {
      to: (target: Vector2) => target.sub(origin)
    };
  }

}

export default Vector2;