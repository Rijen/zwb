
import Animation from './Animation.js';
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
	#animations = []
	constructor(name, path, width, height) {
		assetsCtl.addAsset(name, this)
		this.name = name;
		this.width = width;
		this.height = height;
		this.sheet = new SpriteSheet(ImageLoader.loadImage(path));
	}

	/**
	 * 
	 * @param {string} name 
	 * @param {Animation} animation 
	 */
	addAnimation(name, animation) {
		this.#animations[name] = animation
	}
	get animations() {
		return this.#animations
	}
	static get DEFAULT_WIDTH() {
		return DEFAULT_WIDTH;
	}
	static get DEFAULT_HEIGHT() {
		return DEFAULT_HEIGHT;
	}

}

//Entity asset
let ast = new Asset("survPistol", "res/textures/surv_pistol.png",
	Asset.DEFAULT_WIDTH, Asset.DEFAULT_HEIGHT);
ast.stay = ast.sheet.crop(Asset.DEFAULT_WIDTH * 1, 0, 95, 55);
ast.tdR1 = ast.sheet.crop(Asset.DEFAULT_WIDTH * 13, 0, 95, 55);

let framespeed = 30

let walk_frames = []
for (let i = 2; i <= 8; i++) {
	walk_frames.push({
		frame: ast.sheet.crop(Asset.DEFAULT_WIDTH * i, 0, 95, 55),
		speed: 150
	})
}

ast.addAnimation('walk', new Animation(walk_frames))
let shot_frames = []
for (let i = 8; i <= 12; i++) {
	shot_frames.push({
		frame: ast.sheet.crop(Asset.DEFAULT_WIDTH * i, 0, 95, 55),
		speed: 150
	})
}

ast.addAnimation('shot', new Animation(shot_frames))


//Interface asset
let astMsgPanel = new Asset("msgPanel", "res/textures/msg_panel.png", 302, 64);
astMsgPanel.defCrop = astMsgPanel.sheet.crop(0, 0, 302, 64)

let big_frame = new Asset("bigFrame", "res/textures/big_frame2.png", 1200, 600);
big_frame.defCrop = big_frame.sheet.crop(0, 0, 1349, 732)

let btns = new Asset("buttons", "res/textures/btns.png", 92, 21);
btns.default = btns.sheet.crop(0, 21, 92, 21)
btns.active = btns.sheet.crop(0, 0, 92, 21)





//Map asset
let astMapStreet = new Asset("mapStreet", "res/textures/map_street.png", 800, 300);
for (let i = 0; i < 9; i++) {
	astMapStreet['tile' + i] = astMapStreet.sheet.crop(800 * i, 0, 800, 300);
}

let testHex = new Asset('hexes', 'res/textures/hexes.png', 44, 32);
testHex.default = testHex.sheet.crop(0, 0, 44, 32)
testHex.barrier = testHex.sheet.crop(44, 0, 44, 32)
testHex.canMove = testHex.sheet.crop(0, 32, 44, 32)
testHex.select = testHex.sheet.crop(44, 32, 44, 32)
testHex.notVisible = testHex.sheet.crop(0, 64, 44, 32)


//Static objects

let staticObjs = {}

let staticObjSrc = [
	{ name: 'barrels', w: 47, h: 64 },
	{ name: 'block', w: 35, h: 43 },
	{ name: 'bottle', w: 18, h: 6 },
]
staticObjSrc.forEach(e => {
	staticObjs[e.name] = new Asset(`static.${e.name}`, `res/static_obj/${e.name}.png`, e.w, e.h)
	staticObjs[e.name].d = staticObjs[e.name].sheet.crop(0, 0, e.w, e.h)
})




export { assetsCtl, staticObjs };
