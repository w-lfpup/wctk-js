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
    let boundCallbacks = [];
    for (let [name, callback] of Object.entries(callbacks)) {
        if (callback instanceof Function &&
            !callback.hasOwnProperty("prototype")) {
            callback = callback.bind(host);
        }
        boundCallbacks.push([name, callback]);
    }
    return boundCallbacks;
}
