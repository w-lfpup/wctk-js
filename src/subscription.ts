type Connect<E, A> = (cb: E) => A;
type Disconnect<A> = (results: A) => void;

interface SubscriptionInterface {
	connect(): void;
	disconnect(): void;
}

class Subscription<E extends Function, A> implements SubscriptionInterface {
	#connected: boolean = false;
	#cb: E;
	#affect: A | undefined;
	#onConnect: Connect<E, A>;
	#onDisconnect: Disconnect<A>;

	constructor(
		el: Object,
		cb: E,
		onConnect: Connect<E, A>,
		onDisconnect: Disconnect<A>,
	) {
		this.#cb = cb.bind(el);
		this.#onConnect = onConnect;
		this.#onDisconnect = onDisconnect;
	}

	connect() {
		if (this.#connected) return;
		this.#connected = true;

		this.#affect = this.#onConnect(this.#cb);
	}

	disconnect() {
		if (!this.#connected) return;
		this.#connected = false;

		this.#onDisconnect(this.#affect);
	}
}

export type { Connect, Disconnect, SubscriptionInterface };

export { Subscription };
