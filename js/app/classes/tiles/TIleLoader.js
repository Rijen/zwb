
import Tile from "./Tile.js";
import DefaultTile from "./DefaultTile.js";
import SelectTile from './SelectTile.js';
import CanMoveTile from "./CanMoveTile.js";

Tile.defaultTile = new DefaultTile(0);
Tile.selectTile = new SelectTile(1);
Tile.canMoveTile = new CanMoveTile(2);
export default Tile;