
import { assetsCtl as Assets } from '/js/app/classes/gfx/Assets.js';

export default class DebugUI {
    #handler
    #panel
    constructor(handler) {
        this.#handler = handler

        this.#panel = Assets.getAsset('msgPanel');
    }

    tick(dt) {
        this.dt = dt
    }

    render(g) {
        let startY = this.#handler.height - this.#panel.height-10
        g.cDrawImage(this.#panel.defCrop,
            10,
            startY,
            this.#panel.width, this.#panel.height)

        let mm = this.#handler.mouseManager

        let gridX = mm.mouseX + this.#handler.camera.xOffset
        let gridY = mm.mouseY + this.#handler.camera.yOffset

        let d3 = this.#handler.player.distanceTo(mm.gridEntity)

        g.fillStyle = '#3bd141';
        g.textAlign = 'left'
        g.font = '14px Jura'
        startY-=5
        g.fillText(`Screen`, 20, startY + 15);
        g.fillText(`X: ${mm.mouseX}`, 80, startY + 15);
        g.fillText(`Y: ${mm.mouseY}`, 130, startY + 15);
        g.fillText(`Map`, 20, startY + 30);
        g.fillText(`X: ${gridX}`, 80, startY + 30);
        g.fillText(`Y: ${gridY}`, 130, startY + 30);

        g.fillText(`Q: ${mm.gridEntity.cube.q}`, 20, startY + 60);
        g.fillText(`R: ${mm.gridEntity.cube.r}`, 60, startY + 60);
        g.fillText(`S: ${mm.gridEntity.cube.s}`, 100, startY + 60);
        g.fillText(`D: ${d3}`, 150, startY + 60);


       
        g.fillText(`FPS: ${Math.floor(1/this.dt)}`, 230, startY + 15);
        g.fillText(`Δt: ${this.dt*1000}`, 230, startY + 30);
    }
}