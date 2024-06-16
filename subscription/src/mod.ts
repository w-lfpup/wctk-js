type Connect<T> = (el: HTMLElement) => T;
type Disconnect<T> = (el: HTMLElement, args: T) => T;

class Subscription<T> {
	#connected: boolean = false;
	#el: HTMLElement;
	#affect: T | undefined;
	#onConnect: Connect<T>;
	#onDisconnect: Disconnect<T>;

	constructor(
		el: HTMLElement,
		onConnect: Connect<T>,
		onDisconnect: Disconnect<T>,
	) {
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

export { Subscription };
