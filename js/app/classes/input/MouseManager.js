import GridEntity from '../map/GridEntity.js';
export default class MouseManager {
	#mouseX
	#mouseY
	#handler

	#gridEntity
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
			this.#mouseY = parseInt(e.clientY - offsetY+$(window).scrollTop());
		}
		this.#gridEntity = new GridEntity(0, 0)
	}

	tick() {
		this.#gridEntity.setPixel(
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
	get gridEntity() {
		return this.#gridEntity
	}
};

