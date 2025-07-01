export interface MicrotaskParamsInterface {
	host: Object;
	callbacks: Function[];
}

export interface MicrotaskInterface {
	queue(): void;
}

export class Microtask implements MicrotaskInterface {
	#queued = false;
	#callbacks: Function[];

	constructor(params: MicrotaskParamsInterface) {
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

function getBoundCallbacks(params: MicrotaskParamsInterface): Function[] {
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

