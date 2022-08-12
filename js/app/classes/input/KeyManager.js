
export default class KeyManager {
	#keys = [];
	constructor() {
		window.onkeydown = (e) => {
			this.#keys[e.keyCode] = true;
		}
		window.onkeyup = (e) => {
			this.#keys[e.keyCode] = false;
		}
	}

	tick() {
		this.up = this.#keys[87];
		this.down = this.#keys[83];
		this.left = this.#keys[65];
		this.right = this.#keys[68];
	}
};

