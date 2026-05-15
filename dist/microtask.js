export class Microtask {
    #queued = false;
    #callback;
    queue = this.#queue.bind(this);
    constructor(callback) {
        this.#callback = callback;
    }
    #queue() {
        if (this.#queued)
            return;
        this.#queued = true;
        // could this be a bound function? less function creation
        queueMicrotask(() => {
            this.#queued = false;
            this.#callback();
        });
    }
}
