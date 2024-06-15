type Connect<T> = (el: HTMLElement) => T;
type Disconnect<T> = (el: HTMLElement, args: T) => T; 

class Subscribe<T> {
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
        this.#affect = this.#onConnect(this.#el);
    }

    disconnect() {
        this.#onDisconnect(this.#el, this.#affect);
    }
}

export { Subscribe };
