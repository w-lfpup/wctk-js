export class Microtask {
    #queued = false;
    #callback;
    constructor(callback) {
        this.#callback = callback;
    }
    queue = this.#queue.bind(this);
    #queue() {
        if (this.#queued)
            return;
        this.#queued = true;
        window.queueMicrotask(this.#microtask);
    }
    #microtask = this.#unboundMicrotask.bind(this);
    #unboundMicrotask() {
        this.#queued = false;
        this.#callback();
    }
}
