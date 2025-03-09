class Render {
    #el;
    #queued = false;
    constructor(el) {
        this.#el = el;
    }
    get queued() {
        return this.#queued;
    }
    render() {
        if (this.#queued)
            return;
        this.#queued = true;
        queueMicrotask(() => {
            this.#queued = false;
            this.#el.render();
        });
    }
}
export { Render };
