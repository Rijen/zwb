

import State from './State.js';
import { assetsCtl as Assets } from '../gfx/Assets.js';
import Player from '../entities/creatures/Player.js'
import DebugUI from '../ui/Debug.js';
import Map from '../map/Map.js';

export default class GameState extends State {
	#player;
	#map;
	#debugUI;
	constructor(handler) {
		super(handler)

		this.#player = new Player(handler, 5, 12);
		handler.player = this.#player
		this.#map = new Map('street_1', handler)

		this.#debugUI = new DebugUI(handler)
	}

	tick(dt) {
		this.#player.tick(dt)
		this.#debugUI.tick(dt)
	}

	render(g) {
		this.#map.render(g)

		this.#player.render(g)
		this.#debugUI.render(g)
	}
}
