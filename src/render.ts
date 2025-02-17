interface RenderInterface {
	readonly queued: boolean;
	render(): void;
}

interface RenderElementInterface {
	render(): void;
}

class Render implements RenderInterface {
	#el: RenderElementInterface;
	#queued = false;

	constructor(el: RenderElementInterface) {
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

export type { RenderElementInterface, RenderInterface };

export { Render };
