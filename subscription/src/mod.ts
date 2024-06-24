type Connect<E, A> = (el: E) => A;
type Disconnect<E, A> = (el: E, args: A) => A;

interface SubscriptionImpl {
	connect(): void;
	disconnect(): void;
}

class Subscription<E, A> implements SubscriptionImpl {
	#connected: boolean = false;
	#el: E;
	#affect: A | undefined;
	#onConnect: Connect<E, A>;
	#onDisconnect: Disconnect<E, A>;

	constructor(el: E, onConnect: Connect<E, A>, onDisconnect: Disconnect<E, A>) {
		this.#el = el;
		this.#onConnect = onConnect;
		this.#onDisconnect = onDisconnect;
	}

	connect() {
		if (this.#connected) return;
		this.#connected = true;

		this.#affect = this.#onConnect(this.#el);
	}

	disconnect() {
		if (!this.#connected) return;
		this.#connected = false;

		this.#onDisconnect(this.#el, this.#affect);
	}
}

export type { Connect, Disconnect, SubscriptionImpl };

export { Subscription };
