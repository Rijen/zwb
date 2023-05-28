import GridEntity from '../map/GridEntity.js';
export default class MouseManager {
	#mouseX
	#mouseY
	#handler
	#gridEntity

	#mousePress
	#stopProp
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
			this.#mouseY = parseInt(e.clientY - offsetY + $(window).scrollTop());
		}
		window.onmousedown = (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (this.#stopProp)
				return
			switch (e.buttons) {
				case e.buttons & 1:
					this.#mousePress = 'LMB'
					break;
				case e.buttons & 2:
					this.#mousePress = 'RMB'
					break;
				case e.buttons & 4:
					this.#mousePress = 'MMB'
					break;
				case e.buttons & 8:
					this.#mousePress = 'BACK'
					break;
				case e.buttons & 16:
					this.#mousePress = 'FORWARD'
					break;
			}

		}
		window.onmouseup = (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.#mousePress = false
			this.#stopProp = false
		}
	

		this.#gridEntity = new GridEntity(0, 0, this.#handler)
	}

	tick() {
		this.#gridEntity.setPixel(
			this.#mouseX + this.#handler.camera.xOffset,
			this.#mouseY + this.#handler.camera.yOffset
		)
	}
	stopPropagation() {
		this.#mousePress = false
		this.#stopProp = true
	}
	get click() {
		return this.#mousePress
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

