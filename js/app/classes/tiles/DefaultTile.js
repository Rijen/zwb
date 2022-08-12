import Tile from "./Tile.js";


export default class DefaultTile extends Tile {
    constructor(id) {
        super(Tile.assets.default, id)
    }
}