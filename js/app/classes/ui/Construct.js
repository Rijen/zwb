
import Button from '../gfx/Button.js'
import { assetsCtl as Assets, staticObjs as staticAssets } from '../gfx/Assets.js';

export default class Construct {
    #handler
    #mouseManager
    #btns = {}
    #staticObjs = {}
    constructor(handler) {
        this.#handler = handler

        this.#mouseManager = this.#handler.mouseManager

        this.#btns.clear = new Button(handler, 'Clear', 10, 10, true)
        this.#btns.wall = new Button(handler, 'Wall', 110, 10, true)
        this.#btns.trans = new Button(handler, 'Transparent', 210, 10, true)
        this.#btns.hh = new Button(handler, 'Half-height', 310, 10, true)
        this.#btns.print = new Button(handler, 'Print', 510, 10)

        this.#btns.clear.radioGroup = [
            this.#btns.wall, this.#btns.trans, this.#btns.hh
        ]
        this.#btns.wall.radioGroup = [
            this.#btns.clear, this.#btns.trans, this.#btns.hh
        ]
        this.#btns.trans.radioGroup = [
            this.#btns.clear, this.#btns.wall
        ]
        this.#btns.hh.radioGroup = [
            this.#btns.clear, this.#btns.wall
        ]

        this.#btns.print.onclick = this.#printBarriers


        $('#assetsContainer').show()
        // this.#staticObjs.barrels = Assets.getAsset('static.barrels');
        // this.#staticObjs.block = Assets.getAsset('static.block');
        // this.#staticObjs.bottle = Assets.getAsset('static.bottle');



        for (let [key, asset] of Object.entries(staticAssets)) {
            console.log(`${key}: ${asset}`);
            $('#assetsContainer').append($('<img/>', { 'src': asset.d.sheet.src, 'data-id': key }))
        }


    }
    #printBarriers = () => {
        let allBarriers = []
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

        })
        console.info('Barriers', JSON.stringify(allBarriers))
        // $('#output1').html(JSON.stringify(allBarriers))

    }

    tick(dt) {
        Object.values(this.#btns).forEach(btn => btn.tick(dt))

        if (this.#mouseManager.click == 'RMB') {
            let tile = this.#handler.map.findHex(this.#mouseManager.gridEntity.cube)
            if (tile)
                tile.barrier = null
        }
        if (this.#mouseManager.click == 'LMB') {

            let tile = this.#handler.map.findHex(this.#mouseManager.gridEntity.cube)
            if (tile) {
                // console.log(tile)

                if (this.#btns.clear.state == 'active') {
                    tile.barrier = null
                }
                if (this.#btns.wall.state == 'active') {
                    tile.barrier = { wall: true }
                }
                if (this.#btns.trans.state == 'active') {
                    tile.barrier = { transparent: true }
                    if (this.#btns.hh.state == 'active') {
                        tile.barrier = { transparent: true, half_height: true }
                    }
                }
                if (this.#btns.hh.state == 'active' && this.#btns.trans.state != 'active') {
                    tile.barrier = { half_height: true }
                }
            }


        }
    }

    render(g) {


        Object.values(this.#btns).forEach(btn => btn.render(g))


    }
}