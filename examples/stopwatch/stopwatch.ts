/*
	Custom Element with performant and "asynchronous" renders
	on the microtask queue.
*/

// use request animation frame for an example.
// Multiple stopwatches means multiple animation frame requests.
// This is not terribly performant.

import { Wc, Microtask } from "wctk";

interface State {
	receipt: number | void;
	count: number;
	prevTimestamp: DOMHighResTimeStamp;
	el: HTMLSpanElement | null;
}

class Stopwatch extends HTMLElement {
	#wc = new Wc({ host: this });
	#rc = new Microtask(this.#render.bind(this));
	#state: State = getStateFromShadowDOM(this.#wc.shadowRoot);
	
	#render() {
		let { el } = this.#state;
		if (el) el.textContent = this.#state.count.toFixed(2);
		
		this.#rc.queue();
	}

	#update = this.#undboundUpdate.bind(this);
	#undboundUpdate(now: DOMHighResTimeStamp) {
		this.#state.count += (now - this.#state.prevTimestamp) * 0.001;
		this.#state.prevTimestamp = now;

		this.#render();
		this.#state.receipt = window.requestAnimationFrame(this.#update)
	}

	start() {}

	pause() {}

	stop() {}
}

function getStateFromShadowDOM(shadowRoot: ShadowRoot): State {
	let el = shadowRoot.querySelector("span");

	return {
		el,
		count: parseInt(el?.textContent ?? "0"),
		prevTimestamp: performance.now(),
		receipt: -1,
	};
}

export { Stopwatch };
