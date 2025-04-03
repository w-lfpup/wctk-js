class Subscription {
    #connected = false;
    #cb;
    #affect;
    #onConnect;
    #onDisconnect;
    constructor(el, cb, onConnect, onDisconnect) {
        this.#cb = cb.bind(el);
        this.#onConnect = onConnect;
        this.#onDisconnect = onDisconnect;
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        this.#affect = this.#onConnect(this.#cb);
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        this.#onDisconnect(this.#affect);
    }
}
export { Subscription };
