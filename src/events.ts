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

	constructor(el: Node, callbacks: Callbacks) {
		this.#el = el;

		for (let [name, cb] of callbacks) {
			let callback = cb;
			if (
				callback instanceof Function &&
				!callback.hasOwnProperty("prototype")
			) {
				callback = callback.bind(this.#el);
			}
			this.#events.push([name, callback]);
		}
	}

	connect() {
		if (this.#connected) return;
		this.#connected = true;

		for (let [name, callback] of this.#events) {
			this.#el.addEventListener(name, callback);
			this.#el.addEventListener(name, callback);
		}
	}

	disconnect() {
		if (!this.#connected) return;
		this.#connected = false;

		for (let [name, callback] of this.#events) {
			this.#el.removeEventListener(name, callback);
		}
	}
}

export type { Callbacks, EventsInterface };
export { Events };
