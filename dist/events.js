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
    #el;
    #events = [];
    #targetEl;
    constructor(params) {
        const { host, target, callbacks } = params;
        this.#el = host;
        this.#targetEl = target ?? host;
        this.#events = bindCallbacks(this.#el, callbacks);
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        for (let [name, callback] of this.#events) {
            this.#targetEl.addEventListener(name, callback);
        }
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        for (let [name, callback] of this.#events) {
            this.#targetEl.removeEventListener(name, callback);
        }
    }
}
export { Events };
