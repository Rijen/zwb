import Coords from '../map/Coords.js';
export default class MouseManager {
	#mouseX
	#mouseY
	#hexCoords
	#handler
	constructor(handler) {
		this.#handler = handler
		var $canvas = $("#canvas");
		var canvasOffset = $canvas.offset();
		var offsetX = canvasOffset.left;
		var offsetY = canvasOffset.top;
		window.onmousemove = (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.#mouseX = parseInt(e.clientX - offsetX);
			this.#mouseY = parseInt(e.clientY - offsetY);
		}
	}

	tick() {
		this.#hexCoords = Coords.pixel_to_hex(
			this.#mouseX + this.#handler.camera.xOffset,
			this.#mouseY + this.#handler.camera.yOffset
		)
	}
	get mouseX() {
		return this.#mouseX
	}
	get mouseY() {
		return this.#mouseY
	}
	get hexCoords() {
		return this.#hexCoords
	}
};

