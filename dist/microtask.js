export class Microtask {
    #queued = false;
    #callbacks;
    constructor(params) {
        this.queue = this.queue.bind(this);
        this.#callbacks = getBoundCallbacks(params);
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
function getBoundCallbacks(params) {
    let { host, callbacks } = params;
    let boundCallbacks = [];
    for (let callback of callbacks) {
        if (!callback.hasOwnProperty("prototype") && callback instanceof Function) {
            callback = callback.bind(host);
        }
        boundCallbacks.push(callback);
    }
    return boundCallbacks;
}
