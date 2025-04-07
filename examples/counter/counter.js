import { Wc, Events } from "wctk";

/*
	Custom Element with state and interactivity.
*/
class Counter extends HTMLElement {
	#wc = new Wc({ host: this });
	#ev = new Events({
		bind: this,
		target: this.#wc.shadowRoot,
		callbacks: [["click", this.#clickHandler]],
	});

	#state = getStateFromDOM(this.#wc.shadowRoot);

	#clickHandler(e) {
		if (!this.#state) return;

		let increment = getIncrement(e);
		if (increment) {
			this.#state.count += increment;
			this.#state.el.textContent = this.#state.count;
		}
	}
}

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
		if (target.hasAttribute("increase")) {
			return 1;
		}
		if (target.hasAttribute("decrease")) {
			return -1;
		}
	}
}

customElements.define("counter-wc", Counter);
