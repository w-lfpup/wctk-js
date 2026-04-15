export interface MicrotaskInterface {
	queue(): void;
}

export class Microtask implements MicrotaskInterface {
	#queued = false;
	#callback: Function;

	constructor(callback: Function) {
		this.queue = this.queue.bind(this);
		this.#callback = callback;
	}

	queue() {
		if (this.#queued) return;
		this.#queued = true;

		// could this be a bound function? less function creation
		queueMicrotask(() => {
			this.#queued = false;
			this.#callback();
		});
	}
}
