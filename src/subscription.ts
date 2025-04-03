type Subscribe<E, A> = (cb: E) => A;
type Unsubscribe<A> = (results: A) => void;

interface SubscriptionInterface {
	connect(): void;
	disconnect(): void;
}

interface SubscriptionParams<E, A> {
	bind: Element,
	callback: Function,
	subscribe: Subscribe<E, A>,
	unsubscribe: Unsubscribe<A>,
}

class Subscription<E extends Function, A> implements SubscriptionInterface {
	#connected: boolean = false;
	#cb: E;
	#affect?: A;
	#subscribe: Subscribe<E, A>;
	#unsubscribe: Unsubscribe<A>;

	constructor(params: SubscriptionParams<E, A>) {
		let {bind, callback, subscribe, unsubscribe} = params;

		this.#cb = callback.bind(bind);
		this.#subscribe = subscribe;
		this.#unsubscribe = unsubscribe;
	}

	connect() {
		if (this.#connected) return;
		this.#connected = true;

		this.#affect = this.#subscribe(this.#cb);
	}

	disconnect() {
		if (!this.#connected) return;
		this.#connected = false;

		this.#unsubscribe(this.#affect);
	}
}

export type { Subscribe, Unsubscribe, SubscriptionInterface };

export { Subscription };
