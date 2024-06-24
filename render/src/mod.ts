interface WithRender {
	render(): void;
}

// this might change, don't completely couple
type RenderImpl = WithRender;

class Render implements RenderImpl {
	#el: WithRender;
	#queued = false;

	constructor(el: WithRender) {
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

export type { RenderImpl, WithRender };

export { Render };
