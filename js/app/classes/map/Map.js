import Tile from '../tiles/TileLoader.js';
import { assetsCtl as Assets } from '../gfx/Assets.js';
import GridEntity from './GridEntity.js';

function pixel_to_cube(x, y) {
    let q = Math.floor(x / Tile.R_WIDTH)
    let r = Math.floor(((y) - q * Tile.R_HEIGHT / 2) / Tile.R_HEIGHT)
    return { r: r, q: q, s: -q - r }
}

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
    #map_conf = {}
    #width = 5
    #height = 5
    #mapSteetAsset
    #map_size = {}
    hexGrid = []
    _handler
    #reachable = []
    constructor(map_name, handler) {
        this._handler = handler
        this.#loadMap(map_name)
        this._handler.map = this
        this.#generateHexGrid()

        console.log(this._handler.player)
        console.log(this.hexGrid)

    }

    // placeEntity(entity, q, r) {
    //     // let  = this.hexGrid.find(row => row.find(tile => tile.hex.q == q && tile.hex.r == r))
    //     // if (!tile)
    //     //     console.error('Out of bound')
    //     entity.setHex(q, r)

    // }
    findTile(q, r) {

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

        this.#mapSteetAsset = Assets.getAsset(this.#map_conf.bgAsset)

        this.#map_size.tileW = this.#mapSteetAsset.width
        this.#map_size.tileH = this.#mapSteetAsset.height


        this.#width = this.#map_conf.bg[0].length * this.#map_size.tileW
        this.#height = this.#map_conf.bg.length * this.#map_size.tileH

    }

    #generateHexGrid() {

        for (let y = 0, rowId = 0;
            y <= this.#height;
            y += Tile.R_HEIGHT, rowId++) {

            let shift = (rowId % 2) * Tile.R_WIDTH / 2
            for (let x = shift;
                x <= this.#width - Tile.R_WIDTH / 2;
                x += Tile.R_WIDTH) {
                let cx = (x - shift) / Tile.R_WIDTH,
                    cy = y / Tile.R_HEIGHT
                let tile = new HexTile(x, y)
                if (!this.hexGrid[cy])
                    this.hexGrid[cy] = []
                this.hexGrid[cy][cx] = tile

                tile.barrier = this.#map_conf.barriers
                    .find(el => el.q == tile.hex.q && el.r == tile.hex.r)

            }
        }
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
                g.cDrawImage(this.#mapSteetAsset[tile],
                    drawX, drawY,
                    this.#map_size.tileW, this.#map_size.tileH)
            })
        });
        // g.rotate((-dgr * Math.PI) / 180)
    }


    tick(dt) {
        this.#reachable = this.#cubeReachable(this._handler.player.cube, 6)
    }

    #cubeReachable(start, distance) {
        let visited = []
        visited.push(start)
        let fringes = []
        fringes.push([start])

        for (let d = 1; d <= distance; d++) {
            fringes[d - 1].forEach(cube => {
                if (!fringes[d])
                    fringes[d] = []
                for (let dir = 0; dir < 6; dir++) {
                    let neighbor_coord = cube.neighbor(dir)
                    let findHex = this.hexGrid.map(row =>
                        row.find(tile => neighbor_coord.equal(tile.cube))
                    ).find(item => item)

                    if (!findHex)
                        continue
                    let neighbor = findHex.cube
                    // let visitFind = visited.find(a => a.q == neighbor.q && a.r == neighbor.r && a.s == neighbor.s)
                    if (!findHex.barrier && !visited.includes(neighbor)) {
                        visited.push(neighbor)
                        fringes[d].push(neighbor)
                    }
                }
            })
        }
        let flatFringes = []
        fringes.forEach((row, dst) => {
            const rowWithDst = row.map(item => { return { cube: item, d: dst } })
            flatFringes.push(...rowWithDst)
        })
        return flatFringes
        // return fringes
    }


    getAngle(a, b) {
        if (a.x == 0 && a.y == 0)
            a.x = 1

        // Получим косинус угла по формуле
        let cos = (a.x * b.x + a.y * b.y) / (Math.sqrt(a.x * a.x + a.y * a.y) * Math.sqrt(b.x * b.x + b.y * b.y));
        // Вернем arccos полученного значения (в радианах!)
        return Math.acos(cos)
    }

    #checkVisibility(tile, g) {

        let visible = true
        let player = this._handler.player



        let shiftX = this._handler.camera.xOffset - 4,
            shiftY = this._handler.camera.yOffset
        let cursor = { x: tile.toPixel.x + (Tile.R_WIDTH / 2), y: tile.toPixel.y + (Tile.R_HEIGHT / 2) }


        // g.fillStyle = '#00ff00';
        // g.fillRect(
        //     cursor.x - shiftX - 4,
        //     cursor.y - shiftY - 4, 8, 8)

        let xDirection = -((tile.toPixel.x - player.toPixel.x) / 50)
        let yDirection = -((tile.toPixel.y - player.toPixel.y) / 50)
        let distHexPlayer = player.distanceTo(tile)


        let tmpCube = pixel_to_cube(cursor.x, cursor.y)
        do {
            distHexPlayer = player.cube.distanceTo(tmpCube)
            if (!distHexPlayer)
                continue

            let findBarrier = this.#map_conf.barriers.find(item => {
                return item.q == tmpCube.q && item.r == tmpCube.r
            })

            if (findBarrier) {
                visible = false
                break
            }
            // //уменьшаем координаты пока не сменится гекс
            let prevTmpCube = { ...tmpCube }
            while (prevTmpCube.q == tmpCube.q && prevTmpCube.r == tmpCube.r) {
                cursor.x += xDirection
                cursor.y += yDirection

                tmpCube = pixel_to_cube(cursor.x, cursor.y)
                // g.fillStyle = '#ff0000';
                // g.fillRect(
                //     cursor.x - shiftX,
                //     cursor.y - shiftY, 1, 1)
            }

        } while (distHexPlayer > 0 && distHexPlayer < 51)

        return visible
    }

    #drawLineFromCursor(g) {
        let tile = this._handler.mouseManager.gridEntity

        let player = this._handler.player



        let shiftX = this._handler.camera.xOffset - 4,
            shiftY = this._handler.camera.yOffset
        let cursor = { x: player.toPixel.x + (Tile.R_WIDTH / 2), y: player.toPixel.y + (Tile.R_HEIGHT / 2) }


        // g.fillStyle = '#00ff00';
        // g.fillRect(
        //     cursor.x - shiftX - 4,
        //     cursor.y - shiftY - 4, 8, 8)
        let distHexPlayer = player.distanceTo(tile)
        let xDirection = ((tile.toPixel.x - player.toPixel.x) / (distHexPlayer * 7))
        let yDirection = ((tile.toPixel.y - player.toPixel.y) / (distHexPlayer * 7))



        let tmpCube = pixel_to_cube(cursor.x, cursor.y)
        let distHexTile = tile.cube.distanceTo(tmpCube)
        let visible = true
        do {
            distHexTile = tile.cube.distanceTo(tmpCube)
            distHexPlayer = player.distanceTo(tile)
            if (!distHexPlayer)
                continue
            let findBarrier = this.#map_conf.barriers.find(item => {
                return item.q == tmpCube.q && item.r == tmpCube.r
            })
            if (findBarrier)
                visible = false

            // //уменьшаем координаты пока не сменится гекс
            let prevTmpCube = { ...tmpCube }
            while (prevTmpCube.q == tmpCube.q && prevTmpCube.r == tmpCube.r) {
                cursor.x += xDirection
                cursor.y += yDirection

                tmpCube = pixel_to_cube(cursor.x, cursor.y)

                if (!visible)
                    g.fillStyle = '#ffff00';
                else
                    g.fillStyle = '#00ff00';

                g.fillRect(
                    cursor.x - shiftX,
                    cursor.y - shiftY, 1, 1)
            }

        } while (distHexTile > 0 && distHexTile < 51)


    }

    #renderTile(g, tile, x, y) {

        let distHexPlayer = this._handler.player.distanceTo(tile)
        tile.visible = this.#checkVisibility(tile, g)

        let mm = this._handler.mouseManager
        let distHexMouse = mm.gridEntity.distanceTo(tile)
        let distPlayerMouse = this._handler.player.distanceTo(mm.gridEntity)


        let currentReachable = this.#reachable.find(rItem => rItem.cube.equal(tile.cube))

        if (distHexPlayer == 0) {

        } else {
            if (tile.barrier) {
                Tile.barrierTile.render(g, x, y);
                return
            }

            if (currentReachable) {
                // if (distHexPlayer<=5) {
                if (distHexMouse == 0) {
                    Tile.selectTile.render(g, x, y);
                }
                else {
                    if (tile.visible) {
                        Tile.canMoveTile.render(g, x, y);
                    } else {
                        Tile.notVisibleTile.render(g, x, y);
                    }
                }
                // Tile.canMoveTile.render(g, x, y);
                g.font = 'bold 15px Jura'
                g.fillStyle = '#000000';
                g.textAlign = 'center'
                g.fillText(`<${currentReachable.d}>`, x + 22, y + 16);

            }
            else {
                if (distHexMouse == 0)
                    Tile.barrierTile.render(g, x, y);
                else if (!tile.visible)
                    Tile.notVisibleTile.render(g, x, y);

            }

        }

        // g.font = '8px monospace'
        // g.fillStyle = '#fff';
        // g.textAlign = 'center'
        // g.fillText(`${tile.hex.q}:${tile.hex.r}:${tile.cube.s}`, x + 20, y + 15);
        // g.fillText(`<${distHexPlayer}>`, x + 20, y + 25);
    }

    drawHexagon(g, x, y) {
        let a = 2 * Math.PI / 6;
        let r = 18;
        let ctx = g
        ctx.beginPath();
        for (var i = 0; i < 6; i++) {
            ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
        }
        ctx.closePath();
        ctx.stroke();
    }
    render(g) {

        let xOffset = this._handler.camera.xOffset
        let yOffset = this._handler.camera.yOffset

        let xStart = Math.max(0, Math.round(xOffset))
        let yStart = Math.max(0, Math.round(yOffset))
        let xEnd = Math.min(this.#width, xOffset + this._handler.width)
        let yEnd = Math.min(this.#height, yOffset + this._handler.height)

        this.#render_background(g, xOffset, yOffset)

        this.hexGrid.forEach((row, r) => {
            row.forEach((tile, q) => {

                let pC = tile.toPixel
                if (pC.x < xStart - Tile.R_WIDTH || pC.x > xEnd)
                    return
                if (pC.y < yStart - Tile.R_HEIGHT || pC.y > yEnd + Tile.R_HEIGHT)
                    return

                // this.drawHexagon(g, pC.x - xOffset, pC.y - yOffset)
                // let txtr = Assets.getAsset('testHex').defCrop
                // g.cDrawImage(txtr, pC.x - xOffset,  pC.y - yOffset, 44, 32);
                this.#renderTile(g, tile, pC.x - xOffset, pC.y - yOffset)
            })
        })

        this.#drawLineFromCursor(g)
        // let wM = 210
        // g.beginPath();
        // g.moveTo(wM, 0);
        // g.lineTo(this._handler.width - wM, this._handler.height);
        // g.moveTo(wM, this._handler.height);
        // g.lineTo(this._handler.width - wM, 0);
        // g.stroke();

    }


    get height() {
        return this.#height
    }
    get width() {
        return this.#width
    }
}