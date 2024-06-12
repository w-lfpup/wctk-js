interface WithRender {
	render(): void;
}

class Render {
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

export type { WithRender };

export { Render };
