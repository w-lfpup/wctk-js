export class Microtask {
    #queued = false;
    #callback;
    #microtask = this.#unboundMicrotask.bind(this);
    queue = this.#queue.bind(this);
    constructor(callback) {
        this.#callback = callback;
    }
    #queue() {
        if (this.#queued)
            return;
        this.#queued = true;
        window.queueMicrotask(this.#microtask);
    }
    #unboundMicrotask() {
        this.#queued = false;
        this.#callback();
    }
}
