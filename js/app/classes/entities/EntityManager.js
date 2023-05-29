export default class EntityManager {
    #handler
    #player
    #entities = []

    constructor(handler) {
        this.#handler = handler
        this.#player = handler.player
    }

    tick(dt) {

    }

    render(g) {
        this.#entities.forEach(e => {
            e.render(g)
        })
    }

    addEntity(e) {
        this.#entities.push(e)
    }

    get entities() {
        return this.#entities
    }

}