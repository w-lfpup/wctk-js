export type Subscribe<E, A> = (cb: E) => A;
export type Unsubscribe<A> = (affect: A) => void;

export interface SubscriptionInterface {
	connect(): void;
	disconnect(): void;
}

export interface SubscriptionParamsInterface<E, A> {
	host: Object;
	callback: E;
	connected?: boolean;
	subscribe: Subscribe<E, A>;
	unsubscribe: Unsubscribe<A>;
}

export class Subscription<E, A>
	implements SubscriptionInterface
{
	#callback: E;
	#affect?: A;
	#subscribe: Subscribe<E, A>;
	#unsubscribe: Unsubscribe<A>;

	constructor(params: SubscriptionParamsInterface<E, A>) {
		let { host, callback, connected, subscribe, unsubscribe } = params;

		this.#subscribe = subscribe;
		this.#unsubscribe = unsubscribe;

		this.#callback = callback;
		if (callback instanceof Function && !callback.hasOwnProperty("prototype")) {
			this.#callback = callback.bind(host);
		}

		if (connected) this.connect();
	}

	connect() {
		if (!this.#affect)
			this.#affect = this.#subscribe(this.#callback);
	}

	disconnect() {
		if (this.#affect)
			this.#unsubscribe(this.#affect);
	}
}
