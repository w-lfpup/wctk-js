export type Subscribe<E, A> = (cb: E) => A;
export type Unsubscribe<A> = (affect: A) => void;

export interface SubscriptionInterface {
	connect(): void;
	disconnect(): void;
}

export interface SubscriptionParamsInterface<E, A> {
	callback: E;
	connected?: boolean;
	subscribe: Subscribe<E, A>;
	unsubscribe: Unsubscribe<A>;
}

export class Subscription<E, A> implements SubscriptionInterface {
	#params: SubscriptionParamsInterface<E, A>;
	#affect?: A;

	constructor(params: SubscriptionParamsInterface<E, A>) {
		this.#params = params;
		if (this.#params.connected) this.connect();
	}

	connect() {
		let { callback, subscribe } = this.#params;
		if (!this.#affect) this.#affect = subscribe(callback);
	}

	disconnect() {
		if (this.#affect) this.#params.unsubscribe(this.#affect);
	}
}
