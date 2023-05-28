
export default class Camera {
    #xOffset;
    #yOffset;
    #handler;
    #moved = false;
    constructor(handler, xOffset, yOffset) {
        this.#xOffset = xOffset
        this.#yOffset = yOffset
        this.#handler = handler
        this.speed = 300
        this.xMove = 0;
        this.yMove = 0;
    }

    centerOnEntity(e) {
        this.#xOffset = e.x - this.#handler.width / 2// + e.width / 2;
        this.#yOffset = e.y - this.#handler.height / 2 //+ e.height - 10;
        this.#checkMapBorder()
    }
    move(xAmt, yAmt) {
        this.#xOffset += xAmt
        this.#yOffset += yAmt
        this.#checkMapBorder()
    }
    get moved() {
        return this.#moved;
    }
    tick(_dt) {
        this.#getInput(_dt)
        this.move(this.xMove, this.yMove)
        this.#moved = false
        if (this.xMove || this.yMove)
            this.#moved = true
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
            this.#xOffset > this.#handler.map.width - this.#handler.width//+200
        ) {
            this.#xOffset = this.#handler.map.width - this.#handler.width//+200
        }
        if (this.#yOffset < -75)
            this.#yOffset = -75
        else if (
            this.#yOffset > this.#handler.map.height - this.#handler.height//+130
        ) {
            this.#yOffset = this.#handler.map.height - this.#handler.height//+130
        }
    }

    get xOffset() {
        return parseInt(this.#xOffset)//-30
    }
    get yOffset() {
        return parseInt(this.#yOffset)//-30
    }

    set xOffset(offset) {
        this.#xOffset = offset
    }
    set yOffset(offset) {
        this.#xOffset = offset
    }

}