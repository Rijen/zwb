
/**
 * custom DrawImage - draw cropped asset
 * @param {type} asset
 * @param {type} _x
 * @param {type} _y
 * @param {type} _width
 * @param {type} _height
 * @returns {undefined}
 */
CanvasRenderingContext2D.prototype.cDrawImage = function (asset, _x, _y, _width, _height) {
	this.drawImage(asset.sheet, asset.x, asset.y, asset.width, asset.height,
		_x, _y, _width, _height)
}

export default class Display {
	#canvas;
	#title;
	#width;
	#height;
	#graphics;

	constructor(title, width, height) {
		this.#title = title;
		this.#width = width;
		this.#height = height;
		this.#createDisplay();
	}

	get title() {
		return this.#title;
	}
	get width() {
		return this.#width;
	}
	get height() {
		return this.#height;
	}
	get graphics() {
		return this.#graphics;
	}

	#createDisplay() {
		document.title = this.#title
		var body = document.body
		body.innerHTML = `<canvas id='canvas' width='${this.#width}' height='${this.#height}'></canvas>`
		this.#graphics = document.getElementById('canvas').getContext('2d');
		// this.#graphics.scale(2,2) 

	}
};
