import { Wc, Events } from "wctk";

class Counter extends HTMLElement {
	#wc = new Wc(this);
	#ev = new Events({
		bind: this,
		callbacks: [["click", this.#clickHandler]],
	});

	#state = getStateFromDOM(this.#wc.shadowRoot);

	#clickHandler(e) {
		if (!this.#state) return;

		let increment = getIncrement(e);
		if (increment) {
			this.#state.count += increment;
			this.#state.span.textContent = this.#state.count;
		}
	}
}

function getStateFromDOM(shadowRoot) {
	let slot = shadowRoot.querySelector("slot:not([name])");

	for (let el of slot.assignedNodes()) {
		if (el instanceof HTMLSpanElement) {
			return { span: el, count: parseInt(el.textContent) };
		}
	}
}

function getIncrement(e) {
	// could be replaced by e.originalTarget
	// only works in firefox though
	for (let node of e.composedPath()) {
		if (!(node instanceof HTMLButtonElement)) continue;

		if ("increase" === node.getAttribute("slot")) {
			return 1;
		}
		if ("decrease" === node.getAttribute("slot")) {
			return -1;
		}
	}
}

customElements.define("counter-wc", Counter);
