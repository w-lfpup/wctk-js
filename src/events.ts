interface GenericEventListener<E extends Event> {
	(evt: E): void;
}

interface GenericEventListenerObject<E extends Event> {
	handleEvent(object: E): void;
}

type GenericCallbacks<E extends Event> =
	| GenericEventListener<E>
	| GenericEventListenerObject<E>;

type EventMap =
	| Partial<{
			[Property in keyof GlobalEventHandlersEventMap]: GenericCallbacks<
				GlobalEventHandlersEventMap[Property]
			>;
	  }>
	| Record<string, EventListenerOrEventListenerObject>;

type Callbacks = Array<[string, EventListenerOrEventListenerObject]>;

interface EventElementInterface {
	addEventListener: Element["addEventListener"];
	removeEventListener: Element["removeEventListener"];
}

export interface EventParamsInterface {
	listeners: EventMap;
	connected?: boolean;
	target: EventElementInterface;
}

export interface EventsInterface {
	connect(): void;
	disconnect(): void;
}

export class Events implements EventsInterface {
	#connected: boolean = false;
	#listeners: Callbacks = [];
	#target: EventElementInterface;

	constructor(params: EventParamsInterface) {
		const { target, listeners, connected } = params;

		this.#target = target;
		this.#listeners = Object.entries(listeners) as Callbacks;

		if (connected) this.connect();
	}

	connect() {
		if (this.#connected) return;
		this.#connected = true;

		for (let [name, listener] of this.#listeners) {
			this.#target.addEventListener(name, listener);
		}
	}

	disconnect() {
		if (!this.#connected) return;
		this.#connected = false;

		for (let [name, listener] of this.#listeners) {
			this.#target.removeEventListener(name, listener);
		}
	}
}
