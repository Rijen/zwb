
export default class Camera {
    #xOffset;
    #yOffset;
    #handler;

    constructor(handler, xOffset, yOffset) {
        this.#xOffset = xOffset
        this.#yOffset = yOffset
        this.#handler = handler
        this.speed = 300
        this.xMove = 0;
        this.yMove = 0;
    }

    centerOnEntity(e) {
        this.#xOffset = e.toPixel.x - this.#handler.width / 2// + e.width / 2;
        this.#yOffset = e.toPixel.y - this.#handler.height / 2 //+ e.height - 10;
        this.#checkMapBorder()
    }
    move(xAmt, yAmt) {
        this.#xOffset += xAmt
        this.#yOffset += yAmt
        this.#checkMapBorder()
    }
    tick(_dt) {
        this.#getInput(_dt)
        this.move(this.xMove, this.yMove)
    }

    #getInput(_dt) {
        this.xMove = 0;
        this.yMove = 0;
        if (this.#handler.keyManager.up) {
            this.yMove = -this.speed * _dt;
        }
        if (this.#handler.keyManager.down) {
            this.yMove = this.speed * _dt;
        }
        if (this.#handler.keyManager.left) {
            this.xMove = -this.speed * _dt;
        }
        if (this.#handler.keyManager.right) {
            this.xMove = this.speed * _dt;
        }
    }

    #checkMapBorder() {
        if (this.#xOffset < 0)
            this.#xOffset = 0
        else if (
            this.#xOffset > this.#handler.map.width - this.#handler.width
        ) {
            this.#xOffset = this.#handler.map.width - this.#handler.width
        }
        if (this.#yOffset < 0)
            this.#yOffset = 0
        else if (
            this.#yOffset > this.#handler.map.height - this.#handler.height
        ) {
            this.#yOffset = this.#handler.map.height - this.#handler.height
        }
    }

    get xOffset() {
        return parseInt(this.#xOffset)
    }
    get yOffset() {
        return parseInt(this.#yOffset)
    }

    set xOffset(offset) {
        this.#xOffset = offset
    }
    set yOffset(offset) {
        this.#xOffset = offset
    }

}