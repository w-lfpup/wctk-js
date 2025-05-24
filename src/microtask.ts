interface MicrotaskParamsInterface<E> {
	host: E;
	callbacks: Function[];
}

interface MicrotaskInterface {
	queue(): void;
}

class Microtask<E extends Object> implements MicrotaskInterface {
	#queued = false;
	#callbacks: Function[];

	constructor(params: MicrotaskParamsInterface<E>) {
		this.queue = this.queue.bind(this);
		this.#callbacks = getBoundCallbacks(params);
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

function getBoundCallbacks<E extends Object>(
	params: MicrotaskParamsInterface<E>,
): Function[] {
	let { host, callbacks } = params;

	let boundCallbacks: Function[] = [];
	for (let callback of callbacks) {
		if (!callback.hasOwnProperty("prototype") && callback instanceof Function) {
			callback = callback.bind(host);
		}

		boundCallbacks.push(callback);
	}

	return boundCallbacks;
}

export type { MicrotaskInterface };

export { Microtask };
