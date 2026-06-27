/*
	Custom Element with state and interactivity.
*/

import { Wc, Events } from "wctk";

interface State {
	el: HTMLSpanElement | undefined;
	count: number;
}

class Counter extends HTMLElement {
	#wc = new Wc({ host: this });
	#ev = new Events({
		connected: true,
		target: this.#wc.shadowRoot,
		listeners: {
			click: this.#clickHandler.bind(this),
		},
	});

	#state: State = getStateFromDOM(this.#wc.shadowRoot);

	#clickHandler(e: PointerEvent) {
		let increment = getIncrement(e);
		if (increment) {
			this.#state.count += increment;
			let el = this.#state.el;
			if (el) el.textContent = this.#state.count.toString();
		}
	}
}

function getStateFromDOM(shadowRoot: ShadowRoot): State {
	let slot = shadowRoot.querySelector("slot");
	let el: HTMLSpanElement | undefined;
	if (slot)
		for (let slotted of slot.assignedNodes()) {
			if (slotted instanceof HTMLSpanElement) el = slotted;
		}

	return { el, count: parseInt(el?.textContent ?? "0") };
}

function getIncrement(e: Event) {
	if (e.target instanceof HTMLButtonElement) {
		return e.target.hasAttribute("increase") ? 1 : -1;
	}
}

customElements.define("counter-wc", Counter);
