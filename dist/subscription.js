export class Subscription {
    #callback;
    #affect;
    #subscribe;
    #unsubscribe;
    constructor(params) {
        let { host, callback, connected, subscribe, unsubscribe } = params;
        this.#subscribe = subscribe;
        this.#unsubscribe = unsubscribe;
        this.#callback = callback;
        if (callback instanceof Function && !callback.hasOwnProperty("prototype")) {
            this.#callback = callback.bind(host);
        }
        if (connected)
            this.connect();
    }
    connect() {
        if (!this.#affect)
            this.#affect = this.#subscribe(this.#callback);
    }
    disconnect() {
        if (this.#affect)
            this.#unsubscribe(this.#affect);
    }
}
