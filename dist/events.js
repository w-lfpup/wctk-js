export class Events {
    #connected = false;
    #callbacks = [];
    #target;
    constructor(params) {
        const { host, target, callbacks, connected } = params;
        this.#target = target ?? host;
        this.#callbacks = getBoundCallbacks(host, callbacks);
        if (connected)
            this.connect();
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        for (let [name, callback] of this.#callbacks) {
            this.#target.addEventListener(name, callback);
        }
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        for (let [name, callback] of this.#callbacks) {
            this.#target.removeEventListener(name, callback);
        }
    }
}
function getBoundCallbacks(host, callbacks) {
    let events = [];
    for (let [name, callback] of callbacks) {
        if (!callback.hasOwnProperty("prototype") && callback instanceof Function) {
            callback = callback.bind(host);
        }
        events.push([name, callback]);
    }
    return events;
}
