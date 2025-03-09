import { Bind, Wc, Render } from "wctk";

/*
	Custom Element with performant and "asynchronous" renders.
*/
class Stopwatch extends HTMLElement {
	#wc = new Wc(this);
	#rc = new Render(this);
	#bc = new Bind(this, [this.update]);

	#state = getStateFromShadowDOM(this.#wc.shadowRoot);

	render() {
		this.#state.el.textContent = this.#state.count.toFixed(2);
	}

	update(timestamp) {
		this.#state.receipt = requestAnimationFrame(this.update);

		let delta = (timestamp - this.#state.prevTimestamp) * 0.001;
		this.#state.count += delta;
		this.#state.prevTimestamp = timestamp;

		// queue a render
		this.#rc.render();
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
