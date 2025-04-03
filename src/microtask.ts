interface MicrotaskInterface {
	readonly queued: boolean;
	queue(): void;
}

interface MicrotaskElementInterface {
	queue(): void;
}

class Microtask implements MicrotaskInterface {
	#queued = false;
	#cb: Function;

	constructor(el: EventTarget, callback: Function) {
		this.#cb = callback.bind(el);
	}

	get queued() {
		return this.#queued;
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

export type { MicrotaskElementInterface, MicrotaskInterface };

export { Microtask };
