import { Wc, Render } from "wctk";

function bind(el, cbs) {
	for (let cb of cbs) {
		el[cb.name] = cb.bind(el);
	}
}

class Stopwatch extends HTMLElement {
	#wc = new Wc(this);
	#rc = new Render(this);

	#state = getStateFromDOM(this.#wc.shadowRoot);

	render() {

	}

	update(timestamp) {
		let ts = performance.now();
		this.#rc.render();
	}

	start() {
		this.dispatchEvent(new Event("start_animation"));
	}

	stop() {
		this.dispatchEvent(new Event("stop_animation"));
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

customElements.define("stopwatch-wc", Stopwatch);

const stopwatch = document.querySelector("stopwatch-wc");

let reciept;

function animate(timestamp) {
	reciept = requestAnimationFrame(animate);
	stopwatch.update(timestamp);
}

function cancelAnimation() {
	cancelAnimationFrame(reciept);
}
