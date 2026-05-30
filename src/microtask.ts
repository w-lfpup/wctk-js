export interface MicrotaskInterface {
	queue(): void;
}

type Callback = () => void;

export class Microtask implements MicrotaskInterface {
	#queued = false;
	#callback: Callback;

	constructor(callback: Callback) {
		this.#callback = callback;
	}

	queue = this.#queue.bind(this);
	#queue() {
		if (this.#queued) return;
		this.#queued = true;

		window.queueMicrotask(this.#microtask);
	}

	#microtask = this.#unboundMicrotask.bind(this);
	#unboundMicrotask() {
		this.#queued = false;
		this.#callback();
	}
}
