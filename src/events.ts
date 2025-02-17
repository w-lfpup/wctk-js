type Callbacks = Array<
	[keyof HTMLBodyElementEventMap, EventListenerOrEventListenerObject]
>;

interface EventsInterface {
	connect(): void;
	disconnect(): void;
}

class Events implements EventsInterface {
	#connected: boolean = false;
	#el: Node;
	#events: Callbacks = [];
	#targetEl: Node;

	constructor(el: Node, callbacks: Callbacks, targetEl: Node = el) {
		this.#el = el;
		this.#targetEl = targetEl;

		for (let [name, cb] of callbacks) {
			let callback = cb;
			if (cb instanceof Function) {
				callback = cb.bind(this.#el);
			}

			this.#events.push([name, callback]);
		}
	}

	connect() {
		if (this.#connected) return;

		this.#connected = true;
		for (let [name, callback] of this.#events) {
			this.#targetEl.addEventListener(name, callback);
		}
	}

	disconnect() {
		if (!this.#connected) return;

		this.#connected = false;
		for (let [name, callback] of this.#events) {
			this.#targetEl.removeEventListener(name, callback);
		}
	}
}

export type { Callbacks, EventsInterface };

export { Events };
