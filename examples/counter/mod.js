import { Wc, Events } from "wctk";

function getStateFromDOM(shadowRoot) {
	let slot = shadowRoot.querySelector("slot");

	for (let el of slot.assignedNodes()) {
		if (el instanceof HTMLSpanElement) {
			return { el, count: parseInt(el.textContent) };
		}
	}
}

function getIncrement(e) {
	let { target } = e;
	if (target instanceof HTMLButtonElement) {
		return target.hasAttribute("increase") ? 1 : -1;
	}
}

/*
	Custom Element with state and interactivity.
*/
class Counter extends HTMLElement {
	#wc = new Wc({ host: this });
	#ev = new Events({
		host: this,
		target: this.#wc.shadowRoot,
		connected: true,
		callbacks: [["click", this.#clickHandler]],
	});

	#state = getStateFromDOM(this.#wc.shadowRoot);

	#clickHandler(e) {
		let increment = getIncrement(e);
		if (increment) {
			this.#state.count += increment;
			this.#state.el.textContent = this.#state.count;
		}
	}
}

customElements.define("counter-wc", Counter);
