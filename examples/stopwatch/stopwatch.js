import { Bind, Wc, Microtask } from "wctk";

/*
	Custom Element with performant and "asynchronous" renders
	on the microtask queue.
*/
class Stopwatch extends HTMLElement {
	#wc = new Wc(this);
	#rc = new Microtask(this, this.#render);
	#bc = new Bind(this, [this.update]);

	#state = getStateFromShadowDOM(this.#wc.shadowRoot);

	#render() {
		this.#state.el.textContent = this.#state.count.toFixed(2);
	}

	// PUBLIC API
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
		cancelAnimationFrame(this.#state.receipt);
		this.#state.receipt = undefined;
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
