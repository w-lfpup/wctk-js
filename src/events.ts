interface TypedEvent<T extends Event> {
	(event: T): void
}

type EventMap = {
	[K in keyof GlobalEventHandlersEventMap]: TypedEvent<GlobalEventHandlersEventMap[K]>
};

export type Callbacks<K extends keyof GlobalEventHandlersEventMap = keyof GlobalEventHandlersEventMap> = Array<[K, EventMap[K]]>;

export interface EventsInterface {
	connect(): void;
	disconnect(): void;
}

export interface EventElementInterface {
	addEventListener: EventTarget["addEventListener"];
	removeEventListener: EventTarget["removeEventListener"];
}

export interface EventParamsInterface {
	host: EventElementInterface;
	connected?: boolean;
	target?: EventElementInterface;
	callbacks: Callbacks;
}

export class Events implements EventsInterface {
	#connected: boolean = false;
	#callbacks: Callbacks = [];
	#target: EventElementInterface;

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
	let boundCallbacks: Callbacks = [];
	for (let [name, callback] of callbacks) {
		if (
			callback instanceof Function &&
			!callback.hasOwnProperty("prototype")
		) {
			callback = callback.bind(host);
		}

		boundCallbacks.push([name, callback]);
	}

	return boundCallbacks;
}
