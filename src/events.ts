interface TypedEvent<T extends Event> {
	(event: T): void
}

// export type Callbacks<K extends keyof GlobalEventHandlersEventMap = keyof GlobalEventHandlersEventMap> = Array<[K, EventMap[K]]>;

export interface EventsInterface {
	connect(): void;
	disconnect(): void;
}

export interface EventElementInterface {
	addEventListener: Element["addEventListener"];
	removeEventListener: Element["removeEventListener"];
}

type handlers = GlobalEventHandlersEventMap & WindowEventHandlersEventMap & DocumentEventMap;

interface TypedCallback<E> {
	(evt: E): void;
}

interface TypedEventListenerCallback<E> {
    handleEvent(object: E): void;
}

type TypedEventListeners<E> = TypedCallback<E> | TypedEventListenerCallback<E>;

type EventMap = Partial<{
	[Property in keyof handlers]: TypedEventListeners<handlers[Property]>; 
}>;

export type Callbacks = Array<[string, EventListenerOrEventListenerObject]>

export interface EventParamsInterface {
	host: EventElementInterface;
	connected?: boolean;
	target?: EventElementInterface;
	// callbacks: Callbacks2;
	callbacks: EventMap;
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

		boundCallbacks.push([name, callback as EventListenerOrEventListenerObject]);
	}

	return boundCallbacks;
}
