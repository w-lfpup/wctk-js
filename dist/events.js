function bindCallbacks(el, callbacks) {
    let events = [];
    for (let [name, cb] of callbacks) {
        let callback = cb;
        if (cb instanceof Function) {
            callback = cb.bind(el);
        }
        events.push([name, callback]);
    }
    return events;
}
class Events {
    #connected = false;
    #callbacks = [];
    #targetEl;
    constructor(params) {
        const { host, target, callbacks, connected } = params;
        this.#targetEl = target ?? host;
        this.#callbacks = bindCallbacks(host, callbacks);
        if (connected)
            this.connect();
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        for (let [name, callback] of this.#callbacks) {
            this.#targetEl.addEventListener(name, callback);
        }
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        for (let [name, callback] of this.#callbacks) {
            this.#targetEl.removeEventListener(name, callback);
        }
    }
}
export { Events };
