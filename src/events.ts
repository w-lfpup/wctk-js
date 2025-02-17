type Callbacks = Array<[string, EventListenerOrEventListenerObject]>;

interface EventsInterface {
	connect(): void;
	disconnect(): void;
}

interface EventsElementInterface {
	addEventListener: Node["addEventListener"];
	removeEventListener: Node["removeEventListener"];
}

class Events implements EventsInterface {
	#connected: boolean = false;
	#el: EventsElementInterface;
	#events: Callbacks = [];
	#targetEl: EventsElementInterface;

	constructor(
		el: EventsElementInterface,
		callbacks: Callbacks,
		targetEl: EventsElementInterface = el,
	) {
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

export type { Callbacks, EventsInterface, EventsElementInterface };

export { Events };
