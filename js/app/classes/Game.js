

import Display from "./display/Display.js";
import State from "./States/State.js";
import GameState from "./States/GameState.js";
import LoadingState from "./States/LoadingState.js";
import KeyManager from "./input/KeyManager.js";
import Handler from "./Handler.js";


export default class Game {

	#running = false;
	#title;
	#width;
	#height;
	#keyManager;

	#display;
	#g;

	#loadingState;
	#gameState;

	constructor(title, width, height) {
		this.#title = title
		this.#width = width
		this.#height = height
		this.#keyManager = new KeyManager();
	}

	start() {
		if (this.#running)
			return;
		this.#running = true;
		this.#run()
	}

	#run() {
		this.#init();
		var fps = 30;
		var timePerTick = 1000 / fps;
		var delta = 0;
		var now;
		var lastTime = Date.now();
		var timer = 0;
		var ticks = 0;

		let loop = () => {
			if (this.#running) {
				now = Date.now();
				delta = now - lastTime;
				timer += delta;
				lastTime = now;
			}
			if (timer >= timePerTick) {
				let dt = timer / 1000;
				this.#tick(dt);
				this.#render();
				timer = 0;
			}
			window.requestAnimationFrame(loop);
		}

		loop()
	}

	#init() {
		this.#display = new Display(this.#title, this.#width, this.#height)
		this.#g = this.#display.graphics

		let handler = new Handler(this);
		this.#gameState = new GameState(handler);
		this.#loadingState = new LoadingState(handler, this.#gameState);
		State.state = this.#loadingState
	}

	#tick(_dt) {
		this.#keyManager.tick();
		if (State.state != null)
			State.state.tick(_dt)
	}

	#render() {
		this.#g.clearRect(0, 0, this.#width, this.#height)
		if (State.state != null)
			State.state.render(this.#g)

	}

	get keyManager() {
		return this.#keyManager;
	}

	get width() {
		return this.#width;
	}
	get height() {
		return this.#height;
	}
}