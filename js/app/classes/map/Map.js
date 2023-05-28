import Tile from '../tiles/TileLoader.js';
import { assetsCtl as Assets } from '../gfx/Assets.js';
import GridEntity from './GridEntity.js';
import PriorityQueue from '../utils/PriorityQueue.js';
import BarrierLayer from './BarrierLayer.js';

class HexTile extends GridEntity {
    #barrier
    set barrier(val) {
        this.#barrier = val
    }
    get barrier() {
        return this.#barrier
    }
}

export default class Map {
    #handler
    #map_conf = {}
    #width = 0
    #height = 0
    #mapAsset
    #map_size = {}
    #hexGrid = {}

    #reachable = []
    #maxDistance = 6
    #leftDistance = this.#maxDistance
    #selectedPath = []
    //-------------------------
    #drawReachable = true
    //-------------------------
    #barrierLayer
    constructor(map_name, handler) {
        this.#handler = handler
        this.#loadMap(map_name)
        this.#handler.map = this
        this.#generateHexGrid()
        this.#barrierLayer = new BarrierLayer(this.#handler, this.#map_conf)
    }

    #loadMap(map_name) {
        let path = `/res/maps/${map_name}.json`

        let conf = ''
        $.ajax({
            url: path,
            dataType: "json",
            type: "get",
            async: false,
            success: function (_contents) {
                conf = _contents;
            },
            error: function () {
                alert("file:'" + path + " can not be loaded");
            }
        });

        this.#map_conf = conf

        this.#mapAsset = Assets.getAsset(this.#map_conf.bgAsset)

        this.#map_size.tileW = this.#mapAsset.width
        this.#map_size.tileH = this.#mapAsset.height


