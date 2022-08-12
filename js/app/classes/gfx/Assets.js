
import ImageLoader from './ImageLoader.js'
import SpriteSheet from './SpriteSheet.js'


const DEFAULT_WIDTH = 95, DEFAULT_HEIGHT = 55;

let assetsCtl = new class Assets {
	#assets = {};
	addAsset(name, asset) {
		this.#assets[name] = asset;
	}
	getAsset(name) {
		return this.#assets[name];
	}
}

class Asset {
	constructor(name, path, width, height) {
		assetsCtl.addAsset(name, this)
		this.name = name;
		this.width = width;
		this.height = height;
		this.sheet = new SpriteSheet(ImageLoader.loadImage(path));
	}

	static get DEFAULT_WIDTH() {
		return DEFAULT_WIDTH;
	}
	static get DEFAULT_HEIGHT() {
		return DEFAULT_HEIGHT;
	}

}

//Interface asset
let astMsgPanel = new Asset("msgPanel", "res/textures/msg_panel.png", 302, 64);
astMsgPanel.defCrop = astMsgPanel.sheet.crop(0, 0, 302, 64)


//Entity asset
let ast = new Asset("survPistol", "res/textures/surv_pistol.png",
	Asset.DEFAULT_WIDTH, Asset.DEFAULT_HEIGHT);
ast.stayR = ast.sheet.crop(Asset.DEFAULT_WIDTH * 1, 0, 95, 55);
ast.tdR1 = ast.sheet.crop(Asset.DEFAULT_WIDTH * 13, 0, 95, 55);


//Map asset
let astMapStreet = new Asset("mapStreet", "res/textures/map_street.png", 800, 300);
for (let i = 0; i < 9; i++) {
	astMapStreet['tile' + i] = astMapStreet.sheet.crop(800 * i, 0, 800, 300);
}

let tiles = new Asset('tiles', 'res/textures/hex.png', 40, 28);
tiles.canMove = tiles.sheet.crop(0,0,tiles.width,tiles.height)
tiles.select = tiles.sheet.crop(40,0,tiles.width,tiles.height)
tiles.default = tiles.sheet.crop(80,0,tiles.width,tiles.height)

export { assetsCtl };
