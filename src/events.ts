interface GenericEventListener<E> {
	(evt: E): void;
}

interface GenericEventListenerObject<E> {
	handleEvent(object: E): void;
}

type GenericCallbacks<E> =
	| GenericEventListener<E>
	| GenericEventListenerObject<E>;

type EventMap = Partial<{
	[Property in keyof GlobalEventHandlersEventMap]: GenericCallbacks<
		GlobalEventHandlersEventMap[Property]
	>;
}>;

type Callbacks = Array<[string, EventListenerOrEventListenerObject]>;

interface EventElementInterface {
	addEventListener: Element["addEventListener"];
	removeEventListener: Element["removeEventListener"];
}

export interface EventParamsInterface {
	callbacks: EventMap;
	connected?: boolean;
	host: EventElementInterface;
	target?: EventElementInterface;
}

export interface EventsInterface {
	connect(): void;
	disconnect(): void;
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

function getBoundCallbacks(host: Object, callbacks: EventMap): Callbacks {
	let boundCallbacks: Callbacks = [];
	for (let [name, callback] of Object.entries(callbacks)) {
		if (
			callback instanceof Function &&
			!callback.hasOwnProperty("prototype")
		) {
			callback = callback.bind(host);
		}

		boundCallbacks.push([
			name,
			callback as EventListenerOrEventListenerObject,
		]);
	}

	return boundCallbacks;
}
