import Coords from "../../map/GridEntity.js";
import Entity from "../Entity.js";
const
	DEFAULT_SPEED = 250,
	DEFAULT_HEALTH = 10,
	DEFAULT_CREATURE_WIDTH = 95,
	DEFAULT_CREATURE_HEIGHT = 55;


export default class Creature extends Entity {
	#health;
	#speed;
	#name;
	#lvl
	constructor(handler, name, width, height) {
		super(handler, width, height)

		this.#health = DEFAULT_HEALTH;
		this.#speed = DEFAULT_SPEED;
		this.#name = name
		this.xMove = 0;
		this.yMove = 0;
		this.#lvl = parseInt(Math.random() * 100)
		this.#health = parseInt(Math.random() * 100)
	}

	render(_g) {


		_g.font = 'bold 12px Jura'
		_g.fillStyle = 'rgba(0,0,0,0.5)';
		
		let title = `${this.#name} [${this.#lvl}]`

		let text_len = _g.measureText(title).width + 20
		_g.fillRect(
			this.x - this._handler.camera.xOffset - (text_len / 2),
			this.y - this._handler.camera.yOffset - this.height - 15,
			text_len, 15)


		_g.fillStyle = 'rgba(200,200,0,1)';
		_g.textAlign = 'left'

		_g.fillText(`${title}`,
			this.x - this._handler.camera.xOffset - (text_len / 2) + 10,
			this.y - this._handler.camera.yOffset - this.height - 8
		);
		_g.fillStyle = 'rgba(200,0,0,0.8)';
			let hp = text_len/100*this.health

		_g.fillRect(
			this.x - this._handler.camera.xOffset - (text_len / 2),
			this.y - this._handler.camera.yOffset - this.height ,
			hp, 3)


	}
	move() {

		this.#moveY()
		this.#moveX()

		this.hexCoords = Coords.pixel_to_hex(
			this.x,
			this.y - 8)

	}
	#moveX() {
		this.x += this.xMove
	}
	#moveY() {
		this.y += this.yMove
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
