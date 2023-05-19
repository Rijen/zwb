
export default class KeyManager {
	#keys = [];
	#keysByCode = [];
	constructor() {
		window.onkeydown = (e) => {
			this.#keys[e.keyCode] = true;
			this.#keysByCode[e.code] = true;
		}
		window.onkeyup = (e) => {
			this.#keys[e.keyCode] = false;
			this.#keysByCode[e.code] = false;
		}
	}

	tick() {
		this.up = this.#keysByCode['KeyW'] || this.#keysByCode['ArrowUp'];
		this.down = this.#keysByCode['KeyS'] || this.#keysByCode['ArrowDown'];
		this.left = this.#keysByCode['KeyA'] || this.#keysByCode['ArrowLeft'];
		this.right = this.#keysByCode['KeyD'] || this.#keysByCode['ArrowRight'];
		// this.down = this.#keys[83] || this.#keys[40];
		// this.left = this.#keys[65] || this.#keys[37];
		// this.right = this.#keys[68] || this.#keys[39];
	}
};

