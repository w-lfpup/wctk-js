export interface MicrotaskParamsInterface {
	host: Object;
	callback: Function;
}

export interface MicrotaskInterface {
	queue(): void;
}

export class Microtask implements MicrotaskInterface {
	#queued = false;
	#callback: Function;

	constructor(params: MicrotaskParamsInterface) {
		let { host, callback } = params;

		this.queue = this.queue.bind(this);
		this.#callback = callback;

		if (callback instanceof Function && !callback.hasOwnProperty("prototype")) {
			this.#callback = callback.bind(host);
		}
	}

	queue() {
		if (this.#queued) return;
		this.#queued = true;

		queueMicrotask(() => {
			this.#queued = false;
			this.#callback();
		});
	}
}
