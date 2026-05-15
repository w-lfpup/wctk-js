/*
	Custom Element with performant and "asynchronous" renders
	on the microtask queue.
*/

// This example uses window.requestAnimationFrame.
// Multiple stopwatches means multiple animation frame requests.
// This is not terribly performant.

import { Wc, Microtask } from "wctk";

interface State {
	count: number;
	el: HTMLSpanElement | null;
	prevTimestamp: DOMHighResTimeStamp;
	receipt: number | void;
}

class Stopwatch extends HTMLElement {
	#wc = new Wc({ host: this });
	#rc = new Microtask(this.#render.bind(this));
	#state: State = getStateFromShadowDOM(this.#wc.shadowRoot);

	#render() {
		let { el } = this.#state;
		if (el) el.textContent = this.#state.count.toFixed(2);
	}

	#update = this.#undboundUpdate.bind(this);
	#undboundUpdate(now: DOMHighResTimeStamp) {
		this.#state.count += (now - this.#state.prevTimestamp) * 0.001;
		this.#state.prevTimestamp = now;

		this.#rc.queue();
		this.#state.receipt = window.requestAnimationFrame(this.#update);
	}

	start() {
		this.#state.prevTimestamp = performance.now();
		this.#state.receipt = window.requestAnimationFrame(this.#update);
	}

	pause() {
		let { receipt } = this.#state;
		if (receipt) window.cancelAnimationFrame(receipt);
		this.#state.receipt = undefined;
	}

	stop() {
		this.pause();
		this.#state.count = 0;
		this.#rc.queue();
	}
}

function getStateFromShadowDOM(shadowRoot: ShadowRoot): State {
	let el = shadowRoot.querySelector("span");
	let count = parseInt(el?.textContent ?? "0");
	if (Number.isNaN(count)) count = 0;
	let prevTimestamp = performance.now();

	return {
		count,
		el,
		prevTimestamp,
		receipt: undefined,
	};
}

export { Stopwatch };
