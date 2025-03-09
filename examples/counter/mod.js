import { Wc, Events } from "wctk";

class Counter extends HTMLElement {
	#wc = new Wc(this);
	#ev = new Events({
		bind: this,
		target: this.#wc.shadowRoot,
		callbacks: [["click", this.#clickHandler]],
	});

	#state = getStateFromShadowDOM(this.#wc.shadowRoot);

	#clickHandler(e) {
		if (!this.#state) return;

		let increment = getIncrement(e);
		if (increment) {
			this.#state.count += increment;
			this.#state.el.textContent = this.#state.count;
		}
	}
}

function getStateFromShadowDOM(shadowRoot) {
	let el = shadowRoot.querySelector("span");
	if (el instanceof HTMLSpanElement) {
		return { el, count: parseInt(el.textContent) };
	}
}

function getIncrement(e) {
	let node = e.target;
	if (node instanceof HTMLButtonElement) {
		if (node.hasAttribute("increase")) {
			return 1;
		}
		if (node.hasAttribute("decrease")) {
			return -1;
		}
	}
}

customElements.define("counter-wc", Counter);
