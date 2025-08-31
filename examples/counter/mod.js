import { Wc, Events } from "wctk";
/*
    Custom Element with state and interactivity.
*/
class Counter extends HTMLElement {
    #wc = new Wc({ host: this });
    #ev = new Events({
        host: this,
        connected: true,
        callbacks: [["click", this.#clickHandler]],
    });
    #state = getStateFromDOM(this.#wc.shadowRoot);
    #clickHandler(e) {
        if (!this.#state)
            return;
        let increment = getIncrement(e);
        if (increment) {
            this.#state.count += increment;
            this.#state.el.textContent = this.#state.count.toString();
        }
    }
}
function getStateFromDOM(shadowRoot) {
    let slot = shadowRoot.querySelector("slot");
    if (slot)
        for (let el of slot.assignedNodes()) {
            if (el instanceof HTMLSpanElement) {
                return { el, count: parseInt(el.textContent ?? "0") };
            }
        }
}
function getIncrement(e) {
    let { target } = e;
    if (target instanceof HTMLButtonElement) {
        return target.hasAttribute("increase") ? 1 : -1;
    }
}
customElements.define("counter-wc", Counter);
