
export default class Entity {

	#x;
	#y;
	#width;
	#height;

	constructor(handler, x, y, width, height) {
		this.#x = x
		this.#y = y
		this.#width = width
		this.#height = height
		this._handler = handler
	}

	tick(_dt) { }
	render(_g) { }

	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}
	get width() {
		return this.#width;
	}
	get height() {
		return this.#height;
	}
	set x(x) {
		this.#x = x;
	}
	set y(y) {
		this.#y = y;
	}
	set width(width) {
		this.#width = width;
	}
	set height(height) {
		this.#height = height
	}
}

