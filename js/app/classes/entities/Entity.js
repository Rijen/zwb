import GridEntity from "../map/GridEntity.js";
import Tile from "../tiles/Tile.js";
export default class Entity extends GridEntity {

	//Координаты в пикселях
	#x;
	#y;
	#width;
	#height;


	constructor(handler, width, height) {
		super(0, 0)
		this.#width = width
		this.#height = height
		this._handler = handler
	}

	tick(_dt) {
		let pCoords = this.hex.toPixel
		//Позиционируем в центр-низ гекса

		this.#x = pCoords.x + 22
		this.#y = pCoords.y + Tile.R_HEIGHT -5
	}
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

