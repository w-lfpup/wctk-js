export interface MicrotaskInterface {
	queue(): void;
}

type Callback = () => void;

export class Microtask implements MicrotaskInterface {
	#queued = false;
	#callback: Callback;
	queue = this.#queue.bind(this);

	constructor(callback: Callback) {
		this.#callback = callback;
	}

	#queue() {
		if (this.#queued) return;
		this.#queued = true;

		// could this be a bound function? less function creation
		queueMicrotask(() => {
			this.#queued = false;
			this.#callback();
		});
	}
}
