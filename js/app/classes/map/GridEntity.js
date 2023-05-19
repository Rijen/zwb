import Tile from "../tiles/Tile.js"



export default class GridEntity {
    #hex
    #cube
    constructor(x, y) {
        this.setPixel(x, y)
    }

    get hex() { return this.#hex }
    get cube() { return this.#cube }

    setPixel(x, y) {
        // let r = Math.floor(y / Tile.R_HEIGHT)
        // let q = Math.floor(((x) - r * Tile.R_WIDTH / 2) / Tile.R_WIDTH)
        let q = Math.floor(x / Tile.R_WIDTH)
        let r = Math.floor(((y) - q * Tile.R_HEIGHT / 2) / Tile.R_HEIGHT)
        this.#hex = new Hex(q, r)
        this.#cube = this.#hex.cube
    }
    setHex(q, r) {
        this.#hex = new Hex(q, r)
        this.#cube = this.#hex.cube
    }
    /**
     * Положение текущей ячейки в гексах
     * @returns {Object} {x,y}
     */
    get toPixel() {
        return this.#hex.toPixel
    }


    /**
     * Дистанция от текущей ячейки до указанной
     * @param {GridEntity} dst 
     * @returns {integer}
     */
    distanceTo(dst) {
        return this.#cube.distanceTo(dst.cube)
    }

}

export class Hex {

    #cube

    constructor(q, r, cube = false) {
        this.q = q
        this.r = r

        this.#cube = cube ? cube : new Cube(q, r, -q - r, this)
    }

    get cube() {
        return this.#cube
    }
    get toPixel() {
        let y = this.r * Tile.R_HEIGHT + (this.q * Tile.R_HEIGHT / 2)
        let x = this.q * Tile.R_WIDTH
        // let y = this.r * Tile.R_HEIGHT
        // let x = this.q * Tile.R_WIDTH + (this.r * Tile.R_WIDTH / 2)

        return { x: x, y: y }
    }

}

export class Cube {

    #hex
    constructor(q, r, s, hex = false) {
        this.q = q
        this.r = r
        this.s = s
        this.#hex = hex ? hex : new Hex(q, r, this)
    }

    get hex() {
        return this.#hex
    }

    distanceTo(dst) {
        let a = this,
            b = dst
        return Math.max(Math.abs(a.q - b.q), Math.abs(a.r - b.r), Math.abs(a.s - b.s))
    }

    #dirVec(dir) {
        return DIR_VECTORS[dir]
    }


    #add(vec) {
        return new Cube(this.q + vec.q, this.r + vec.r, this.s + vec.s)
    }
    /**
     * Возвращает координаты указанного направления
     * @param {integer} dir направление 0-5 
     * @returns {Cube}
     */
    neighbor(dir) {
        return this.#add(this.#dirVec(dir))
    }

    equal(cube) {
        return this.q == cube.q && this.r == cube.r && this.s == cube.s
    }
}
const DIR_VECTORS = [
    new Cube(+1, 0, -1), new Cube(+1, -1, 0), new Cube(0, -1, +1),
    new Cube(-1, 0, +1), new Cube(-1, +1, 0), new Cube(0, +1, -1),
]
