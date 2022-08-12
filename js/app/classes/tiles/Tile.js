import { assetsCtl as Assets } from "../gfx/Assets.js"

const TILEWIDTH = 40;
const TILEHEIGHT = 28;

let tiles = []

export default class Tile {
    #texture;
    #id;
    constructor(texture, id) {
        this.#texture = texture;
        this.#id = id;
        tiles[id] = this;
    }
    tick(dt) { }
    render(g, x, y) {
        g.cDrawImage(this.#texture, x, y, TILEWIDTH, TILEHEIGHT);
    }
    get id() {
        return this.#id;
    }
    get isSolid() {
        return false;
    }

    static get TILEWIDTH() {
        return TILEWIDTH;
    }
    static get TILEHEIGHT() {
        return TILEHEIGHT;
    }

}

Tile.tiles = tiles;
Tile.assets = Assets.getAsset('tiles');
