
import Game from "./Game.js";
export default class Launcher {
	constructor(title, width, height) {
		
		let game = new Game(title, width, height);
		game.start()
	}
};