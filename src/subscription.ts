export type Subscribe<E, A> = (cb: E) => A;
export type Unsubscribe<A> = (affect?: A) => void;

export interface SubscriptionInterface {
	connect(): void;
	disconnect(): void;
}

export interface SubscriptionParamsInterface<E extends Function, A> {
	host: Object;
	callbacks: E[];
	connected?: boolean;
	subscribe: Subscribe<E, A>;
	unsubscribe: Unsubscribe<A>;
}

export class Subscription<E extends Function, A>
	implements SubscriptionInterface
{
	#callbacks: E[];
	#affects?: A[];
	#subscribe: Subscribe<E, A>;
	#unsubscribe: Unsubscribe<A>;

	constructor(params: SubscriptionParamsInterface<E, A>) {
		let { host, callbacks, connected, subscribe, unsubscribe } = params;

		this.#subscribe = subscribe;
		this.#unsubscribe = unsubscribe;

		this.#callbacks = getBoundCallbacks(host, callbacks);
		if (connected) this.connect();
	}

	connect() {
		if (this.#affects) return;

		this.#affects = [];
		for (let callback of this.#callbacks) {
			this.#affects.push(this.#subscribe(callback));
		}
	}

	disconnect() {
		if (this.#affects)
			for (let callback of this.#affects) {
				this.#unsubscribe(callback);
			}
	}
}

function getBoundCallbacks<E extends Function>(
	host: Object,
	callbacks: E[],
): E[] {
	let bounded = [];
	for (let callback of callbacks) {
		if (!callback.hasOwnProperty("prototype") && callback instanceof Function) {
			callback = callback.bind(host);
		}

		bounded.push(callback);
	}

	return bounded;
}
