import { Wc, Events } from "wctk";

class Counter extends HTMLElement {
	#wc = new Wc(this);
	#ev = new Events({
		bind: this,
		callbacks: [["click", this.#clickHandler]],
	});

	#state = getInitialState(this.#wc.shadowRoot);

	#clickHandler(e) {
		if (!this.#state) return;

		// could be replaced by e.originalTarget
		// only works in firefox
		for (let node of e.composedPath()) {
			if (!(node instanceof HTMLButtonElement)) continue;

			if ("increase" === node.getAttribute("slot")) {
				this.#state.count += 1;
			}
			if ("decrease" === node.getAttribute("slot")) {
				this.#state.count -= 1;
			}
		}

		if (this.#state.span) {
			this.#state.span.textContent = this.#state.count;
		}
	}
}

function getInitialState(shadowRoot) {
	let slot = shadowRoot.querySelector("slot:not([name])");

	for (let el of slot.assignedNodes()) {
		if (el instanceof HTMLSpanElement) {
			return { span: el, count: parseInt(el.textContent) };
		}
	}
}

customElements.define("counter-wc", Counter);
