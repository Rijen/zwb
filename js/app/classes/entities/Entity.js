import GridEntity from "../map/GridEntity.js";
import Tile from "../tiles/Tile.js";
export default class Entity extends GridEntity {

	#width;
	#height;


	constructor(handler, width, height) {
		super(0, 0, handler)
		this.#width = width
		this.#height = height
		this._handler = handler
	}

	tick(_dt) {

	}
	render(_g) { }


	get width() {
		return this.#width;
	}
	get height() {
		return this.#height;
	}
	set width(width) {
		this.#width = width;
	}
	set height(height) {
		this.#height = height
	}
}

