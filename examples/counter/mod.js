import { Wc, Events } from "wctk";
class Counter extends HTMLElement {
    #wc = new Wc({ host: this });
    #ev = new Events({
        target: this.#wc.shadowRoot,
        connected: true,
        listeners: {
            click: this.#clickHandler.bind(this),
        },
    });
    #state = getStateFromDOM(this.#wc.shadowRoot);
    #clickHandler(e) {
        if (!this.#state)
            return;
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
            if (slotted instanceof HTMLSpanElement)
                el = slotted;
        }
    return { el, count: parseInt(el?.textContent ?? "0") };
}
function getIncrement(e) {
    let { target } = e;
    if (target instanceof HTMLButtonElement) {
        return target.hasAttribute("increase") ? 1 : -1;
    }
}
customElements.define("counter-wc", Counter);
