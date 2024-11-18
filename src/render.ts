interface RenderInterface {
	render(): void;
}

// this might change, don't completely couple
class Render implements RenderInterface {
	#el: RenderInterface;
	#queued = false;

	constructor(el: RenderInterface) {
		this.#el = el;
	}

	get queued() {
		return this.#queued;
	}

	render() {
		if (this.#queued) return;
		this.#queued = true;

		queueMicrotask(() => {
			this.#queued = false;
			this.#el.render();
		});
	}
}

export type { RenderInterface };

export { Render };
