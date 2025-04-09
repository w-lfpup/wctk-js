class Subscription {
    #connected = false;
    #cb;
    #affect;
    #subscribe;
    #unsubscribe;
    constructor(params) {
        let { host, callback, subscribe, unsubscribe } = params;
        this.#cb = callback.bind(host);
        this.#subscribe = subscribe;
        this.#unsubscribe = unsubscribe;
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        this.#affect = this.#subscribe(this.#cb);
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        this.#unsubscribe(this.#affect);
    }
}
export { Subscription };
