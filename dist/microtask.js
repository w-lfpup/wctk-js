class Microtask {
    #queued = false;
    #callbacks = [];
    constructor(el, callbacks) {
        for (let callback of callbacks) {
            this.#callbacks.push(callback.bind(el));
        }
    }
    queue() {
        if (this.#queued)
            return;
        this.#queued = true;
        queueMicrotask(() => {
            this.#queued = false;
            for (let callback of this.#callbacks) {
                callback();
            }
        });
    }
}
export { Microtask };
