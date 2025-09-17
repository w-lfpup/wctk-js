export class Microtask {
    #queued = false;
    #callback;
    constructor(params) {
        let { host, callback } = params;
        this.queue = this.queue.bind(this);
        this.#callback = callback;
        if (callback instanceof Function && !callback.hasOwnProperty("prototype")) {
            this.#callback = callback.bind(host);
        }
    }
    queue() {
        if (this.#queued)
            return;
        this.#queued = true;
        queueMicrotask(() => {
            this.#queued = false;
            this.#callback();
        });
    }
}
