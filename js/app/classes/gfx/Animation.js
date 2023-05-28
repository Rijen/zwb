

export default class Animation {
    #frames = []
    #index
    #timer
    #lastTime
    #speed
    constructor(frames) {
        this.#frames = frames
        this.#index = 0
        this.#lastTime = Date.now()
        this.#timer = 0
    }

    tick() {
        this.#timer += Date.now() - this.#lastTime
        this.#lastTime = Date.now()

        if (this.#timer >= this.#speed) {
            this.#index++
            this.#timer = 0
            if (this.#index >= this.#frames.length)
                this.#index = 0
        }
    }

    get currentFrame(){
        this.#speed =this.#frames[this.#index].speed
        // this.#speed =30
        return this.#frames[this.#index].frame
    }
}