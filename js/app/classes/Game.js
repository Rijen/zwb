

import Display from "./display/Display.js";
import State from "./States/State.js";
import GameState from "./States/GameState.js";
import LoadingState from "./States/LoadingState.js";
import KeyManager from "./input/KeyManager.js";
import Handler from "./Handler.js";
import Camera from "./gfx/Camera.js";
import MouseManager from "./input/MouseManager.js";

export default class Game {

	#running = false;
	#title;
	#width;
	#height;
	#keyManager;
	#mouseManager;
	#camera;

	#display;
	#g;

	#loadingState;
	#gameState;

	constructor(title, width, height) {
		this.#title = title
		this.#width = width
		this.#height = height


	}

	start() {
		if (this.#running)
			return;
		this.#running = true;
		this.#run()
	}

	#run() {
		this.#init();
		var fps = 60;
		var timePerTick = 1000 / fps;
		// let timePerTick=1
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

		this.#keyManager = new KeyManager();

		let handler = new Handler(this);
		
		this.#camera = new Camera(handler, 0, 0)
		this.#mouseManager = new MouseManager(handler)
		this.#gameState = new GameState(handler);
		this.#loadingState = new LoadingState(handler, this.#gameState);
		State.state = this.#loadingState
	}

	#tick(_dt) {
		this.#keyManager.tick();
		this.#mouseManager.tick();
		if (State.state != null)
			State.state.tick(_dt)
	}

	#render() {
		this.#g.clearRect(0, 0, this.#width, this.#height)
		if (State.state != null)
			State.state.render(this.#g)

	}

	get mouseManager() {
		return this.#mouseManager;
	}
	get keyManager() {
		return this.#keyManager;
	}

	get camera() {
		return this.#camera;
	}

	get width() {
		return this.#width;
	}
	get height() {
		return this.#height;
	}
}