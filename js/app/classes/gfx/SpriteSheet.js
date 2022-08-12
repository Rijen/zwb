
export default class SpriteSheet {
	#sheet;
	constructor(sheet) {
		this.#sheet = sheet
	}

	crop(_x, _y, _width, _height) {
		return { "sheet": this.#sheet, "x": _x, "y": _y, "width": _width, "height": _height };
	}
};
