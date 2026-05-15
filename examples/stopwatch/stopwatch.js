import { Wc, Microtask } from "wctk";
class Stopwatch extends HTMLElement {
    #wc = new Wc({ host: this });
    #rc = new Microtask(this.#render.bind(this));
    #state = getStateFromShadowDOM(this.#wc.shadowRoot);
    #render() {
        let { el } = this.#state;
        if (el)
            el.textContent = this.#state.count.toFixed(2);
        this.#rc.queue();
    }
    #update = this.#undboundUpdate.bind(this);
    #undboundUpdate(now) {
        this.#state.count += (now - this.#state.prevTimestamp) * 0.001;
        this.#state.prevTimestamp = now;
        this.#render();
        this.#state.receipt = window.requestAnimationFrame(this.#update);
    }
    start() { }
    pause() { }
    stop() { }
}
function getStateFromShadowDOM(shadowRoot) {
    let el = shadowRoot.querySelector("span");
    return {
        el,
        count: parseInt(el?.textContent ?? "0"),
        prevTimestamp: performance.now(),
        receipt: -1,
    };
}
export { Stopwatch };
