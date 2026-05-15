export class Subscription {
    #params;
    #affect;
    constructor(params) {
        this.#params = params;
        if (this.#params.connected)
            this.connect();
    }
    connect() {
        let { callback, subscribe } = this.#params;
        if (!this.#affect)
            this.#affect = subscribe(callback);
    }
    disconnect() {
        if (this.#affect)
            this.#params.unsubscribe(this.#affect);
    }
}
