import { Bind, Wc, Microtask } from "wctk";
/*
    Custom Element with performant and "asynchronous" renders
    on the microtask queue.
*/
export class Stopwatch extends HTMLElement {
    #wc = new Wc({ host: this });
    #rc = new Microtask({ host: this, callbacks: [this.#render] });
    #bc = new Bind({ host: this, callbacks: [this.update] });
    #state = getStateFromShadowDOM(this.#wc.shadowRoot);
    #render() {
        if (this.#state)
            this.#state.el.textContent = this.#state.count.toFixed(2);
    }
    update(timestamp) {
        if (this.#state) {
            this.#state.receipt = requestAnimationFrame(this.update);
            this.#state.count += (timestamp - this.#state.prevTimestamp) * 0.001;
            this.#state.prevTimestamp = timestamp;
        }
        // push render to microtask queue
        this.#rc.queue();
    }
    start() {
        if (!this.#state || this.#state.receipt)
            return;
        this.#state.receipt = requestAnimationFrame(this.update);
        this.#state.prevTimestamp = performance.now();
    }
    pause() {
        let state = this.#state;
        if (state && state.receipt)
            state.receipt = cancelAnimationFrame(state.receipt);
    }
}
function getStateFromShadowDOM(shadowRoot) {
    let el = shadowRoot.querySelector("span");
    if (el instanceof HTMLSpanElement) {
        return {
            el,
            count: parseInt(el.textContent ?? "0"),
            receipt: -1,
            prevTimestamp: performance.now(),
        };
    }
}
