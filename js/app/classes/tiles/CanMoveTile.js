import Tile from "./Tile.js";


export default class CanMoveTile extends Tile {
    constructor(id) {
        super(Tile.assets.canMove, id)
    }
}