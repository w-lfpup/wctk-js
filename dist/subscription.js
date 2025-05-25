class Subscription {
    #connected = false;
    #callbacks;
    #affects;
    #subscribe;
    #unsubscribe;
    constructor(params) {
        let { host, callbacks, connected, subscribe, unsubscribe } = params;
        this.#subscribe = subscribe;
        this.#unsubscribe = unsubscribe;
        this.#callbacks = getBoundCallbacks(host, callbacks);
        if (connected)
            this.connect();
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        this.#affects = [];
        for (let callback of this.#callbacks) {
            this.#affects.push(this.#subscribe(callback));
        }
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        if (this.#affects) {
            for (let callback of this.#affects) {
                this.#unsubscribe(callback);
            }
        }
    }
}
function getBoundCallbacks(host, callbacks) {
    let bounded = [];
    for (let callback of callbacks) {
        if (!callback.hasOwnProperty("prototype") && callback instanceof Function) {
            callback = callback.bind(host);
        }
        bounded.push(callback);
    }
    return bounded;
}
export { Subscription };