        this.#width = this.#map_conf.bg[0].length * this.#map_size.tileW
        this.#height = this.#map_conf.bg.length * this.#map_size.tileH

    }

    get hexGrid() {
        return this.#hexGrid
    }

    get selectedPath() {
        return this.#selectedPath
    }

    /**
     * @param {boolean} val
     */
    set drawReachable(val) {
        this.#drawReachable = val
    }
    get leftDistance() {
        return this.#leftDistance
    }
    set leftDistance(val) {
        this.#leftDistance = val
    }
    #generateHexGrid() {

        for (let y = 0, rowId = 0;
            y <= this.#height;
            y += Tile.R_HEIGHT, rowId++) {

            let shift = (rowId % 2) * Tile.R_WIDTH / 2
            for (let x = shift;
                x <= this.#width - Tile.R_WIDTH / 2;
                x += Tile.R_WIDTH) {

                let tile = new HexTile(x, y, this.#handler)
                tile.visible = true;
                this.#hexGrid['q' + tile.hex.q + 'r' + tile.hex.r] = tile

            }
        }
    }

    findHex(cube) {
        return this.#hexGrid[`q${cube.q}r${cube.r}`]
    }

    #render_background(g, xOffset, yOffset) {

        // let dgr = 25
        // g.rotate((dgr * Math.PI) / 180)
        g.textAlign = "left"
        g.font = '10px Jura'
        g.fillStyle = '#fff';
        this.#map_conf.bg.forEach((row, y) => {
            row.forEach((tile, x) => {
                let drawX = x * this.#map_size.tileW - xOffset
                let drawY = y * this.#map_size.tileH - yOffset
                g.cDrawImage(this.#mapAsset[tile],
                    drawX, drawY,
                    this.#map_size.tileW, this.#map_size.tileH)
            })
        });
        // g.rotate((-dgr * Math.PI) / 180)
    }


    tick(dt) {
        let mouseEntity = this.#handler.mouseManager.gridEntity

        if (!this.#handler.constructMode) {
            this.#selectedPath = this.findPath(this.#handler.player, mouseEntity.cube)
            //TODO - дистанция = ОД/цена перемешения
            if (this.#handler.player.posChanged) {
                this.#reachable = this.#handler.player.cubeReachable(this.#leftDistance)
                Object.values(this.#hexGrid).forEach(tile => {
                    tile.visible = !tile.calculateHexRay(this.#handler.player)
                })
            }
        }
    }


    #drawLineFromCursor(g) {
        let mouseEntity = this.#handler.mouseManager.gridEntity,
            player = this.#handler.player
        let dstHex = this.#handler.map.findHex(mouseEntity.cube)
        if (!dstHex || dstHex.reachable)
            return

        let barrier = player.calculateHexRay(mouseEntity)
        let dist = player.distanceTo(mouseEntity)
        let shiftX = this.#handler.camera.xOffset - Tile.TILEWIDTH / 2,
            shiftY = this.#handler.camera.yOffset - Tile.TILEHEIGHT / 2

        g.beginPath();

        g.moveTo(player.toPixel.x - shiftX, player.toPixel.y - shiftY);

        if (!barrier || barrier.transparent) {
            //TODO Прицельная дальность
            if (dist > 12)
                g.strokeStyle = '#ff0000aa';
            else
                g.strokeStyle = '#00ff00aa';
        } else
            g.strokeStyle = '#ffff00aa';

        g.lineTo(mouseEntity.toPixel.x - shiftX, mouseEntity.toPixel.y - shiftY);
        g.stroke();
    }


    #renderTile(g, tile, x, y) {

        if (tile.reachable) {
            // if (distHexPlayer<=5) {
            if (tile.path) {
                Tile.selectTile.render(g, x, y);
                Tile.canMoveTile.render(g, x, y);
                g.font = 'bold 13px Jura'
                g.fillStyle = '#000000';
                g.textAlign = 'center'
                g.fillText(`${tile.reachable.d}`, x + 16, y + 16);

            }
            else {
                if (!tile.visible) {
                    Tile.notVisibleTile.render(g, x, y);
                    g.globalAlpha = 0.5
                }

                Tile.canMoveTile.render(g, x, y);
                g.globalAlpha = 1
            }


        }
        else {
            if (!tile.visible)
                Tile.notVisibleTile.render(g, x, y);

        }



    }

    /**
     * Pixel in visible area
     * @param {Object{x,y}} pC 
     * @returns {bool}
     */
    pixelInCamera(pC) {
        let xOffset = this.#handler.camera.xOffset
        let yOffset = this.#handler.camera.yOffset

        let xStart = Math.max(0, Math.round(xOffset))
        let yStart = Math.max(0, Math.round(yOffset))
        let xEnd = Math.min(this.#width, xOffset + this.#handler.width)
        let yEnd = Math.min(this.#height, yOffset + this.#handler.height)

        if (pC.x < xStart - Tile.R_WIDTH || pC.x > xEnd - Tile.R_WIDTH)
            return false
        if (pC.y < yStart - Tile.R_HEIGHT || pC.y > yEnd + Tile.R_HEIGHT)
            return false
        return true
    }

    render(g) {

        let xOffset = this.#handler.camera.xOffset
        let yOffset = this.#handler.camera.yOffset

        this.#render_background(g, xOffset, yOffset)

        Object.values(this.#hexGrid).forEach(tile => {
            let pC = tile.toPixel
            if (!this.pixelInCamera(pC))
                return

            tile.reachable = false
            if (this.#drawReachable)
                tile.reachable = this.#reachable.find(rItem => rItem.cube.equal(tile.cube))

            this.#renderTile(g, tile, pC.x - xOffset, pC.y - yOffset)
            if (this.#handler.constructMode ) {
                this.#barrierLayer.renderTile(g, tile)
            }
            tile.path = false
        })

        if (!this.#handler.constructMode) {
            this.#drawLineFromCursor(g)
        }

        // this.findPath(g, this.#handler.player, { q: 13, r: -1 })

    }





    findPath(src, dst) {
        let maxDistance = this.#leftDistance
        let frontier = new PriorityQueue()
        let visited = []

        let came_from = {},
            cost_so_far = {}

        let dstHex = this.#handler.map.findHex(dst)
        if (!dstHex || !dstHex.reachable)
            return

        frontier.add(src.cube, 0)
        came_from[src.cube] = null
        cost_so_far[`${src.cube.q}:${src.cube.r}`] = 0

        let current = frontier.shift()
        do {

            for (let dir = 0; dir < 6; dir++) {

                let next = current.neighbor(dir)
                if (visited.find(e => e.q == next.q && e.r == next.r))
                    continue
                visited.push(next)
                if (!Object.values(came_from).find(e => e && e.q == next.q && e.r == next.r)) {

                    let findHex = this.#handler.map.findHex(next)
                    let distance = src.cube.distanceTo(next)
                    if (!findHex ||
                        findHex.barrier ||
                        !findHex.reachable ||
                        distance > maxDistance
                    )
                        continue

                    let new_cost = cost_so_far[`${current.q}:${current.r}`] + 1

                    if (!cost_so_far[`${next.q}:${next.r}`] || new_cost < cost_so_far[`${next.q}:${next.r}`]) {
                        cost_so_far[`${next.q}:${next.r}`] = new_cost
                        came_from[`${next.q}:${next.r}`] = current
                        let priority = new_cost + dst.distanceTo(next)
                        frontier.add(next, priority)
                    }

                }

            }
            current = frontier.shift()
            if (current && current.equal(dst))
                break
        } while (current)



        current = dst
        let path = []
        let step = 1
        while (current && !src.cube.equal(current)) {
            path.push(current)
            let findHex = this.#handler.map.findHex(current)
            findHex.path = step
            step++
            current = came_from[`${current.q}:${current.r}`]
            if (!current) {
                continue
            }

        }
        return path
    }

    get height() {
        return this.#height
    }
    get width() {
        return this.#width
    }
}