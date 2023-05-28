
import State from './State.js';
import { assetsCtl as Assets } from '../gfx/Assets.js';

let msgPanel = Assets.getAsset('msgPanel').defCrop

export default class LoadingState extends State {

	#gameState;
	#prc = 0;
	#sec = 0;

	constructor(handler, gameState) {
		super(handler);
		this.#gameState = gameState;
	}

	tick(dt) {
		if (this.#prc < 100) {
			this.#prc += 1000 / dt / 1000
		}
		if (this.#prc > 100)
			this.#prc = 100
		this.#sec += 1 / dt / 1000;
		if (this.#prc >= 100)
			State.state = this.#gameState
	}
	render(g) {
		g.fillStyle = '#000'
		g.fillRect(0, 0, 900, 600)

		g.cDrawImage(msgPanel, 299, 268, msgPanel.width, msgPanel.height)

		g.font = "18px Jura"
		//	g.font = "25px Caveat"
		g.textBaseline = "middle";
		g.textAlign = "center"
		g.fillStyle = '#FFF'
		g.fillText("Вход в боевую зону ...", 450, 290);
		g.font = "22px 'Alumni Sans Pinstripe'"
		g.fillText(new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(this.#prc) + ' %', 450, 310);
	}

}
