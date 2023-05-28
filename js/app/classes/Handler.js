export default class Handler {
	#game;
	#map;
	#player;
	#constructMode;
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
	get mouseManager() {
		return this.#game.mouseManager
	}

	get camera() {
		return this.#game.camera
	}

	get player() {
		return this.#player
	}
	set player(player) {
		this.#player = player
	}
	get map() {
		return this.#map
	}
	set map(map) {
		this.#map = map
	}
	set constructMode(val) {
		this.#constructMode = val
	}
	get constructMode() {
		return this.#constructMode
	}
}

