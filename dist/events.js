export class Events {
    #connected = false;
    #callbacks = [];
    #target;
    constructor(params) {
        const { target, callbacks, connected } = params;
        this.#target = target;
        this.#callbacks = Object.entries(callbacks);
        if (connected)
            this.connect();
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        for (let [name, callback] of this.#callbacks) {
            this.#target.addEventListener(name, callback);
        }
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        for (let [name, callback] of this.#callbacks) {
            this.#target.removeEventListener(name, callback);
        }
    }
}
