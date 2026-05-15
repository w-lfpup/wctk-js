import { Wc, Microtask } from "wctk";
class Stopwatch extends HTMLElement {
    #wc = new Wc({ host: this });
    #rc = new Microtask(this.#render.bind(this));
    #state = getStateFromShadowDOM(this.#wc.shadowRoot);
    #render() {
        let { el } = this.#state;
        if (el)
            el.textContent = this.#state.count.toFixed(2);
    }
    #update = this.#undboundUpdate.bind(this);
    #undboundUpdate(now) {
        this.#state.count += (now - this.#state.prevTimestamp) * 0.001;
        this.#state.prevTimestamp = now;
        this.#rc.queue();
        this.#state.receipt = window.requestAnimationFrame(this.#update);
    }
    start() {
        this.#state.prevTimestamp = performance.now();
        this.#state.receipt = window.requestAnimationFrame(this.#update);
    }
    pause() {
        if (this.#state.receipt)
            this.#state.receipt = window.cancelAnimationFrame(this.#state.receipt);
    }
    stop() {
        if (this.#state.receipt)
            window.cancelAnimationFrame(this.#state.receipt);
        this.#state.count = 0;
        this.#rc.queue();
    }
}
function getStateFromShadowDOM(shadowRoot) {
    let el = shadowRoot.querySelector("span");
    let count = parseInt(el?.textContent ?? "0");
    if (Number.isNaN(count))
        count = 0;
    let prevTimestamp = performance.now();
    return {
        el,
        count,
        prevTimestamp,
        receipt: undefined,
    };
}
export { Stopwatch };
