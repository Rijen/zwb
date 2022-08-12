import Tile from "./Tile.js";


export default class SelectTile extends Tile {
    constructor(id) {
        super(Tile.assets.select, id)
    }
}