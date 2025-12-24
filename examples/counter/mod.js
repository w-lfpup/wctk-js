/*
    Custom Element with state and interactivity.
*/
import { Wc, Events } from "wctk";
class Counter extends HTMLElement {
    #wc = new Wc({ host: this });
    #ev = new Events({
        host: this,
        target: this.#wc.shadowRoot,
        connected: true,
        callbacks: {
            click: this.#onClick,
        },
    });
    #state = getStateFromDOM(this.#wc.shadowRoot);
    #onClick(e) {
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
