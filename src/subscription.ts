type Subscribe<A> = (cb: Function) => A;
type Unsubscribe<A> = (affect?: A) => void;

interface SubscriptionInterface {
	connect(): void;
	disconnect(): void;
}

interface SubscriptionParamsInterface<A> {
	host: Object;
	connected?: boolean;
	callbacks: Function[];
	subscribe: Subscribe<A>;
	unsubscribe: Unsubscribe<A>;
}

class Subscription<A> implements SubscriptionInterface {
	#connected: boolean = false;
	#callbacks: Function[];
	#affects?: A[];
	#subscribe: Subscribe<A>;
	#unsubscribe: Unsubscribe<A>;

	constructor(params: SubscriptionParamsInterface<A>) {
		let { host, callbacks, connected, subscribe, unsubscribe } = params;

		this.#subscribe = subscribe;
		this.#unsubscribe = unsubscribe;

		this.#callbacks = getBoundCallbacks(host, callbacks);
		if (connected) this.connect();
	}

	connect() {
		if (this.#connected) return;
		this.#connected = true;

		this.#affects = [];
		for (let callback of this.#callbacks) {
			this.#affects.push(this.#subscribe(callback));
		}
	}

	disconnect() {
		if (!this.#connected) return;
		this.#connected = false;

		if (this.#affects) {
			for (let callback of this.#affects) {
				this.#unsubscribe(callback);
			}
		}
	}
}

function getBoundCallbacks(host: Object, callbacks: Function[]): Function[] {
	let bounded: Function[] = [];
	for (let callback of callbacks) {
		if (!callback.hasOwnProperty("prototype") && callback instanceof Function) {
			callback = callback.bind(host);
		}

		bounded.push(callback);
	}

	return bounded;
}

export type {
	Subscribe,
	Unsubscribe,
	SubscriptionParamsInterface,
	SubscriptionInterface,
};

export { Subscription };
