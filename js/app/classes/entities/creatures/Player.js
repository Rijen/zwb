
import { assetsCtl as Assets } from '/js/app/classes/gfx/Assets.js';
import Creature from './Creature.js'

export default class Player extends Creature {

	#assets
	constructor(handler, q, r) {
		super(handler, q, r, Creature.DEFAULT_CREATURE_WIDTH, Creature.DEFAULT_CREATURE_HEIGHT)
		this.#assets = Assets.getAsset('survPistol');
		// this.speed = 70
		this.speed = 70

	}
	tick(_dt) {
		this.#getInput(_dt);
		this.move()
		this._handler.camera.centerOnEntity(this)
	}
	render(_g) {
		_g.fillStyle = 'rgb(25,25,0)';
		_g.fillRect(
			this.x - this._handler.camera.xOffset - 4,
			this.y - this._handler.camera.yOffset - 4, 8, 8)
		_g.cDrawImage(this.#assets.stayR,
			this.x - this._handler.camera.xOffset - this.width / 2,
			this.y - this._handler.camera.yOffset - this.height,
			this.#assets.width, this.#assets.height)
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

