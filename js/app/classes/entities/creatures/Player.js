
import { assetsCtl as Assets } from '/js/app/classes/gfx/Assets.js';
import Creature from './Creature.js'

export default class Player extends Creature {

	#assets
	constructor(handler, x, y) {
		super(handler, x, y, Creature.DEFAULT_CREATURE_WIDTH, Creature.DEFAULT_CREATURE_HEIGHT)
		this.#assets = Assets.getAsset('survPistol');
		this.speed = 70
	}
	tick(_dt) {
		this.#getInput(_dt);
		this.move()
	}
	render(_g) {
		_g.cDrawImage(this.#assets.stayR, this.x, this.y, this.#assets.width, this.#assets.height)
	}

	#getInput(_dt) {
		this.xMove = 0;
		this.yMove = 0;
		if (this._handler.keyManager.up) {
			this.yMove = -this.speed * _dt;
		}
		if (this._handler.keyManager.down) {
			this.yMove = this.speed * _dt;
		}
		if (this._handler.keyManager.left) {
			this.xMove = -this.speed * _dt;
		}
		if (this._handler.keyManager.right) {
			this.xMove = this.speed * _dt;
		}
	}
}

