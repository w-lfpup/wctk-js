interface WcInterface {
	readonly declarative: boolean;
	readonly shadowRoot: ShadowRoot;
	adoptedStyleSheets: ShadowRoot["adoptedStyleSheets"];
	setFormValue: ElementInternals["setFormValue"];
	setValidity: ElementInternals["setValidity"];
	reportValidity: ElementInternals["reportValidity"];
}

interface WcElementInterface {
	attachInternals: HTMLElement["attachInternals"];
	attachShadow: HTMLElement["attachShadow"];
}

const shadowRootInit: ShadowRootInit = {
	mode: "closed",
};

class Wc implements WcInterface {
	#internals: ElementInternals;
	#declarative: boolean;

	constructor(
		el: WcElementInterface,
		init: ShadowRootInit = { ...shadowRootInit },
	) {
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

	get adoptedStyleSheets(): CSSStyleSheet[] {
		return this.#internals.shadowRoot.adoptedStyleSheets;
	}

	set adoptedStyleSheets(stylesheets: CSSStyleSheet[]) {
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

export type { WcInterface, WcElementInterface };

export { Wc };
