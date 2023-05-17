import Coords from "../../map/Coords.js";
import Entity from "../Entity.js";
const
	DEFAULT_SPEED = 250,
	DEFAULT_HEALTH = 10,
	DEFAULT_CREATURE_WIDTH = 95,
	DEFAULT_CREATURE_HEIGHT = 55;


export default class Creature extends Entity {
	#health;
	#speed;

	constructor(handler, q, r, width, height) {
		super(handler, q, r, width, height)

		this.#health = DEFAULT_HEALTH;
		this.#speed = DEFAULT_SPEED;
		this.xMove = 0;
		this.yMove = 0;
	}

	move() {
		// let prevX = this.posX
		// let prevY = this.posY
		this.#moveY()
		this.#moveX()
		// if (prevX != this.posX || prevY != this.posY)
		// 	this.place(this.posX, this.posY)

		this.hexCoords = Coords.pixel_to_hex(
			this.x,
			this.y-8)

	}
	#moveX() {
		this.x += this.xMove
		// this.posX = Math.round((this.x + this.width / 2 - 21 + (this.posY *21)) / 42)
	}
	#moveY() {
		this.y += this.yMove
		// this.posY = Math.round((this.y + this.height - 24) / 24)
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
