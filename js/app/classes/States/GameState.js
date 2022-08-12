

import State from './State.js';
import { assetsCtl as Assets } from '../gfx/Assets.js';
import Player from '../entities/creatures/Player.js'
import Tile from '../tiles/TIleLoader.js';

let tmpMapSteet = Assets.getAsset('mapStreet')

export default class GameState extends State {
	#player;
	constructor(handler) {
		super(handler)

		this.#player = new Player(handler, 20, 20);
	}

	tick(dt) {
		this.#player.tick(dt)
	}

	render(g) {

		g.cDrawImage(tmpMapSteet.tile2, 0, 0, tmpMapSteet.width, tmpMapSteet.height)
		g.cDrawImage(tmpMapSteet.tile4, 800, 0, tmpMapSteet.width, tmpMapSteet.height)
		g.cDrawImage(tmpMapSteet.tile8, 0, 300, tmpMapSteet.width, tmpMapSteet.height)
		g.cDrawImage(tmpMapSteet.tile0, 800, 300, tmpMapSteet.width, tmpMapSteet.height)
		g.textAlign = "left"
		g.font = '10px Jura'
		g.fillText("tile mapStreet_2", 25, 25);
		g.fillText("tile mapStreet_4", 825, 25);
		g.fillText("tile mapStreet_8", 25, 325);
		g.fillText("tile mapStreet_0", 825, 325);
		
		Tile.tiles[0].render(g,0,0);
		Tile.tiles[1].render(g,42,0);
		Tile.tiles[2].render(g,22,24)
		
		this.#player.render(g)
		
	}
}
