
import { assetsCtl as Assets } from '/js/app/classes/gfx/Assets.js';
import Creature from './Creature.js'

export default class Player extends Creature {

	#assets
	#prevPos = { x: 0, y: 0 }
	#posChanged
	constructor(handler, name) {
		super(handler, name, Creature.DEFAULT_CREATURE_WIDTH, Creature.DEFAULT_CREATURE_HEIGHT)
		this.#assets = Assets.getAsset('survPistol');
		this.shotAnimate = 0
	}
	tick(_dt) {
		super.tick(_dt)
		// this.#getInput(_dt);
		// this.move()

		this._handler.map.drawReachable = !this.nextMovingStep
		let mm = this._handler.mouseManager
		if (mm.click == 'LMB') {
			let path = this._handler.map.selectedPath

			if (path) {
				this._handler.map.leftDistance -= path.length
				if (!this._handler.map.leftDistance) {
					this._handler.map.leftDistance = 6
				}
	
				mm.stopPropagation()
				this.movingPath = path
			} else {
				this.dir = mm.mouseX > this.x ? 'right' : 'left'
				this.shotAnimate = (5 * 150) / 1000
				mm.stopPropagation()
			}


		}
		if (this.shotAnimate > 0) {
			this.shotAnimate -= _dt
		} else {
			this.shotAnimate = 0
		}
		this.#posChanged = false
		if (this.#prevPos.x !== this.x || this.#prevPos.y !== this.y) {
			this.#prevPos = { x: this.x, y: this.y }
			this.#posChanged = true
		}
		this.#assets.animations.walk.tick()
		this.#assets.animations.shot.tick()

	}
	get posChanged() {
		return this.#posChanged
	}
	render(g) {
		super.render(g)
		let asset = this.#assets.stay
		if (this.state == 'moving') {
			this._handler.camera.centerOnEntity(this)
			asset = this.#assets.animations.walk.currentFrame
		}
		if (this.shotAnimate) {
			asset = this.#assets.animations.shot.currentFrame
		}


		if (this.dir == 'left') {
			g.save();
			g.scale(-1, 1);

			g.cDrawImage(asset,
				-this.x + this._handler.camera.xOffset - this.width / 2,
				this.y - this._handler.camera.yOffset - this.height,
				this.#assets.width, this.#assets.height)

			g.restore();
		} else {
			g.cDrawImage(asset,
				this.x - this._handler.camera.xOffset - this.width / 2,
				this.y - this._handler.camera.yOffset - this.height,
				this.#assets.width, this.#assets.height)
		}



		g.fillStyle = 'rgba(200,0,200,0.9)';
		g.fillRect(
			this.x - this._handler.camera.xOffset - 2,
			this.y - this._handler.camera.yOffset - 2, 4, 4)
	}

}

