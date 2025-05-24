type Subscribe<E, A> = (cb: E) => A;
type Unsubscribe<A> = (affect?: A) => void;

interface SubscriptionInterface {
	connect(): void;
	disconnect(): void;
}

interface SubscriptionParamsInterface<E, A> {
	host: Object;
	connected?: boolean;
	callback: E;
	subscribe: Subscribe<E, A>;
	unsubscribe: Unsubscribe<A>;
}

class Subscription<E extends Function, A> implements SubscriptionInterface {
	#connected: boolean = false;
	#callback: E;
	#affect?: A;
	#subscribe: Subscribe<E, A>;
	#unsubscribe: Unsubscribe<A>;

	constructor(params: SubscriptionParamsInterface<E, A>) {
		let { host, callback, connected, subscribe, unsubscribe } = params;

		this.#subscribe = subscribe;
		this.#unsubscribe = unsubscribe;

		this.#callback = callback;
		if (!callback.hasOwnProperty("prototype") && callback instanceof Function) {
			this.#callback = callback.bind(host);
		}

		if (connected) this.connect();
	}

	connect() {
		if (this.#connected) return;
		this.#connected = true;

		this.#affect = this.#subscribe(this.#callback);
	}

	disconnect() {
		if (!this.#connected) return;
		this.#connected = false;

		this.#unsubscribe(this.#affect);
	}
}

export type {
	Subscribe,
	Unsubscribe,
	SubscriptionParamsInterface,
	SubscriptionInterface,
};

export { Subscription };
