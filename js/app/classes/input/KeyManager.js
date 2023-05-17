
export default class KeyManager {
	#keys = [];
	#keysByKey = [];
	constructor() {
		window.onkeydown = (e) => {
			this.#keys[e.keyCode] = true;
			this.#keysByKey[e.key] = true;
		}
		window.onkeyup = (e) => {
			this.#keys[e.keyCode] = false;
			this.#keysByKey[e.key] = false;
		}
	}

	tick() {
		this.up = this.#keysByKey['w'] || this.#keysByKey['ArrowUp'];
		this.down = this.#keysByKey['s'] || this.#keysByKey['ArrowDown'];
		this.left = this.#keysByKey['a'] || this.#keysByKey['ArrowLeft'];
		this.right = this.#keysByKey['d'] || this.#keysByKey['ArrowRight'];
		// this.down = this.#keys[83] || this.#keys[40];
		// this.left = this.#keys[65] || this.#keys[37];
		// this.right = this.#keys[68] || this.#keys[39];
	}
};

