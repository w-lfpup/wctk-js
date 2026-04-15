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
	target: EventElementInterface;
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
		const { target, callbacks, connected } = params;

		this.#target = target;
		this.#callbacks = Object.entries(callbacks) as Callbacks;

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
