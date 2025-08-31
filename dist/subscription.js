export class Subscription {
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
        if (this.#affects)
            return;
        this.#affects = [];
        for (let callback of this.#callbacks) {
            this.#affects.push(this.#subscribe(callback));
        }
    }
    disconnect() {
        if (this.#affects)
            for (let callback of this.#affects) {
                this.#unsubscribe(callback);
            }
    }
}
function getBoundCallbacks(host, callbacks) {
    let bounded = [];
    for (let callback of callbacks) {
        if (callback instanceof Function && !callback.hasOwnProperty("prototype")) {
            callback = callback.bind(host);
        }
        bounded.push(callback);
    }
    return bounded;
}
