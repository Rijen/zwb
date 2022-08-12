export default class Handler {
	#game;
	constructor(game) {
		this.#game = game
	}

	get width() {
		return this.#game.width
	}
	get height() {
		return this.#game.height
	}

	get keyManager() {
		return this.#game.keyManager
	}
}

