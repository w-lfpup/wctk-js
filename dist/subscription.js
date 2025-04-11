class Subscription {
    #connected = false;
    #callback;
    #affect;
    #subscribe;
    #unsubscribe;
    constructor(params) {
        let { host, callback, connected, subscribe, unsubscribe } = params;
        this.#callback = callback.bind(host);
        this.#subscribe = subscribe;
        this.#unsubscribe = unsubscribe;
        if (connected)
            this.connect();
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        this.#affect = this.#subscribe(this.#callback);
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        this.#unsubscribe(this.#affect);
    }
}
export { Subscription };
