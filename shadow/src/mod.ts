interface ShadowImpl {
	readonly internals: ElementInternals;
	readonly declarative: boolean;
	readonly shadowRoot: ShadowRoot;
}

class Shadow implements ShadowImpl {
	#internals: ElementInternals;
	#declarative: boolean;

	constructor(el: HTMLElement, init: ShadowRootInit) {
		this.#internals = el.attachInternals();
		this.#declarative = this.#internals.shadowRoot !== null;
		if (!this.#declarative) {
			el.attachShadow(init);
		}
	}

	get internals(): ElementInternals {
		return this.#internals;
	}

	get declarative(): boolean {
		return this.#declarative;
	}

	get shadowRoot(): ShadowRoot {
		return this.#internals.shadowRoot;
	}
}

export type { ShadowImpl };

export { Shadow };
