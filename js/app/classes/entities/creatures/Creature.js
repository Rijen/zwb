import GridEntity from "../../map/GridEntity.js";
import Entity from "../Entity.js";
import Tile from "../../tiles/Tile.js";
const
	DEFAULT_SPEED = 1.5,
	DEFAULT_HEALTH = 10,
	DEFAULT_CREATURE_WIDTH = 95,
	DEFAULT_CREATURE_HEIGHT = 55;


export default class Creature extends Entity {
	#health;
	#speed;
	#name;
	#lvl;
	#movingPath = [];

	#nextMovingStep
	#prevMovingCoords

	#state = 'stay'
	constructor(handler, name, width, height) {
		super(handler, width, height)

		this.#health = DEFAULT_HEALTH;
		this.#speed = DEFAULT_SPEED;
		this.#name = name
		this.xMove = 0;
		this.yMove = 0;
		this.dir = 'right'
		this.#lvl = parseInt(Math.random() * 100)
		this.#health = parseInt(Math.random() * 100)
	}
	tick(dt) {
		if (this.#movingPath.length) {
			if (this.#state == 'stay') {

				this.#nextMovingStep = this.#movingPath.pop()
				this.#prevMovingCoords = this.toPixel
				this.#state = 'moving'
			}
		}
		if (this.#state == 'moving') {
			this.move(dt)
		}
		if (this.#state == 'stay' && !this.#movingPath.length) {
			this.#nextMovingStep = null
		}
	}


	move(dt) {
		let dstPixel = this.#nextMovingStep.hex.toPixel
		let dstx = Math.round((dstPixel.x + Tile.TILEWIDTH / 2)),
			dsty = Math.round((dstPixel.y + Tile.TILEHEIGHT - 8))
		let srcPixel = this.#prevMovingCoords
		this.xMove = 0;
		this.yMove = 0;

		if (Math.abs(this.x - dstx) > 1 || Math.abs(this.y - dsty) > 1) {
			let xDirection = ((dstPixel.x - srcPixel.x))
			let yDirection = ((dstPixel.y - srcPixel.y))

			this.dir = xDirection < 0 ? 'left' : 'right'
			this.xMove = this.speed * dt * xDirection;
			this.yMove = this.speed * dt * yDirection;
			this.setPixel(this.x + this.xMove, this.y + this.yMove)
		} else {
			this.setPixel(dstPixel.x + Tile.TILEWIDTH / 2
				, dstPixel.y + Tile.TILEHEIGHT - 8)
			this.#state = 'stay'
		}

		// this.#moveY()
		// this.#moveX()
	}
	render(g) {


		g.font = 'bold 12px Jura'
		g.fillStyle = 'rgba(0,0,0,0.5)';

		let title = `${this.#name} [${this.#lvl}]`

		let text_len = g.measureText(title).width + 20
		g.fillRect(
			this.x - this._handler.camera.xOffset - (text_len / 2),
			this.y - this._handler.camera.yOffset - this.height - 15,
			text_len, 15)


		g.fillStyle = 'rgba(200,200,0,1)';
		g.textAlign = 'left'

		g.fillText(`${title}`,
			this.x - this._handler.camera.xOffset - (text_len / 2) + 10,
			this.y - this._handler.camera.yOffset - this.height - 4
		);
		g.fillStyle = 'rgba(200,0,0,0.8)';
		let hp = text_len / 100 * this.health

		g.fillRect(
			this.x - this._handler.camera.xOffset - (text_len / 2),
			this.y - this._handler.camera.yOffset - this.height,
			hp, 3)
	}



	get state() {
		return this.#state
	}
	/**
	 * @param {HexTile[]} path
	 */
	set movingPath(path) {
		this.#movingPath = path
	}
	get nextMovingStep() {
		return this.#nextMovingStep
	}
	//Getters
	get health() {
		return this.#health
	}
	get speed() {
		return this.#speed
	}
	//Setters
	set health(health) {
		this.#health = health
	}
	set speed(speed) {
		this.#speed = speed
	}

	//const
	static get DEFAULT_SPEED() {
		return DEFAULT_SPEED;
	}
	static get DEFAULT_HEALTH() {
		return DEFAULT_HEALTH;
	}
	static get DEFAULT_CREATURE_WIDTH() {
		return DEFAULT_CREATURE_WIDTH;
	}
	static get DEFAULT_CREATURE_HEIGHT() {
		return DEFAULT_CREATURE_HEIGHT;
	}
}
