
import Button from '../gfx/Button.js'
import { assetsCtl as Assets, staticObjs as staticAssets } from '../gfx/Assets.js';
import Tile from '../tiles/Tile.js';

export default class Construct {
    #handler
    #mouseManager
    #btns = {}
    #activeAsset
    #rotateAsset
    constructor(handler) {
        this.#handler = handler

        this.#mouseManager = this.#handler.mouseManager

        this.#btns.wall = new Button(handler, 'Wall', 110, 10, true)
        this.#btns.trans = new Button(handler, 'Transparent', 210, 10, true)
        this.#btns.hh = new Button(handler, 'Half-height', 310, 10, true)
        this.#btns.print = new Button(handler, 'Print', 510, 10)


        this.#btns.wall.radioGroup = [
            this.#btns.trans, this.#btns.hh
        ]
        this.#btns.trans.radioGroup = [
            this.#btns.wall
        ]
        this.#btns.hh.radioGroup = [
            this.#btns.wall
        ]

        this.#btns.print.onclick = this.#printBarriers


        $('#assetsContainer').show()

        for (let [key, asset] of Object.entries(staticAssets)) {
            $('#assetsContainer').append($('<img/>', { 'src': asset.d.sheet.src, 'data-id': key }))
        }
        $('#assetsContainer img').on('click', (e) => {
            let $trg = $(e.currentTarget)
            this.#activeAsset = $trg.data('id')
            this.#rotateAsset = false
        })

    }
    #printBarriers = () => {
        let allBarriers = []
        let allDecor = []
        Object.values(this.#handler.map.hexGrid).forEach(e => {
            if (e.barrier) {
                let data = {
                    q: e.cube.q,
                    r: e.cube.r,
                    wall: e.barrier.wall,
                    transparent: e.barrier.transparent,
                    half_height: e.barrier.half_height,
                }

                allBarriers.push(data)
            }
            if (e.asset) {
                let data = {
                    q: e.cube.q,
                    r: e.cube.r,
                    asset: e.asset.asset,
                    rotate: e.asset.rotate
                }

                allDecor.push(data)
            }

        })
        console.info(`"barriers":${JSON.stringify(allBarriers)},\r"decor":${JSON.stringify(allDecor)}`)

    }

    tick(dt) {
        Object.values(this.#btns).forEach(btn => btn.tick(dt))

        if (this.#mouseManager.click == 'RMB') {
            let tile = this.#handler.map.findHex(this.#mouseManager.gridEntity.cube)
            if (tile) {
                tile.barrier = null
                tile.asset = null
            }
            this.#activeAsset = false
        }
        if (this.#mouseManager.click == 'LMB') {

            let tile = this.#handler.map.findHex(this.#mouseManager.gridEntity.cube)
            if (tile) {

                if (this.#btns.wall.state == 'active') {
                    tile.barrier = { wall: true }
                    this.#activeAsset = false
                }
                if (this.#btns.trans.state == 'active') {
                    tile.barrier = { transparent: true }
                    if (this.#btns.hh.state == 'active') {
                        tile.barrier = { transparent: true, half_height: true }
                    }
                    this.#activeAsset = false
                }
                if (this.#btns.hh.state == 'active' && this.#btns.trans.state != 'active') {
                    tile.barrier = { half_height: true }
                    this.#activeAsset = false
                }

                if (this.#activeAsset) {
                    tile.asset = { asset: this.#activeAsset, rotate: this.#rotateAsset }
                }
            }


        }
        if (this.#activeAsset && this.#handler.keyManager.keyR) {
            this.#rotateAsset = !this.#rotateAsset
            this.#handler.keyManager.stopPropagation()
        }
    }

    render(g) {
        if (this.#activeAsset) {
            let decoAsset = staticAssets[this.#activeAsset].d
            let mouseEntPixel = this.#mouseManager.gridEntity.toPixel

            let xOffset = this.#handler.camera.xOffset
            let yOffset = this.#handler.camera.yOffset
            if (this.#rotateAsset) {
                g.save();
                g.scale(-1, 1);
                g.cDrawImage(
                    decoAsset,
                    -mouseEntPixel.x + xOffset - decoAsset.width,
                    mouseEntPixel.y - yOffset,
                    decoAsset.width, decoAsset.height)
                g.restore();
            } else {
                g.cDrawImage(
                    decoAsset,
                    mouseEntPixel.x - xOffset,
                    mouseEntPixel.y - yOffset,
                    decoAsset.width, decoAsset.height)
            }
            g.fillStyle = 'rgba(0,200,200,0.9)';
            g.fillRect(
                mouseEntPixel.x - xOffset - 4 + Tile.TILEWIDTH / 2,
                mouseEntPixel.y - yOffset - 4 + Tile.TILEHEIGHT / 2, 8, 8)


        }

        Object.values(this.#btns).forEach(btn => btn.render(g))

    }
}