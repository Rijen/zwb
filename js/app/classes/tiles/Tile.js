import { assetsCtl as Assets } from "../gfx/Assets.js"

const TILEWIDTH = 33;
const TILEHEIGHT = 25;
// const TILEWIDTH = 44;
// const TILEHEIGHT = 33;


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

    static get TILEWIDTH() {
        return TILEWIDTH;
    }
    static get TILEHEIGHT() {
        return TILEHEIGHT;
    }

}
// Размеры используемые для отрисовки на карте
// По X отступ между тайлами 2 PX
// По Y - внахлест.
Tile.R_WIDTH = 24;
Tile.R_HEIGHT = 24;
// Tile.R_WIDTH = 42;
// Tile.R_HEIGHT = 24;

Tile.tiles = tiles;
Tile.assets = Assets.getAsset('hexes');
// Tile.assets = Assets.getAsset('tiles');
