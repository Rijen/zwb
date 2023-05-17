
class Coords {
    pixel_to_hex(x, y) {
        let r = Math.floor(y / 24)
        let q = Math.floor(((x) - r * 21) / 42)
        return { r: r, q: q }
    }

    hex_to_pixel(q, r) {
        let y = r * 24
        let x = q * 42 + (r * 21)
        //Позиционируем в центр-низ гекса
        y += 24
        x += 21
        return { x: x, y: y }
    }

    hex_to_cube(r, q) {
        return {
            x: q,
            z: r,
            y: -q - r
        }
    }

    hex_distance(a, b) {
        return this.cube_distance(this.hex_to_cube(a.r, a.q), this.hex_to_cube(b.r, b.q))
    }
    cube_distance(a, b) {
        return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.z - b.z))
    }
}
export default new Coords()