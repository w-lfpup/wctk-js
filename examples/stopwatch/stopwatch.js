import { Bind, Wc, Microtask } from "wctk";

/*
	Custom Element with performant and "asynchronous" renders
	on the microtask queue.
*/
class Stopwatch extends HTMLElement {
	#bc = new Bind({ host: this, callbacks: [this.update] });
	#wc = new Wc({ host: this });
	#state = getStateFromShadowDOM(this.#wc.shadowRoot);

	#rc = new Microtask({ host: this, callbacks: [this.#render] });

	#render() {
		this.#state.el.textContent = this.#state.count.toFixed(2);
	}

	update(timestamp) {
		this.#state.receipt = requestAnimationFrame(this.update);

		this.#state.count += (timestamp - this.#state.prevTimestamp) * 0.001;
		this.#state.prevTimestamp = timestamp;

		// push render to microtask queue
		this.#rc.queue();
	}

	start() {
		if (this.#state.receipt) return;

		this.#state.receipt = requestAnimationFrame(this.update);
		this.#state.prevTimestamp = performance.now();
	}

	pause() {
		this.#state.receipt = cancelAnimationFrame(this.#state.receipt);
	}
}

function getStateFromShadowDOM(shadowRoot) {
	let el = shadowRoot.querySelector("span");
	if (el instanceof HTMLSpanElement) {
		return {
			el,
			count: parseInt(el.textContent),
			receipt: undefined,
			prevTimestamp: undefined,
		};
	}
}

customElements.define("stopwatch-wc", Stopwatch);
