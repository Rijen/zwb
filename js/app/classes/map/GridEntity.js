import Tile from "../tiles/Tile.js"



export default class GridEntity {
    #hex
    #cube
    #handler
    #x
    #y
    constructor(x, y, handler) {
        this.#handler = handler
        this.setPixel(x, y)
    }

    get hex() { return this.#hex }
    get cube() { return this.#cube }


    /**
     * Возвращает кубические координаты для пикселя.
     * (Не объект Cube)
     * @param {integer} x 
     * @param {integer} y 
     * @returns 
     */
    static pixel2cube(x, y) {
        let q = Math.floor(x / Tile.R_WIDTH)
        let r = Math.floor(((y) - q * Tile.R_HEIGHT / 2) / Tile.R_HEIGHT)
        return { r: r, q: q, s: -q - r }
    }
    static hex2pixel(coord) {
        let y = coord.r * Tile.R_HEIGHT + (coord.q * Tile.R_HEIGHT / 2)
        let x = coord.q * Tile.R_WIDTH
        // let y = this.r * Tile.R_HEIGHT
        // let x = this.q * Tile.R_WIDTH + (this.r * Tile.R_WIDTH / 2)

        return { x: x, y: y }
    }


    setPixel(x, y) {
        this.#x = x
        this.#y = y
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
        let pCoords = this.toPixel
        this.#x = pCoords.x + Tile.TILEWIDTH / 2
        this.#y = pCoords.y + Tile.TILEHEIGHT-8
    }
    /**
     * Положение текущей ячейки в гексах
     * @returns {Object} {x,y}
     */
    get toPixel() {
        return this.#hex.toPixel
    }

    get x() {
        return this.#x
    }
    get y() {
        return this.#y
    }

    /**
     * Дистанция от текущей ячейки до указанной
     * @param {GridEntity} dst 
     * @returns {integer}
     */
    distanceTo(dst) {
        return this.#cube.distanceTo(dst.cube)
    }

    /**
     * Возвращает массив координат доступных из текущей ячейки
     * с учётом барьеров
     * @param {integer} distance 
     * @returns {array[{q,r,d}]} (координаты не инстанс Cube)
     */
    cubeReachable(distance) {
        let visited = [],
            fringes = [];

        visited.push(this.cube)
        fringes.push([this.cube])

        for (let d = 1; d <= distance; d++) {
            fringes[d - 1].forEach(cube => {
                if (!fringes[d])
                    fringes[d] = []
                for (let dir = 0; dir < 6; dir++) {
                    let neighbor_coord = cube.neighbor(dir)
                    let findHex = this.#handler.map.findHex(neighbor_coord)

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
    }


    /**
     * Просчитывает луч от текущей клетки до указанной.
     * Если на пути нет препятсвия, возвращает null, иначе HexTile
     * @param {GridEntity} dst 
     * @returns {null|HexTile}
     */
    calculateHexRay(dst) {
        let barrier = false
        let src = this

        let dstPixel = dst.toPixel,
            srcPixel = src.toPixel
        let cursor = { x: srcPixel.x + (Tile.R_WIDTH / 2), y: srcPixel.y + (Tile.R_HEIGHT / 2) }



        let tmpCube = GridEntity.pixel2cube(cursor.x, cursor.y)
        let hexDistance = dst.cube.distanceTo(tmpCube)
        if (!hexDistance)
            return null

        let xDirection = ((dstPixel.x - srcPixel.x) / (hexDistance * 3))
        let yDirection = ((dstPixel.y - srcPixel.y) / (hexDistance * 3))

        while (hexDistance) {
            // уменьшаем координаты пока не сменится гекс
            let prevTmpCube = { ...tmpCube }
            while (prevTmpCube.q == tmpCube.q && prevTmpCube.r == tmpCube.r) {
                cursor.x += xDirection
                cursor.y += yDirection
                tmpCube = GridEntity.pixel2cube(cursor.x, cursor.y)

            }

            hexDistance = dst.cube.distanceTo(tmpCube)
            let findHex = this.#handler.map.findHex(tmpCube)

            if (findHex && findHex.barrier && !findHex.barrier.transparent && !findHex.barrier.wall) {
                barrier = findHex
                break
            }
        }


        return barrier
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
