
import { assetsCtl as Assets } from '/js/app/classes/gfx/Assets.js';
import Creature from './Creature.js'

export default class Player extends Creature {

	#assets
	constructor(handler, name) {
		super(handler, name, Creature.DEFAULT_CREATURE_WIDTH, Creature.DEFAULT_CREATURE_HEIGHT)
		this.#assets = Assets.getAsset('survPistol');
		// this.speed = 70
		this.speed = 70

	}
	tick(_dt) {
		super.tick(_dt)
		// this.#getInput(_dt);
		// this.move()

	}
	render(_g) {
		super.render(_g)

		_g.cDrawImage(this.#assets.stayR,
			this.x - this._handler.camera.xOffset - this.width / 2,
			this.y - this._handler.camera.yOffset - this.height,
			this.#assets.width, this.#assets.height)

		_g.fillStyle = 'rgba(200,0,200,0.9)';
		_g.fillRect(
			this.x - this._handler.camera.xOffset - 2,
			this.y - this._handler.camera.yOffset - 2, 4, 4)
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

