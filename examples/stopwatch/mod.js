import { Bind, Wc, Render } from "wctk";

/*
	Custom Element with performant and "asynchronous" renders.
*/
class Stopwatch extends HTMLElement {
	#wc = new Wc(this);
	#rc = new Render(this);
	#bc = new Bind(this, [this.update]);

	#state = getStateFromDOM(this.#wc.shadowRoot);

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

function getStateFromDOM(shadowRoot) {
	let slot = shadowRoot.querySelector("slot");

	for (let el of slot.assignedNodes()) {
		if (el instanceof HTMLSpanElement) {
			let count = parseInt(el.textContent);
			return {
				el,
				count,
				receipt: undefined,
				prevTimestamp: undefined,
			};
		}
	}
}

customElements.define("stopwatch-wc", Stopwatch);

/*
	FOR DEMO PURPOSES

	listen for button clicks to start or stop stopwatch-wc
*/
const stopwatch = document.querySelector("stopwatch-wc");

document.addEventListener("click", function (e) {
	if (e.target instanceof HTMLButtonElement) {
		e.target.hasAttribute("start") ? stopwatch.start() : stopwatch.pause();
	}
});
