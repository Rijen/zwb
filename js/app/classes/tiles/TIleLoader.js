
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
class BarrierTile extends Tile {
    constructor(id) {
        super(Tile.assets.barrier, id)
    }
}
class NotVisibleTile extends Tile {
    constructor(id) {
        super(Tile.assets.notVisible, id)
    }
}
Tile.defaultTile = new DefaultTile(0);
Tile.selectTile = new SelectTile(1);
Tile.canMoveTile = new CanMoveTile(2);
Tile.barrierTile = new BarrierTile(3);
Tile.notVisibleTile = new NotVisibleTile(3);

export default Tile;