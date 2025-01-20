interface WebComponentInterface {
	readonly declarative: boolean;
	readonly shadowRoot: ShadowRoot;
	setFormValue: ElementInternals["setFormValue"];
	setValidity: ElementInternals["setValidity"];
	reportValidity: ElementInternals["reportValidity"];
}

class WebComponent implements WebComponentInterface {
	#internals: ElementInternals;
	#declarative: boolean;

	constructor(el: HTMLElement, init: ShadowRootInit) {
		this.#internals = el.attachInternals();
		this.#declarative = this.#internals.shadowRoot !== null;
		if (!this.#declarative) {
			el.attachShadow(init);
		}
	}

	get declarative(): boolean {
		return this.#declarative;
	}

	get shadowRoot(): ShadowRoot {
		return this.#internals.shadowRoot;
	}

	get adoptedStylesheets(): CSSStyleSheet[] {
		return this.#internals.shadowRoot.adoptedStyleSheets;
	}

	set adoptedStylesheets(stylesheets: CSSStyleSheet[]) {
		this.#internals.shadowRoot.adoptedStyleSheets = stylesheets;
	}

	setFormValue(
		value: File | string | FormData | null,
		state?: File | string | FormData | null,
	) {
		this.#internals.setFormValue(value, state);
	}

	setValidity(
		flags?: ValidityStateFlags,
		message?: string,
		anchor?: HTMLElement,
	) {
		this.#internals.setValidity(flags, message, anchor);
	}

	reportValidity(): boolean {
		return this.#internals.reportValidity();
	}
}

export type { WebComponentInterface };

export { WebComponent };
