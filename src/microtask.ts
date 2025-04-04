interface MicrotaskInterface {
	queue(): void;
}

class Microtask implements MicrotaskInterface {
	#queued = false;
	#cb: Function;

	constructor(el: EventTarget, callback: Function) {
		this.#cb = callback.bind(el);
	}

	queue() {
		if (this.#queued) return;
		this.#queued = true;

		queueMicrotask(() => {
			this.#queued = false;
			this.#cb();
		});
	}
}

export type { MicrotaskInterface };

export { Microtask };
