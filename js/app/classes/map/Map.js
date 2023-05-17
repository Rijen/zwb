import Tile from '../tiles/TileLoader.js';
import { assetsCtl as Assets } from '../gfx/Assets.js';
import Coords from './Coords.js';


export default class Map {
    #map_conf = {}
    #width = 5
    #height = 5
    #mapSteetAsset
    #grid_size = {}
    _handler
    constructor(map_name, handler) {
        this._handler = handler
        this.#loadMap(map_name)
        this._handler.map = this
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

        this.#grid_size.tileW = this.#mapSteetAsset.width
        this.#grid_size.tileH = this.#mapSteetAsset.height


        this.#width = this.#map_conf.bg[0].length * this.#grid_size.tileW
        this.#height = this.#map_conf.bg.length * this.#grid_size.tileH
        console.log(this._handler.player)
        // this.#tiles_x = this.#width/42
        // this.#tiles_y = this.#height/24

    }

    #render_background(g, xOffset, yOffset) {

        g.textAlign = "left"
        g.font = '10px Jura'
        g.fillStyle = '#fff';
        this.#map_conf.bg.forEach((row, y) => {
            row.forEach((tile, x) => {
                let drawX = x * this.#grid_size.tileW - xOffset
                let drawY = y * this.#grid_size.tileH - yOffset
                g.cDrawImage(this.#mapSteetAsset[tile],
                    drawX, drawY,
                    this.#grid_size.tileW, this.#grid_size.tileH)
                // g.fillText(`tile ${tile}`, drawX + 25, drawY + 25);
            })
        });
    }


    #tileStat(x, y) {

    }
    tick(dt) {

    }

    #renderTile(g, x, y, coords) {

        let d = Coords.hex_distance(this._handler.player.hexCoords, coords)

        let mm = this._handler.mouseManager
        let d2 = Coords.hex_distance(mm.hexCoords, coords)
        let d3 = Coords.hex_distance(mm.hexCoords, this._handler.player.hexCoords)
        if (d == 0) {

        } else {
            // console.log(posX,posY,d)
            if (d <= 4) {
                if (d2 == 0) {
                    Tile.tiles[1].render(g, x, y);
                    g.font = 'bold 15px Jura'
                    g.fillStyle = '#000000';
                    g.textAlign = 'center'
                    g.fillText(`${d3*3}`, x + 20, y + 14);
                }
                else
                    Tile.tiles[2].render(g, x, y);
            }
            else
                if (d2 == 0)
                    Tile.tiles[0].render(g, x, y);

        }

    }

    render(g) {

        let xOffset = this._handler.camera.xOffset
        let yOffset = this._handler.camera.yOffset

        let xStart = Math.max(0, Math.round(this._handler.camera.xOffset / 42))
        let yStart = Math.max(0, Math.round(this._handler.camera.yOffset / 24))
        let xEnd = Math.min(this.#width, this._handler.camera.xOffset + this._handler.width)
        let yEnd = Math.min(this.#height, this._handler.camera.yOffset + this._handler.height)
        this.#render_background(g, xOffset, yOffset)

        g.font = 'bold 10px Jura'




        let xStartPixel = xStart * 42 - ((xStart * 42) % 42)
        let yStartPixel = yStart * 24 - yStart * 24 % 24
        // console.log(xStartPixel,yStartPixel)
        for (let x = xStartPixel, cx = xStart; x <= xEnd - 42; x += 42, cx++) {
            for (let y = yStartPixel, cy = yStart; y <= yEnd - 24; y += 24, cy++) {
                let drawX = x - xOffset
                if (cy % 2)
                    drawX -= 21
                let hexCoords = Coords.pixel_to_hex(x, y)
                let cubeCoord = Coords.hex_to_cube(hexCoords.r, hexCoords.q)


                g.globalAlpha = 0.5
                this.#renderTile(g, drawX, y - yOffset, hexCoords)
                g.globalAlpha = 1


                // g.fillStyle = '#000000';
                // g.textAlign = 'center'
                // g.fillText(`${hexCoords.q}:${hexCoords.r}`, drawX + 20, y + 14 - yOffset);

                // g.fillStyle = 'rgb(255,0,0)';
                // g.textAlign = 'left'
                // g.fillText(`${cubeCoord.y}`, drawX + 2, y + 11 - yOffset);
                // g.fillStyle = 'rgb(0,255,0)';
                // g.textAlign = 'right'
                // g.fillText(`${cubeCoord.x}`, drawX + 38, y + 11 - yOffset);
                // g.fillStyle = 'rgb(0,0,255)';
                // g.textAlign = 'center'
                // g.fillText(`${cubeCoord.z}`, drawX + 21, y + 24 - yOffset);

                // g.fillStyle = '#000000';
                // g.textAlign = 'left'
                // g.fillText(`r:${hexCoords.r}`, drawX + 2, y + 19 - yOffset);
                // g.textAlign = 'right'
                // g.fillText(`q:${hexCoords.q}`, drawX + 38, y + 19 - yOffset);

            }
        }

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