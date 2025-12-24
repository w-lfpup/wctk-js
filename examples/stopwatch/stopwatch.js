/*
    Custom Element with performant and "asynchronous" renders
    on the microtask queue.
*/
import { Wc, Microtask } from "wctk";
class Stopwatch extends HTMLElement {
    #wc = new Wc({ host: this });
    #rc = new Microtask({ host: this, callback: this.#render });
    #state = getStateFromShadowDOM(this.#wc.shadowRoot);
    update(timestamp) {
        if (!this.#state || timestamp < this.#state.prevTimestamp)
            return;
        this.#state.count += (timestamp - this.#state.prevTimestamp) * 0.001;
        this.#state.prevTimestamp = timestamp;
        // push render to microtask queue
        this.#rc.queue();
    }
    #render() {
        if (this.#state)
            this.#state.el.textContent = this.#state.count.toFixed(2);
    }
}
function getStateFromShadowDOM(shadowRoot) {
    let el = shadowRoot.querySelector("span");
    if (el instanceof HTMLSpanElement) {
        return {
            el,
            count: parseInt(el.textContent ?? "0"),
            receipt: 0,
            prevTimestamp: performance.now(),
        };
    }
}
export { Stopwatch };
