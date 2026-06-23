export interface MicrotaskInterface {
	queue(): void;
}

interface Callback {
	(): void;
}

export class Microtask implements MicrotaskInterface {
	#queued = false;
	#callback: Callback;
	#microtask = this.#unboundMicrotask.bind(this);
	queue = this.#queue.bind(this);

	constructor(callback: Callback) {
		this.#callback = callback;
	}

	#queue() {
		if (this.#queued) return;
		this.#queued = true;

		window.queueMicrotask(this.#microtask);
	}

	#unboundMicrotask() {
		this.#queued = false;
		this.#callback();
	}
}
