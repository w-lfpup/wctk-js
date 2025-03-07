import { Wc, Events } from "wctk";

class Counter extends HTMLElement {
	#wc = new Wc(this);
	#ev = new Events({
		bind: this,
		target: this.#wc.shadowRoot,
		callbacks: [["click", this.#clickHandler]],
	});

	#state = getStateFromDOM(this.#wc.shadowRoot);

	#clickHandler(e) {
		if (!this.#state) return;

		let increment = getIncrement(e);
		updateDOM(this.#state, increment);
	}
}

function getStateFromDOM(shadowRoot) {
	let slot = shadowRoot.querySelector("slot:not([name])");

	for (let el of slot.assignedNodes()) {
		if (el instanceof HTMLSpanElement) {
			return { el, count: parseInt(el.textContent) };
		}
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

function updateDOM(state, increment) {
	if (increment) {
		state.count += increment;
		state.el.textContent = state.count;
	}
}

customElements.define("counter-wc", Counter);

let statemap = document.querySelector("script[type=statemap]");
let jsonStatemap = JSON.parse(statemap.textContent);
console.log(jsonStatemap);
