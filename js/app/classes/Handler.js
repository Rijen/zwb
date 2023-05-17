export default class Handler {
	#game;
	#map;
	#player;
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

	get camera(){
		return this.#game.camera
	}

	get map(){
		return this.#map
	}
	get player(){
		return this.#player
	}

	set map(map){
		this.#map=map
	}
	set player(player){
		this.#player = player
	}
}

