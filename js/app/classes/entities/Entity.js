import Coords from "../map/Coords.js";
export default class Entity {

	//Координаты в пикселях
	#x;
	#y;
	#width;
	#height;
	//координаты на сетке
	#hexCoords

	constructor(handler, q, r, width, height) {
		this.#hexCoords = { q: q, r: r }
		this.#width = width
		this.#height = height
		this._handler = handler
		this.place(q, r)
	}

	/**
	 * Используются координаты гесогональной сетки
	 * @param {*} x 
	 * @param {*} y 
	 */
	place(q, r) {
		this.#hexCoords = { q: q, r: r }
		let pixelCoords = Coords.hex_to_pixel(q, r)
		console.log(q,r)

		this.#x = pixelCoords.x
		this.#y = pixelCoords.y
	}

	tick(_dt) { }
	render(_g) { }

	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}

	get hexCoords() {
		return this.#hexCoords
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
	set hexCoords(hexCoords) {
		this.#hexCoords = hexCoords;
	}
	set width(width) {
		this.#width = width;
	}
	set height(height) {
		this.#height = height
	}
}

