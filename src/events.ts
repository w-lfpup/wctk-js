type Callbacks = Array<[string, EventListenerOrEventListenerObject]>;

interface EventsInterface {
	connect(): void;
	disconnect(): void;
}

interface EventsElementInterface {
	addEventListener: Node["addEventListener"];
	removeEventListener: Node["removeEventListener"];
}

interface EventParamsInterface {
	host: EventsElementInterface;
	connected?: boolean;
	target?: EventsElementInterface;
	callbacks: Callbacks;
}

class Events implements EventsInterface {
	#connected: boolean = false;
	#callbacks: Callbacks = [];
	#target: EventsElementInterface;

	constructor(params: EventParamsInterface) {
		const { host, target, callbacks, connected } = params;

		this.#target = target ?? host;
		this.#callbacks = getBoundCallbacks(host, callbacks);

		if (connected) this.connect();
	}

	connect() {
		if (this.#connected) return;
		this.#connected = true;

		for (let [name, callback] of this.#callbacks) {
			this.#target.addEventListener(name, callback);
		}
	}

	disconnect() {
		if (!this.#connected) return;
		this.#connected = false;

		for (let [name, callback] of this.#callbacks) {
			this.#target.removeEventListener(name, callback);
		}
	}
}

function getBoundCallbacks(host: Object, callbacks: Callbacks): Callbacks {
	let events: Callbacks = [];
	for (let [name, callback] of callbacks) {
		if (!callback.hasOwnProperty('prototype') && callback instanceof Function) {
			callback = callback.bind(host);
		}

		events.push([name, callback]);
	}

	return events;
}

export type {
	Callbacks,
	EventsInterface,
	EventsElementInterface,
	EventParamsInterface,
};

export { Events };
