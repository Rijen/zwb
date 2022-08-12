import Entity from "../Entity.js";
const
	DEFAULT_SPEED = 250,
	DEFAULT_HEALTH = 10,
	DEFAULT_CREATURE_WIDTH = 95,
	DEFAULT_CREATURE_HEIGHT = 55;


export default class Creature extends Entity {
	#health;
	#speed;

	constructor(handler, x, y, width, height) {
		super(handler, x, y, width, height)
		this.#health = DEFAULT_HEALTH;
		this.#speed = DEFAULT_SPEED;
		this.xMove = 0;
		this.yMove = 0;
	}

	move() {
		this.#moveX()
		this.#moveY()
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
