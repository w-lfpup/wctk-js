class Microtask {
    #queued = false;
    #cb;
    constructor(el, callback) {
        this.#cb = callback.bind(el);
    }
    get queued() {
        return this.#queued;
    }
    queue() {
        if (this.#queued)
            return;
        this.#queued = true;
        queueMicrotask(() => {
            this.#queued = false;
            this.#cb();
        });
    }
}
export { Microtask };
