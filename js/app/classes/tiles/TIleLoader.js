
import Tile from "./Tile.js";


class SelectTile extends Tile {
    constructor(id) {
        super(Tile.assets.select, id)
    }
}
class DefaultTile extends Tile {
    constructor(id) {
        super(Tile.assets.default, id)
    }
}

class CanMoveTile extends Tile {
    constructor(id) {
        super(Tile.assets.canMove, id)
    }
}
Tile.defaultTile = new DefaultTile(0);
Tile.selectTile = new SelectTile(1);
Tile.canMoveTile = new CanMoveTile(2);

export default Tile;