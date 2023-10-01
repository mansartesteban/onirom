class MathUtils {
	static num(number: number, precision = 4): number {
		let factor = Math.pow(10, precision);
		let n = precision < 0 ? number : 0.01 / factor + number;
		return Math.round(n * factor) / factor;
	}
	static random(min: number = 0, max: number = 1): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	static mapRange(x: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
		return toMin + ((toMax - toMin) / (fromMax - fromMin)) * (x - fromMin);
	}
	static minMax(x: number, min: number, max: number): number {
		return x < min ? min : (x > max ? max : x);
	}
	static clamp(num: number, min: number, max: number): number {
		return Math.min(Math.max(num, min), max);
	}
	static randomHexadecimal() {
		return Math.floor(Math.random() * 16777215).toString(16);
	}
	static degreesToRadians(degrees: number = 0) {
		return degrees * Math.PI / 180;
	}
	static radiansToDegrees(radians: number = 0) {
		return radians * (180 / Math.PI);
	}
}

export default MathUtils;
