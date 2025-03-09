class Subscription {
    #connected = false;
    #el;
    #affect;
    #onConnect;
    #onDisconnect;
    constructor(el, onConnect, onDisconnect) {
        this.#el = el;
        this.#onConnect = onConnect;
        this.#onDisconnect = onDisconnect;
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        this.#affect = this.#onConnect(this.#el);
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        this.#onDisconnect(this.#el, this.#affect);
    }
}
export { Subscription };
