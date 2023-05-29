
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
	{ name: 'boxes1', w: 29, h: 94 },
	{ name: 'boxes2', w: 97, h: 67 },
	{ name: 'boxes3', w: 23, h: 20 },
	{ name: 'fence', w: 26, h: 30 },
	{ name: 'flower1', w: 27, h: 39 },
	{ name: 'flower2', w: 27, h: 39 },
	{ name: 'car1', w: 115, h: 73 },
	{ name: 'car2', w: 124, h: 69 },
	{ name: 'car3', w: 151, h: 91 },
	{ name: 'car4', w: 117, h: 83 },
	{ name: 'car5', w: 134, h: 73 },
	{ name: 'car6', w: 125, h: 87 },
	{ name: 'car7', w: 118, h: 97 },
	{ name: 'car8', w: 85, h: 88 },
	{ name: 'car9', w: 124, h: 67 },
	{ name: 'car9_l', w: 124, h: 67 },
	{ name: 'cart', w: 23, h: 29 },
	{ name: 'cooler', w: 18, h: 41 },
	{ name: 'copier', w: 53, h: 50 },
	{ name: 'divan1', w: 47, h: 31 },
	{ name: 'divan2', w: 64, h: 31 },
	{ name: 'furgon1', w: 181, h: 160 },
	{ name: 'furgon2', w: 282, h: 146 },
	{ name: 'furgon1_r', w: 185, h: 160 },
	{ name: 'furgon2_l', w: 282, h: 146 },
	{ name: 'garbage1', w: 37, h: 14 },
	{ name: 'garbage2', w: 12, h: 10 },
	{ name: 'garbage3', w: 12, h: 20 },
	{ name: 'gazirovka1', w: 31, h: 58 },
	{ name: 'kran1', w: 18, h: 27 },
	{ name: 'kust1', w: 31, h: 27 },
	{ name: 'kust2', w: 38, h: 35 },
	{ name: 'kust3', w: 35, h: 27 },
	{ name: 'kust4', w: 38, h: 37 },
	{ name: 'kust5', w: 38, h: 38 },
	{ name: 'lamp1', w: 21, h: 48 },
	{ name: 'musorka1', w: 60, h: 57 },
	{ name: 'police_block1', w: 189, h: 95 },
	{ name: 'radio1', w: 21, h: 22 },
	{ name: 'refrigirator1', w: 30, h: 57 },
	{ name: 'shkaf1', w: 46, h: 71 },
	{ name: 'soda_avt1', w: 64, h: 80 },
	{ name: 'station1', w: 81, h: 83 },
	{ name: 'stolb1', w: 57, h: 68 },
	{ name: 'table1', w: 57, h: 52 },
	{ name: 'table3', w: 70, h: 41 },
	{ name: 'table4', w: 70, h: 41 },
	{ name: 'table5', w: 70, h: 41 },
	{ name: 'tree1', w: 64, h: 127 },
	{ name: 'tree2', w: 65, h: 105 },
	{ name: 'tv1', w: 31, h: 36 },
	{ name: 'wheels1', w: 42, h: 54 },
	{ name: 'wall1', w: 40, h: 94 },
	{ name: 'wall2', w: 40, h: 94 },
	{ name: 'wall1_v', w: 9, h: 45 },
]
staticObjSrc.forEach(e => {
	staticObjs[e.name] = new Asset(`static.${e.name}`, `res/static_obj/${e.name}.png`, e.w, e.h)
	staticObjs[e.name].d = staticObjs[e.name].sheet.crop(0, 0, e.w, e.h)
})




export { assetsCtl, staticObjs };
