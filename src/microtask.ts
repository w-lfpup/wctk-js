interface MicrotaskInterface {
	queue(): void;
}

class Microtask implements MicrotaskInterface {
	#queued = false;
	#callbacks: Function[] = [];

	constructor(el: Object, callbacks: Function[]) {
		for (let callback of callbacks) {
			this.#callbacks.push(callback.bind(el));
		}
	}

	queue() {
		if (this.#queued) return;
		this.#queued = true;

		queueMicrotask(() => {
			this.#queued = false;
			for (let callback of this.#callbacks) {
				callback();
			}
		});
	}
}

export type { MicrotaskInterface };

export { Microtask };
