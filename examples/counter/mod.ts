import { Wc, Events } from "wctk";

interface State {
	el: HTMLSpanElement;
	count: number;
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

	#state: State | undefined = getStateFromDOM(this.#wc.shadowRoot);

	#clickHandler(e: Event) {
		let increment = getIncrement(e);
		if (this.#state && increment) {
			this.#state.count += increment;
			this.#state.el.textContent = this.#state.count.toString();
		}
	}
}

function getStateFromDOM(shadowRoot: ShadowRoot) {
	let slot = shadowRoot.querySelector("slot");

	if (slot)
		for (let el of slot.assignedNodes()) {
			if (el instanceof HTMLSpanElement) {
				return { el, count: parseInt(el.textContent ?? "0") };
			}
		}
}

function getIncrement(e: Event) {
	let { target } = e;
	if (target instanceof HTMLButtonElement) {
		return target.hasAttribute("increase") ? 1 : -1;
	}
}

customElements.define("counter-wc", Counter);
