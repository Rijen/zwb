import Tile from '../tiles/TileLoader.js';

export default class BarrierLayer {
    #handler
    #map_config
    #barriersGrid = {}
    constructor(handler, map_config) {
        this.#handler = handler
        this.#map_config = map_config

        this.#map_config.barriers
            .forEach(el => {
                this.#barriersGrid[`q${el.q}r${el.r}`] = el
                let tile = this.#handler.map.findHex(el)
                if (tile)
                    tile.barrier = el
            });
    }

    tick(dt) { }

    render(g) { }

    renderTile(g, tile) {


        if (!tile.barrier)
            return

        let pC = tile.toPixel

        let xOffset = this.#handler.camera.xOffset
        let yOffset = this.#handler.camera.yOffset
        let x = pC.x - xOffset
        let y = pC.y - yOffset

        if (tile.barrier) {
            Tile.barrierTile.render(g, x, y);
        }

        g.font = '11px Jura'
        g.fillStyle = '#fff';
        g.textAlign = 'center'
        if (tile.barrier.wall) {
            g.fillText(`wall`, x + 16, y + 16);
        }
        if (tile.barrier.transparent) {
            g.fillText(`tr`, x + 10, y + 16);
        }
        if (tile.barrier.half_height) {
            g.fillText(`hh`, x + 22, y + 16);
        }



    }
}