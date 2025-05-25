// needed because typescript itself does not create a similar type
type FormDataTypes = File | string | FormData;

interface WcElementInterface {
	attachInternals: HTMLElement["attachInternals"];
	attachShadow: Element["attachShadow"];
}

interface WcParamsInterface {
	host: WcElementInterface;
	adoptedStyleSheets?: CSSStyleSheet[];
	shadowRootInit?: ShadowRootInit;
	formValue?: FormDataTypes;
	formState?: FormDataTypes;
}

interface WcInterface {
	readonly declarative: boolean;
	readonly shadowRoot: ShadowRoot;
	adoptedStyleSheets: DocumentOrShadowRoot["adoptedStyleSheets"];
	setFormValue: ElementInternals["setFormValue"];
	setValidity: ElementInternals["setValidity"];
	reportValidity: ElementInternals["reportValidity"];
}

const shadowRootInitFallback: ShadowRootInit = {
	mode: "closed",
};

class Wc implements WcInterface {
	#declarative: boolean = true;
	#internals: ElementInternals;
	#shadowRoot: ShadowRoot;

	constructor(params: WcParamsInterface) {
		let { host, shadowRootInit, adoptedStyleSheets, formValue, formState } =
			params;
		this.#internals = host.attachInternals();

		let { shadowRoot } = this.#internals;
		if (!shadowRoot) {
			this.#declarative = false;
			shadowRoot = host.attachShadow(shadowRootInit ?? shadowRootInitFallback);
		}
		this.#shadowRoot = shadowRoot;

		if (formValue) this.setFormValue(formValue, formState);
		if (adoptedStyleSheets) this.adoptedStyleSheets = adoptedStyleSheets;
	}

	get declarative(): boolean {
		return this.#declarative;
	}

	get shadowRoot(): ShadowRoot {
		return this.#shadowRoot;
	}

	get adoptedStyleSheets(): CSSStyleSheet[] {
		return this.#shadowRoot.adoptedStyleSheets ?? [];
	}

	set adoptedStyleSheets(stylesheets: CSSStyleSheet[]) {
		this.#shadowRoot.adoptedStyleSheets = stylesheets;
	}

	checkValidity() {
		return this.#internals.checkValidity();
	}

	reportValidity(): boolean {
		return this.#internals.reportValidity();
	}

	setFormValue(value: FormDataTypes, state?: FormDataTypes) {
		this.#internals.setFormValue(value, state);
	}

	setValidity(
		flags?: ValidityStateFlags,
		message?: string,
		anchor?: HTMLElement,
	) {
		this.#internals.setValidity(flags, message, anchor);
	}
}

export type { WcInterface, WcElementInterface, WcParamsInterface };

export { Wc };
