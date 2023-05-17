
import { assetsCtl as Assets } from '/js/app/classes/gfx/Assets.js';
import Coords from '../map/Coords.js';
export default class DebugUI {
    #handler
    #panel
    constructor(handler) {
        this.#handler = handler

        this.#panel = Assets.getAsset('msgPanel');
    }

    tick(dt) {

    }

    render(g) {
        let startY = this.#handler.height - this.#panel.height - 10
        g.cDrawImage(this.#panel.defCrop,
            10,
            startY,
            this.#panel.width, this.#panel.height)

        let mm = this.#handler.mouseManager

        let gridX = mm.mouseX + this.#handler.camera.xOffset
        let gridY = mm.mouseY + this.#handler.camera.yOffset

        let d3 = Coords.hex_distance(mm.hexCoords, this.#handler.player.hexCoords)

        g.fillStyle = '#3bd141';
        g.textAlign = 'left'
        g.font = '14px Jura'
        g.fillText(`MousePosition`, 30, startY + 20);
        g.fillText(`X: ${mm.mouseX}`, 140, startY + 20);
        g.fillText(`Y: ${mm.mouseY}`, 190, startY + 20);


        g.fillText(`Q: ${mm.hexCoords.q}`, 140, startY + 35);
        g.fillText(`R: ${mm.hexCoords.r}`, 190, startY + 35);
        g.fillText(`D: ${d3}`, 240, startY + 35);


        g.fillText(`X: ${gridX}`, 140, startY + 50);
        g.fillText(`Y: ${gridY}`, 190, startY + 50);
    }
}