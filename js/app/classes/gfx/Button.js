import { assetsCtl as Assets } from '../gfx/Assets.js';

export default class Button {
    #asset
    #state = 'default'
    #text
    #handler
    #mouseManager
    #square = {}
    #hover = false
    #radio = false
    #radioGroup = []

    #onclick = null
    constructor(handler, text, x, y, radio) {
        this.#asset = Assets.getAsset('buttons');
        this.#handler = handler
        this.#mouseManager = this.#handler.mouseManager
        this.#text = text
        this.#square.startX = x
        this.#square.startY = y
        this.#square.endX = x + this.#asset.width
        this.#square.endY = y + this.#asset.height

        this.#radio = radio ? radio : false
    }

    set state(state) {
        this.#state = state
    }
    get state() {
        return this.#state
    }

    set radioGroup(arr) {
        this.#radioGroup = arr
    }
    set onclick(fn) {
        this.#onclick = fn
    }

    tick(dt) {
        let mouseOverBtn = this.#mouseManager.mouseX >= this.#square.startX && this.#mouseManager.mouseX <= this.#square.endX &&
            this.#mouseManager.mouseY >= this.#square.startY && this.#mouseManager.mouseY <= this.#square.endY

        if (this.#state == 'default') {
            this.#hover = mouseOverBtn
        }
        // if (this.#state == 'active' && !this.#radio)
        //     this.#state = 'default'

        if (this.#mouseManager.click == 'LMB' && mouseOverBtn) {
            if (this.#radio) {
                this.#radioGroup.forEach(e => e.state = 'default')
                this.#state = this.#state == 'active' ? 'default' : 'active'
            } else {
                if (this.#onclick)
                    this.#onclick()
            }
            this.#mouseManager.stopPropagation()
        }
    }

    render(g) {
        g.fillStyle = '#3bd141';
        g.textAlign = 'center'
        g.font = '14px Jura'

        g.cDrawImage(
            (this.#state == 'active' || this.#hover) ? this.#asset.active : this.#asset.default,
            this.#square.startX,
            this.#square.startY,
            this.#asset.width, this.#asset.height)
        g.fillText(this.#text, this.#square.startX + 46, 24);
    }
}
