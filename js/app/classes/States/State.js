export default class State {
	#currentState = null;
	_handler;
	constructor(handler) {
		this._handler = handler;
	}

	tick(dt) { }
	render(g) { }

	get state() {
		return this.#currentState;
	}
	set state(newState) {
		this.#currentState = newState;
	}

}
