export class Events {
    #connected = false;
    #listeners = [];
    #target;
    constructor(params) {
        const { target, listeners, connected } = params;
        this.#target = target;
        this.#listeners = Object.entries(listeners);
        if (connected)
            this.connect();
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        for (let [name, listener] of this.#listeners) {
            this.#target.addEventListener(name, listener);
        }
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        for (let [name, listener] of this.#listeners) {
            this.#target.removeEventListener(name, listener);
        }
    }
}
