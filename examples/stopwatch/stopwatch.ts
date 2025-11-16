import { Bind, Wc, Microtask } from "wctk";

interface State {
	receipt: number | void;
	count: number;
	prevTimestamp: DOMHighResTimeStamp;
	el: HTMLSpanElement;
}

/*
	Custom Element with performant and "asynchronous" renders
	on the microtask queue.
*/
export class Stopwatch extends HTMLElement {
	#wc = new Wc({ host: this });
	#rc = new Microtask({ host: this, callback: this.#render });

	#boundUpdate = this.#update.bind(this);
	#state?: State = getStateFromShadowDOM(this.#wc.shadowRoot);

	#render() {
		if (this.#state)
			this.#state.el.textContent = this.#state.count.toFixed(2);
	}

	#update(timestamp: DOMHighResTimeStamp) {
		if (!this.#state) return;

		this.#state.receipt = requestAnimationFrame(this.#boundUpdate);

		this.#state.count += (timestamp - this.#state.prevTimestamp) * 0.001;
		this.#state.prevTimestamp = timestamp;

		// push render to microtask queue
		this.#rc.queue();
	}

	start() {
		if (!this.#state || this.#state?.receipt) return;

		this.#state.receipt = requestAnimationFrame(this.#boundUpdate);
		this.#state.prevTimestamp = performance.now();
	}

	pause() {
		if (this.#state && this.#state.receipt)
			this.#state.receipt = cancelAnimationFrame(this.#state.receipt);
	}
}

function getStateFromShadowDOM(shadowRoot: ShadowRoot): State | undefined {
	let el = shadowRoot.querySelector("span");
	if (el instanceof HTMLSpanElement) {
		return {
			el,
			count: parseInt(el.textContent ?? "0"),
			receipt: 0,
			prevTimestamp: performance.now(),
		};
	}
}
