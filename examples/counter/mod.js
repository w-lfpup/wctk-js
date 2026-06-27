import { Wc, Events } from "wctk";
class Counter extends HTMLElement {
    #wc = new Wc({ host: this });
    #ev = new Events({
        connected: true,
        target: this.#wc.shadowRoot,
        listeners: {
            click: this.#clickHandler.bind(this),
        },
    });
    #state = getStateFromDOM(this.#wc.shadowRoot);
    #clickHandler(e) {
        let increment = getIncrement(e);
        if (increment) {
            this.#state.count += increment;
            let el = this.#state.el;
            if (el)
                el.textContent = this.#state.count.toString();
        }
    }
}
function getStateFromDOM(shadowRoot) {
    let slot = shadowRoot.querySelector("slot");
    let el;
    if (slot)
        for (let slotted of slot.assignedNodes()) {
            if (slotted instanceof HTMLSpanElement) {
                el = slotted;
            }
        }
    let count = parseInt(el?.textContent ?? "0");
    if (Number.isNaN(count))
        count = 0;
    return { el, count };
}
function getIncrement(e) {
    if (e.target instanceof HTMLButtonElement) {
        return e.target.hasAttribute("increase") ? 1 : -1;
    }
}
customElements.define("counter-wc", Counter);
