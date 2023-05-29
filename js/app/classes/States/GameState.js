

import State from './State.js';
import { assetsCtl as Assets } from '../gfx/Assets.js';
import Player from '../entities/creatures/Player.js'
import DebugUI from '../ui/Debug.js';
import Map from '../map/Map.js';
import Construct from '../ui/Construct.js';

export default class GameState extends State {
	#player;
	// #player2;
	#map;
	#debugUI;
	#constructUI;
	#isNight = false;
	#constructMode = false;
	constructor(handler) {
		super(handler)
		this.#constructMode = window.location.search.includes('constr')
		handler.constructMode = this.#constructMode

		this.#map = new Map('street_1', handler)


		if (!this.#constructMode) {
			this.#player = new Player(handler, 'Rijen');
			// this.#player2 = new Player(handler, 6, 17, 'Машина для убийств зомбей бензопилой по вторникам и пятницам после обеда');
			handler.player = this.#player
			this.#player.setHex(16, 3)
			handler.camera.centerOnEntity(this.#player)
		} else {
			this.#constructUI = new Construct(handler)
		}
		// this.#player.setHex(35, -8)


		this.#debugUI = new DebugUI(handler)

		// this.bigFrame = Assets.getAsset('bigFrame');
	}

	get constructMode() {
		return this.#constructMode
	}

	tick(dt) {
		this._handler.camera.tick(dt)
		this.#map.tick(dt)
		if (this.#constructMode) {
			this.#constructUI.tick(dt)
		} else {
			this.#player.tick(dt)
		}

		// this.#player2.tick(dt)
		this.#debugUI.tick(dt)

	}

	render(g) {
		g.fillStyle = 'rgba(0,0,0,1)';
		g.fillRect(0, 0, this._handler.width, this._handler.height);
		this.#map.render(g)
		if (!this.#constructMode) {

			this.renderNightWrap(g)
			this.#debugUI.render(g)
		}
		if (this.#constructMode) {
			this.#constructUI.render(g)
		}

		// this.#player2.render(g)



		// g.cDrawImage(this.bigFrame.defCrop,
		// 	0,
		// 	0,
		// 	this.bigFrame.width, this.bigFrame.height)



	}

	renderNightWrap(g) {
		if (this.#isNight) {
			g.fillStyle = 'rgba(0,0,0,0.3)';
			g.fillRect(0, 0, this._handler.width, this._handler.height);

		}
	}
}
