class MathUtils {
  static num(number: number = 0, precision = 4): number {
    let factor = Math.pow(10, precision);
    let n = precision < 0 ? number : 0.01 / factor + number;
    return Math.round(n * factor) / factor;
  }
  static isBetween(
    number: number = 0,
    min: number = 0,
    max: number = 0,
    strict: Boolean = false
  ) {
    return strict
      ? number > min && number < max
      : number >= min && number <= max;
  }
  static random(min: number = 0, max: number = 1): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static mapRange(
    x: number = 0,
    fromMin: number = 0,
    fromMax: number = 0,
    toMin: number = 0,
    toMax: number = 0
  ): number {
    return toMin + ((toMax - toMin) / (fromMax - fromMin)) * (x - fromMin);
  }
  static minMax(x: number = 0, min: number = 0, max: number = 0): number {
    return x < min ? min : x > max ? max : x;
  }
  static clamp(num: number = 0, min: number = 0, max: number = 0): number {
    return Math.min(Math.max(num, min), max);
  }
  static randomHexadecimal() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }
  static degreesToRadians(degrees: number = 0) {
    return (degrees * Math.PI) / 180;
  }
  static radiansToDegrees(radians: number = 0) {
    return radians * (180 / Math.PI);
  }
}

export default MathUtils;
