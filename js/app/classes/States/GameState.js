

import State from './State.js';
import { assetsCtl as Assets } from '../gfx/Assets.js';
import Player from '../entities/creatures/Player.js'
import DebugUI from '../ui/Debug.js';
import Map from '../map/Map.js';

export default class GameState extends State {
	#player;
	// #player2;
	#map;
	#debugUI;
	#isNight = false;
	constructor(handler) {
		super(handler)

		this.#player = new Player(handler, 'Rijen');
		// this.#player2 = new Player(handler, 6, 17, 'Машина для убийств зомбей бензопилой по вторникам и пятницам после обеда');
		handler.player = this.#player
		this.#map = new Map('street_1', handler)

		this.#player.setHex(6, 5)

		this.#debugUI = new DebugUI(handler)
		handler.camera.centerOnEntity(this.#player)
	}

	tick(dt) {
		this._handler.camera.tick(dt)
		this.#map.tick(dt)
		this.#player.tick(dt)
		// this.#player2.tick(dt)
		this.#debugUI.tick(dt)
	}

	render(g) {
		this.#map.render(g)
		this.#player.render(g)
		// this.#player2.render(g)

		this.renderNightWrap(g)
		this.#debugUI.render(g)
	}

	renderNightWrap(g) {
		if (this.#isNight) {
			g.fillStyle = 'rgba(0,0,0,0.3)';
			g.beginPath();
			g.rect(0, 0, this._handler.width, this._handler.height);
			g.fill();
		}
	}
}
